<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::with('class')->get();
        return ExamResource::collection($exams);
    }

    public function show($id)
    {
        $exam = Exam::with(['class', 'instructions', 'questions.options'])->findOrFail($id);

        return response()->json([
            'examInfo' => [
                'title' => $exam->title,
                'subtitle' => $exam->subtitle,
                'totalQuestions' => $exam->total_questions,
                'duration' => $exam->duration,
                'subject' => $exam->subject,
                'grade' => $exam->grade,
            ],
        ]);
    }

    public function getInstructions($id)
    {
        $exam = Exam::with('instructions')->findOrFail($id);

        return response()->json([
            'instructions' => $exam->instructions->pluck('instruction')->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:100',
            'grade' => 'nullable|string|max:50',
            'total_questions' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'passing_score' => 'nullable|numeric',
            'time_limit' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $exam = Exam::create($validator->validated());

        return response()->json([
            'message' => 'Exam created successfully',
            'data' => new ExamResource($exam->load('class'))
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:100',
            'grade' => 'nullable|string|max:50',
            'total_questions' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'passing_score' => 'nullable|numeric',
            'time_limit' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $exam->update($validator->validated());

        return response()->json([
            'message' => 'Exam updated successfully',
            'data' => new ExamResource($exam->load('class'))
        ], 200);
    }

    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();

        return response()->json([
            'message' => 'Exam deleted successfully'
        ], 200);
    }
}
