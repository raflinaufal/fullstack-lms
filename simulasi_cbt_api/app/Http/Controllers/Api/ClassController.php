<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassResource;
use App\Models\ClassModel;
use Illuminate\Http\Request;

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
}
