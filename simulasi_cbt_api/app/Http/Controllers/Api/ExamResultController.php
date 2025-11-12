<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResultResource;
use App\Http\Resources\QuestionReviewResource;
use App\Models\ExamResult;
use App\Models\QuestionReview;
use App\Models\Question;
use App\Models\TestHistory;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ExamResultController extends Controller
{
    public function store(Request $request)
    {
        // Log incoming request for debugging
        Log::info('ExamResult Store Request:', [
            'all_data' => $request->all(),
            'user' => $request->user() ? $request->user()->id : 'no user',
            'headers' => $request->headers->all()
        ]);

        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'user_id' => 'nullable|exists:users,id',
            'answers' => 'required|array',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);

        // Calculate results
        $examId = $validated['exam_id'];
        $answers = $validated['answers'];

        $questions = Question::where('exam_id', $examId)->with('options')->get();
        $totalQuestions = $questions->count();
        $correctCount = 0;
        $incorrectCount = 0;

        Log::info('=== EXAM CALCULATION START ===');
        Log::info('Total Questions: ' . $totalQuestions);
        Log::info('Answers Received: ' . count($answers));

        foreach ($questions as $index => $question) {
            $userAnswer = $answers[$index] ?? null;
            $originalAnswer = $userAnswer;

            // Extract text after "X. " pattern (e.g., "A. Gunung" -> "Gunung")
            if ($userAnswer) {
                $userAnswer = preg_replace('/^[A-D]\.\s*/', '', $userAnswer);
            }

            $isCorrect = $userAnswer === $question->correct_answer;

            Log::info("Question " . ($index + 1) . ":");
            Log::info("  Original Answer: " . ($originalAnswer ?? 'null'));
            Log::info("  Cleaned Answer: " . ($userAnswer ?? 'null'));
            Log::info("  Correct Answer: " . $question->correct_answer);
            Log::info("  Match: " . ($isCorrect ? 'YES' : 'NO'));

            if ($isCorrect) {
                $correctCount++;
            } else {
                $incorrectCount++;
            }
        }

        $percentage = $totalQuestions > 0 ? ($correctCount / $totalQuestions) * 100 : 0;
        $score = $percentage;

        Log::info('Correct Count: ' . $correctCount);
        Log::info('Incorrect Count: ' . $incorrectCount);
        Log::info('Percentage: ' . $percentage);
        Log::info('Score: ' . $score);
        Log::info('=== EXAM CALCULATION END ===');

        // Determine status and grade
        if ($percentage >= 80) {
            $status = 'good';
            $grade = 'A';
            $feedback = 'Excellent performance!';
        } elseif ($percentage >= 70) {
            $status = 'good';
            $grade = 'B';
            $feedback = 'Selamat kamu mendapatkan nilai yang bagus! Tingkatkan terus belajar kamu, agar mendapatkan hasil yang maksimal';
        } elseif ($percentage >= 60) {
            $status = 'average';
            $grade = 'C';
            $feedback = 'Cukup baik, tingkatkan lagi belajarnya';
        } else {
            $status = 'poor';
            $grade = 'F';
            $feedback = 'Keep trying!';
        }

        $startTime = Carbon::parse($validated['start_time']);
        $endTime = Carbon::parse($validated['end_time']);
        $timeSpent = $endTime->diffInMinutes($startTime);

        // Create exam result
        $examResult = ExamResult::create([
            'exam_id' => $examId,
            'user_id' => $validated['user_id'] ?? null,
            'score' => $score,
            'total_questions' => $totalQuestions,
            'answered_correct' => $correctCount,
            'answered_incorrect' => $incorrectCount,
            'percentage' => $percentage,
            'status' => $status,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => 60, // Default duration
            'time_spent' => $timeSpent,
            'grade' => $grade,
            'feedback' => $feedback,
        ]);

        // Create question reviews
        foreach ($questions as $index => $question) {
            $userAnswerRaw = $answers[$index] ?? null;
            $userAnswerCleaned = $userAnswerRaw;

            // Extract text after "X. " pattern (e.g., "A. Gunung" -> "Gunung")
            if ($userAnswerCleaned) {
                $userAnswerCleaned = preg_replace('/^[A-D]\.\s*/', '', $userAnswerCleaned);
            }

            $isCorrect = $userAnswerCleaned === $question->correct_answer;

            QuestionReview::create([
                'exam_result_id' => $examResult->id,
                'question_number' => $index + 1,
                'question' => $question->question_text,
                'passage_id' => null,
                'passage_title' => null,
                'passage' => $question->stimulus_text,
                'question_type' => 'multiple_choice',
                'user_answer' => $userAnswerCleaned, // Store cleaned answer
                'correct_answer' => $question->correct_answer,
                'is_correct' => $isCorrect,
                'explanation' => $question->explanation,
                'image' => $question->stimulus_image,
            ]);
        }

        // Create test history entry
        $exam = Exam::with('class')->find($examId);
        TestHistory::create([
            'exam_id' => $examId,
            'user_id' => $validated['user_id'] ?? null,
            'exam_result_id' => $examResult->id,
            'exam_title' => $exam->title,
            'subject' => $exam->class->subject ?? null,
            'grade' => $exam->class->grade ?? null,
            'score' => $score,
            'percentage' => $percentage,
            'status' => $status,
            'exam_grade' => $grade,
            'completed_at' => $endTime,
            'duration_minutes' => $timeSpent,
        ]);

        $response = [
            'message' => 'Exam result saved successfully',
            'result' => new ExamResultResource($examResult),
        ];

        Log::info('=== RESPONSE TO CLIENT ===');
        Log::info('Response: ' . json_encode($response));
        Log::info('==========================');

        return response()->json($response, 201);
    }

    public function show($id)
    {
        $examResult = ExamResult::with('exam')->findOrFail($id);
        return new ExamResultResource($examResult);
    }

    public function getReview($id)
    {
        $examResult = ExamResult::with('exam.class')->findOrFail($id);
        $questionReviews = QuestionReview::where('exam_result_id', $id)->get();

        // Build reviews with question data
        $reviews = $questionReviews->map(function ($review) {
            return [
                'id' => $review->id,
                'exam_result_id' => $review->exam_result_id,
                'question_id' => $review->question_number, // Using question_number as ID
                'user_answer' => $review->user_answer,
                'is_correct' => (bool) $review->is_correct,
                'created_at' => $review->created_at,
                'updated_at' => $review->updated_at,
                'question' => [
                    'id' => $review->question_number,
                    'question_text' => $review->question,
                    'stimulus_text' => $review->passage,
                    'stimulus_image' => $review->image,
                    'correct_answer' => $review->correct_answer,
                    'explanation' => $review->explanation,
                    'options' => [], // Options not stored in review, but question shows answer choices
                ],
            ];
        });

        return response()->json([
            'result' => new ExamResultResource($examResult),
            'reviews' => $reviews,
        ]);
    }
}
