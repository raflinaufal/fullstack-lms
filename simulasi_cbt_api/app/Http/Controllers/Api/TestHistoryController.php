<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestHistoryResource;
use App\Models\TestHistory;
use Illuminate\Http\Request;

class TestHistoryController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id ?? null;

        $query = TestHistory::with('exam');

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $histories = $query->orderBy('created_at', 'desc')->get();

        // Get the first exam for header info
        $firstHistory = $histories->first();

        return response()->json([
            'historyInfo' => [
                'title' => $firstHistory ? "HISTORI NILAI {$firstHistory->exam->title}" : 'HISTORI NILAI',
                'subtitle' => $firstHistory ? $firstHistory->exam->subtitle : '',
                'subject' => $firstHistory ? $firstHistory->exam->subject : '',
                'grade' => $firstHistory ? $firstHistory->exam->grade : '',
            ],
            'testResults' => TestHistoryResource::collection($histories),
        ]);
    }

    public function show($id)
    {
        $history = TestHistory::with('exam')->findOrFail($id);
        return new TestHistoryResource($history);
    }
}
