<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestHistory extends Model
{
    use HasFactory;

    protected $table = 'test_histories';

    protected $fillable = [
        'exam_id',
        'user_id',
        'title',
        'score',
        'description',
        'start_time',
        'end_time',
        'total_questions',
        'correct_answers',
        'duration',
        'status',
        'exam_date',
        'chapter',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'exam_date' => 'date',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
