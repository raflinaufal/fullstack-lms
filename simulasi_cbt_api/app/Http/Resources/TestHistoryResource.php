<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestHistoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'user_id' => $this->user_id,
            'exam_result_id' => $this->exam_result_id,
            'exam_title' => $this->exam_title,
            'subject' => $this->subject,
            'grade' => $this->grade,
            'score' => (float) $this->score,
            'percentage' => (float) $this->percentage,
            'status' => $this->status,
            'exam_grade' => $this->exam_grade,
            'completed_at' => $this->completed_at,
            'duration_minutes' => $this->duration_minutes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
