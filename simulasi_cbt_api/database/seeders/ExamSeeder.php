<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        Exam::create([
            'class_id' => 1,
            'title' => 'ESPS IPS 4 SD KELAS IV',
            'subtitle' => 'Kenampakan Alam dan Pemanfaatannya',
            'subject' => 'IPS',
            'grade' => '4 SD',
            'total_questions' => 20,
            'duration' => 60,
            'passing_score' => 70.00,
            'time_limit' => '60 menit',
        ]);
    }
}
