<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'question_text' => $this->question_text,
            'stimulus_text' => $this->stimulus_text,
            'stimulus_image' => $this->stimulus_image,
            'correct_answer' => $this->correct_answer,
            'explanation' => $this->explanation,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'options' => $this->whenLoaded('options', function () {
                return $this->options->map(function ($option) {
                    return [
                        'id' => $option->id,
                        'question_id' => $option->question_id,
                        'option_label' => $option->option_label,
                        'option_text' => $option->option_text,
                        'is_correct' => (bool) $option->is_correct,
                    ];
                });
            }),
        ];
    }
}
