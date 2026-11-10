<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'min:2', 'max:64'],
            'last_name' => ['required', 'string', 'min:2', 'max:64'],
            'address' => ['required', 'string', 'min:5', 'max:128'],
            'region_id' => ['required', 'integer', 'exists:regions,id'],
            'email' => ['required', 'string', 'email:rfc,dns', 'max:255',
                Rule::unique(User::class, 'email'),
            ],
            'phone' => ['required',
                'regex:/^(05|06|07)\d{8}$/', // Algeria friendly
                Rule::unique(User::class, 'phone'),
            ],
            'password' => ['required', 'string', 'confirmed',
                Password::defaults(),
            ],
        ];
    }
}
