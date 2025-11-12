<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\ExamResource;
use App\Models\Question;
use App\Models\Exam;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function getExamQuestions($examId)
    {
        // Get exam with class relationship
        $exam = Exam::with('class')->findOrFail($examId);

        // Get questions with options
        $questions = Question::where('exam_id', $examId)
            ->with('options')
            ->get();

        return response()->json([
            'exam' => new ExamResource($exam),
            'questions' => QuestionResource::collection($questions),
        ]);
    }

    public function show($id)
    {
        $question = Question::with('options')->findOrFail($id);
        return new QuestionResource($question);
    }
}
