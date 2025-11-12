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
use Illuminate\Support\Facades\Storage;

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
        return response()->json([
            'data' => QuestionResource::collection($questions)
        ]);
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
            'stimulus_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'question_after_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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

            // Handle stimulus_image upload
            if ($request->hasFile('stimulus_image')) {
                $stimulusImage = $request->file('stimulus_image');
                $stimulusImagePath = $stimulusImage->store('questions/stimulus', 'public');
                $questionData['stimulus_image'] = $stimulusImagePath;
            } else {
                unset($questionData['stimulus_image']);
            }

            // Handle question_after_image upload
            if ($request->hasFile('question_after_image')) {
                $afterImage = $request->file('question_after_image');
                $afterImagePath = $afterImage->store('questions/after', 'public');
                $questionData['question_after_image'] = $afterImagePath;
            } else {
                unset($questionData['question_after_image']);
            }

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
            'stimulus_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'question_after_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'remove_stimulus_image' => 'nullable|boolean',
            'remove_after_image' => 'nullable|boolean',
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
            unset($questionData['remove_stimulus_image']);
            unset($questionData['remove_after_image']);

            // Handle stimulus_image removal
            if ($request->input('remove_stimulus_image') === true || $request->input('remove_stimulus_image') === 'true') {
                if ($question->stimulus_image && Storage::disk('public')->exists($question->stimulus_image)) {
                    Storage::disk('public')->delete($question->stimulus_image);
                }
                $questionData['stimulus_image'] = null;
            }

            // Handle stimulus_image upload
            if ($request->hasFile('stimulus_image')) {
                // Delete old image if exists
                if ($question->stimulus_image && Storage::disk('public')->exists($question->stimulus_image)) {
                    Storage::disk('public')->delete($question->stimulus_image);
                }
                $stimulusImage = $request->file('stimulus_image');
                $stimulusImagePath = $stimulusImage->store('questions/stimulus', 'public');
                $questionData['stimulus_image'] = $stimulusImagePath;
            } else {
                unset($questionData['stimulus_image']);
            }

            // Handle question_after_image removal
            if ($request->input('remove_after_image') === true || $request->input('remove_after_image') === 'true') {
                if ($question->question_after_image && Storage::disk('public')->exists($question->question_after_image)) {
                    Storage::disk('public')->delete($question->question_after_image);
                }
                $questionData['question_after_image'] = null;
            }

            // Handle question_after_image upload
            if ($request->hasFile('question_after_image')) {
                // Delete old image if exists
                if ($question->question_after_image && Storage::disk('public')->exists($question->question_after_image)) {
                    Storage::disk('public')->delete($question->question_after_image);
                }
                $afterImage = $request->file('question_after_image');
                $afterImagePath = $afterImage->store('questions/after', 'public');
                $questionData['question_after_image'] = $afterImagePath;
            } else {
                unset($questionData['question_after_image']);
            }

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

        // Delete associated images
        if ($question->stimulus_image && Storage::disk('public')->exists($question->stimulus_image)) {
            Storage::disk('public')->delete($question->stimulus_image);
        }
        if ($question->question_after_image && Storage::disk('public')->exists($question->question_after_image)) {
            Storage::disk('public')->delete($question->question_after_image);
        }

        $question->delete();

        return response()->json([
            'message' => 'Question deleted successfully'
        ], 200);
    }
}
