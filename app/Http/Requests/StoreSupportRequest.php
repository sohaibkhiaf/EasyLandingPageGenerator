<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupportRequest extends FormRequest
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
            'subject' => ['required', 'string', 'min:3', 'max:255',
                'regex:/^[a-zA-Z0-9À-ÿ\s\'\-\?\!\.,]+$/',
            ],
            'content' => ['required', 'string', 'min:10', 'max:1024'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'subject' => trim($this->subject),
            'content' => trim($this->content),
        ]);
    }
}
