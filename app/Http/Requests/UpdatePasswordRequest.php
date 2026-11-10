<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
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
            'current_password' => ['required', 'string',
                'current_password', // 🔐 checks against authenticated user
            ],

            'password' => ['required', 'string', 'confirmed',
                Password::defaults(),
                'different:current_password', // 🚫 no reuse
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'current_password' => trim($this->current_password),
            'password' => trim($this->password),
            'password_confirmation' => trim($this->password_confirmation),
        ]);
    }
}
