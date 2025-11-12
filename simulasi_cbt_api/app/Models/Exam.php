<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'title',
        'subtitle',
        'subject',
        'grade',
        'total_questions',
        'duration',
        'passing_score',
        'time_limit',
    ];

    protected $casts = [
        'passing_score' => 'decimal:2',
    ];

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function instructions()
    {
        return $this->hasMany(ExamInstruction::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function results()
    {
        return $this->hasMany(ExamResult::class);
    }

    public function testHistories()
    {
        return $this->hasMany(TestHistory::class);
    }
}
