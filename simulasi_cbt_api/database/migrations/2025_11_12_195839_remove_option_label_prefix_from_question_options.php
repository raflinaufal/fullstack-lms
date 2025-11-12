<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get all question options
        $options = DB::table('question_options')->get();

        foreach ($options as $option) {
            // Remove prefix like "A. ", "B. ", "C. ", "D. " etc from option_text
            $cleanText = preg_replace('/^[A-Z]\.\s*/', '', $option->option_text);

            DB::table('question_options')
                ->where('id', $option->id)
                ->update(['option_text' => $cleanText]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Cannot reverse this migration as we don't know the original prefixes
        // If needed, you can manually restore the data from backup
    }
};
