<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'questionNumber' => $this->question_number,
            'question' => $this->question,
            'passage' => [
                'id' => $this->passage_id,
                'title' => $this->passage_title,
                'text' => $this->passage,
            ],
            'questionType' => $this->question_type,
            'userAnswer' => $this->user_answer,
            'correctAnswer' => $this->correct_answer,
            'isCorrect' => $this->is_correct,
            'explanation' => $this->explanation,
            'image' => $this->image,
        ];
    }
}
