<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassResource;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassController extends Controller
{
    public function index()
    {
        $classes = ClassModel::all();
        return ClassResource::collection($classes);
    }

    public function show($id)
    {
        $class = ClassModel::findOrFail($id);
        return new ClassResource($class);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:100',
            'grade' => 'nullable|string|max:50',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $class = ClassModel::create($validator->validated());

        return response()->json([
            'message' => 'Class created successfully',
            'data' => new ClassResource($class)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $class = ClassModel::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:100',
            'grade' => 'nullable|string|max:50',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $class->update($validator->validated());

        return response()->json([
            'message' => 'Class updated successfully',
            'data' => new ClassResource($class)
        ], 200);
    }

    public function destroy($id)
    {
        $class = ClassModel::findOrFail($id);
        $class->delete();

        return response()->json([
            'message' => 'Class deleted successfully'
        ], 200);
    }
}
