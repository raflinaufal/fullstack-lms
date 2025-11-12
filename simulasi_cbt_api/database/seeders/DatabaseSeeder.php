<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ClassSeeder::class,
            ExamSeeder::class,
            ExamInstructionSeeder::class,
            QuestionSeeder::class,
            // ExamResultSeeder::class, // Commented out - no dummy exam results
            // TestHistorySeeder::class, // Commented out - no dummy test history
        ]);
    }
}
