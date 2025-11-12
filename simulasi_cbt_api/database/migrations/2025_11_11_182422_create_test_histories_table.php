<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained('exams')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('exam_result_id')->nullable();
            $table->string('exam_title')->nullable();
            $table->string('subject')->nullable();
            $table->string('grade')->nullable();
            $table->decimal('score', 5, 2)->nullable();
            $table->decimal('percentage', 5, 2)->nullable();
            $table->string('status')->nullable(); // Changed from enum to string
            $table->string('exam_grade', 10)->nullable(); // Increased length
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->timestamps();

            // Add foreign key constraint after column creation
            $table->foreign('exam_result_id')
                ->references('id')
                ->on('exam_results')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_histories');
    }
};
