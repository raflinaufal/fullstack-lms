<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamInstruction extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'instruction',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
