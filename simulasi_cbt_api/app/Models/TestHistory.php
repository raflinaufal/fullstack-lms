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
        'exam_result_id',
        'exam_title',
        'subject',
        'grade',
        'score',
        'percentage',
        'status',
        'exam_grade',
        'start_time',
        'end_time',
        'completed_at',
        'duration_minutes',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'percentage' => 'decimal:2',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'completed_at' => 'datetime',
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
