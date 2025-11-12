<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('question_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_result_id')->constrained('exam_results')->onDelete('cascade');
            $table->integer('question_number')->nullable();
            $table->text('question')->nullable();
            $table->string('passage_id', 50)->nullable();
            $table->string('passage_title')->nullable();
            $table->text('passage')->nullable();
            $table->string('question_type', 50)->nullable();
            $table->string('user_answer')->nullable();
            $table->string('correct_answer')->nullable();
            $table->boolean('is_correct')->nullable();
            $table->text('explanation')->nullable();
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('question_reviews');
    }
};
