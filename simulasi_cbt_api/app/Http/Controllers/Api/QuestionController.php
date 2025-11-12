<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\ExamResource;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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

    public function index(Request $request)
    {
        $query = Question::with('options', 'exam');

        // Filter by exam_id if provided
        if ($request->has('exam_id')) {
            $query->where('exam_id', $request->exam_id);
        }

        $questions = $query->get();
        return QuestionResource::collection($questions);
    }

    public function show($id)
    {
        $question = Question::with('options')->findOrFail($id);
        return new QuestionResource($question);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'exam_id' => 'required|exists:exams,id',
            'question_text' => 'required|string',
            'stimulus_text' => 'nullable|string',
            'stimulus_image' => 'nullable|string',
            'question_after_image' => 'nullable|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'options' => 'required|array|min:2',
            'options.*.option_label' => 'required|string|max:1',
            'options.*.option_text' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $questionData = $validator->validated();
            $options = $questionData['options'];
            unset($questionData['options']);

            $question = Question::create($questionData);

            // Create options
            foreach ($options as $option) {
                QuestionOption::create([
                    'question_id' => $question->id,
                    'option_label' => $option['option_label'],
                    'option_text' => $option['option_text'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Question created successfully',
                'data' => new QuestionResource($question->load('options'))
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create question',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'exam_id' => 'required|exists:exams,id',
            'question_text' => 'required|string',
            'stimulus_text' => 'nullable|string',
            'stimulus_image' => 'nullable|string',
            'question_after_image' => 'nullable|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'options' => 'required|array|min:2',
            'options.*.id' => 'nullable|exists:question_options,id',
            'options.*.option_label' => 'required|string|max:1',
            'options.*.option_text' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $questionData = $validator->validated();
            $options = $questionData['options'];
            unset($questionData['options']);

            $question->update($questionData);

            // Delete existing options and create new ones
            QuestionOption::where('question_id', $question->id)->delete();

            foreach ($options as $option) {
                QuestionOption::create([
                    'question_id' => $question->id,
                    'option_label' => $option['option_label'],
                    'option_text' => $option['option_text'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Question updated successfully',
                'data' => new QuestionResource($question->load('options'))
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update question',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json([
            'message' => 'Question deleted successfully'
        ], 200);
    }
}
