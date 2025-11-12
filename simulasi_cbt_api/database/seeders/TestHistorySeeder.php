<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestHistory;
use App\Models\Exam;
use Carbon\Carbon;

class TestHistorySeeder extends Seeder
{
    public function run(): void
    {
        $exam = Exam::with('class')->first();

        $histories = [
            [
                'exam_id' => 1,
                'user_id' => 1,
                'exam_result_id' => 1,
                'exam_title' => $exam->title ?? 'Ujian CBT',
                'subject' => $exam->class->name ?? 'IPA',
                'grade' => $exam->class->grade ?? 'VI',
                'score' => 80.00,
                'percentage' => 80.00,
                'status' => 'completed',
                'exam_grade' => 'B',
                'completed_at' => Carbon::parse('2025-03-05 17:00:00'),
                'duration_minutes' => 60,
            ],
            [
                'exam_id' => 1,
                'user_id' => 1,
                'exam_result_id' => 2,
                'exam_title' => $exam->title ?? 'Ujian CBT',
                'subject' => $exam->class->name ?? 'IPA',
                'grade' => $exam->class->grade ?? 'VI',
                'score' => 68.25,
                'percentage' => 68.25,
                'status' => 'completed',
                'exam_grade' => 'C',
                'completed_at' => Carbon::parse('2025-03-06 17:00:00'),
                'duration_minutes' => 60,
            ],
        ];

        foreach ($histories as $history) {
            TestHistory::create($history);
        }
    }
}
