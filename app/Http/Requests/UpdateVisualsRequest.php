<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVisualsRequest extends FormRequest
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
            'icon' => 'nullable|image|max:512',
            'main' => 'nullable|image|max:2048',
            'multiple' => 'nullable|array',
            'multiple.*' => 'image|max:1024',
            'deleted' => 'nullable|array',
            'deleted.*' => 'string|max:1024',
        ];
    }
}
