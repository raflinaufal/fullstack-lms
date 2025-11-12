<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use Illuminate\Http\Request;

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
}
