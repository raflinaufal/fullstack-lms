<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_result_id',
        'question_number',
        'question',
        'passage_id',
        'passage_title',
        'passage',
        'question_type',
        'user_answer',
        'correct_answer',
        'is_correct',
        'explanation',
        'image',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function examResult()
    {
        return $this->belongsTo(ExamResult::class);
    }
}
