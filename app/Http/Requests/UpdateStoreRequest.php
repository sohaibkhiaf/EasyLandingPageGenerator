<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoreRequest extends FormRequest
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
            'headline' => ['required', 'string', 'min:2', 'max:255'],
            'subheadline' => ['required', 'string', 'min:10', 'max:1024'],
            'meta_pixel_id' => ['nullable', 'string', 'max:50'],
            'default_language' => ['required', 'string', 'in:en,fr,ar'],
        ];
    }
}
