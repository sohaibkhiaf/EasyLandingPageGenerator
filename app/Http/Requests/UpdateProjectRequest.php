<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'category' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:10', 'max:1024'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'discount' => ['nullable', 'integer', 'min:0', 'max:100000000'],
            'stock' => ['required', 'integer', 'min:0', 'max:100000'],
            'max_quantity' => ['required', 'integer', 'min:1', 'max:1000'],
            'meta_pixel_id' => ['nullable', 'string', 'max:50'],
            'default_language' => ['required', 'string', 'in:en,fr,ar'],
        ];
    }
}
