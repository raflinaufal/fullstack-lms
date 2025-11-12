<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShareResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'result_id' => 'required|integer|exists:exam_results,id',
            'school_name' => 'required|string|max:255',
            'grade' => 'required|string|max:50',
            'email' => 'required|email|max:255',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'result_id.required' => 'Result ID is required',
            'result_id.exists' => 'Result not found',
            'school_name.required' => 'School name is required',
            'grade.required' => 'Grade is required',
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email format',
        ];
    }
}
