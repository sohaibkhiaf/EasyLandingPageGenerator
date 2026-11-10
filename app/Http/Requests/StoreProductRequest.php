<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'description' => ['required', 'string', 'min:10', 'max:1024'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'discount' => ['nullable', 'integer', 'min:0', 'max:100000000'],
            'stock' => ['required', 'integer', 'min:0', 'max:100000'],
            'max_quantity' => ['required', 'integer', 'min:1', 'max:1000'],
            'enabled' => ['required', 'boolean'],

            'main' => 'nullable|image|max:2048',
            'multiple' => 'nullable|array',
            'multiple.*' => 'image|max:1024',
        ];
    }
}
