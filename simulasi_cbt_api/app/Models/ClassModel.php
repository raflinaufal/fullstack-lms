<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'title',
        'subtitle',
        'subject',
        'grade',
        'description',
    ];

    public function exams()
    {
        return $this->hasMany(Exam::class, 'class_id');
    }
}
