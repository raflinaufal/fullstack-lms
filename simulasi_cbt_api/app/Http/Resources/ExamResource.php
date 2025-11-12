<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'class_id' => $this->class_id,
            'title' => $this->title,
            'description' => $this->description,
            'total_questions' => $this->total_questions,
            'duration' => $this->duration,
            'passing_score' => $this->passing_score,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'class' => $this->whenLoaded('class', function () {
                return [
                    'id' => $this->class->id,
                    'title' => $this->class->title,
                    'subtitle' => $this->class->subtitle,
                    'subject' => $this->class->subject,
                    'grade' => $this->class->grade,
                    'description' => $this->class->description,
                ];
            }),
        ];
    }
}
