<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExamResult;
use Carbon\Carbon;

class ExamResultSeeder extends Seeder
{
    public function run(): void
    {
        $results = [
            [
                'exam_id' => 1,
                'user_id' => 1,
                'score' => 80.00,
                'total_questions' => 20,
                'answered_correct' => 16,
                'answered_incorrect' => 4,
                'percentage' => 80.00,
                'status' => 'good',
                'start_time' => Carbon::parse('2025-03-05 16:00:00'),
                'end_time' => Carbon::parse('2025-03-05 17:00:00'),
                'duration' => 60,
                'time_spent' => 60,
                'grade' => 'B',
                'feedback' => 'Selamat kamu mendapatkan nilai yang bagus! Tingkatkan terus belajar kamu, agar mendapatkan hasil yang maksimal',
            ],
            [
                'exam_id' => 1,
                'user_id' => 1,
                'score' => 68.25,
                'total_questions' => 20,
                'answered_correct' => 14,
                'answered_incorrect' => 6,
                'percentage' => 68.25,
                'status' => 'average',
                'start_time' => Carbon::parse('2025-03-05 16:00:00'),
                'end_time' => Carbon::parse('2025-03-05 17:00:00'),
                'duration' => 60,
                'time_spent' => 60,
                'grade' => 'C',
                'feedback' => 'Cukup baik, tingkatkan lagi belajarnya',
            ],
        ];

        foreach ($results as $result) {
            ExamResult::create($result);
        }
    }
}
