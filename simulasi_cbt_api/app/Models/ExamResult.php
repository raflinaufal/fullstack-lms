<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'user_id',
        'score',
        'total_questions',
        'answered_correct',
        'answered_incorrect',
        'percentage',
        'status',
        'start_time',
        'end_time',
        'duration',
        'time_spent',
        'grade',
        'feedback',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'percentage' => 'decimal:2',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questionReviews()
    {
        return $this->hasMany(QuestionReview::class);
    }
}
