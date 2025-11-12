<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExamInstruction;

class ExamInstructionSeeder extends Seeder
{
    public function run(): void
    {
        $instructions = [
            'Baca soal dengan teliti sebelum memilih jawaban',
            'Pilih salah satu jawaban yang paling tepat',
            'Kamu dapat mengubah jawaban sebelum submit',
            'Pastikan semua soal sudah terjawab sebelum submit',
            'Waktu ujian adalah 60 menit',
        ];

        foreach ($instructions as $instruction) {
            ExamInstruction::create([
                'exam_id' => 1,
                'instruction' => $instruction,
            ]);
        }
    }
}
