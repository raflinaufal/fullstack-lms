<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ExamResultController;
use App\Http\Controllers\Api\TestHistoryController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Classes routes
Route::get('/classes', [ClassController::class, 'index']);
Route::get('/classes/{id}', [ClassController::class, 'show']);

// Exams routes
Route::get('/exams', [ExamController::class, 'index']);
Route::get('/exams/{id}', [ExamController::class, 'show']);
Route::get('/exams/{id}/instructions', [ExamController::class, 'getInstructions']);
Route::get('/exams/{id}/questions', [QuestionController::class, 'getExamQuestions']);

// Questions routes
Route::get('/questions/{id}', [QuestionController::class, 'show']);

// Exam Results routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/exam-results', [ExamResultController::class, 'store']);
    Route::get('/exam-results/{id}', [ExamResultController::class, 'show']);
    Route::get('/exam-results/{id}/review', [ExamResultController::class, 'getReview']);
});

// Test History routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/test-history', [TestHistoryController::class, 'index']);
    Route::get('/test-history/{id}', [TestHistoryController::class, 'show']);
});

// Admin routes - requires authentication and admin role
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Classes management
    Route::post('/classes', [ClassController::class, 'store']);
    Route::put('/classes/{id}', [ClassController::class, 'update']);
    Route::delete('/classes/{id}', [ClassController::class, 'destroy']);

    // Exams management
    Route::post('/exams', [ExamController::class, 'store']);
    Route::put('/exams/{id}', [ExamController::class, 'update']);
    Route::delete('/exams/{id}', [ExamController::class, 'destroy']);

    // Questions management
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{id}', [QuestionController::class, 'update']);
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);

    // Users management
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
