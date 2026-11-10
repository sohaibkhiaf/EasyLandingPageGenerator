<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
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
            'email' => ['required', 'email:rfc,dns', 'max:255',
                Rule::unique('users', 'email')
                    ->ignore(auth()->user()->id),
            ],
            'phone' => [
                'required',
                'regex:/^(05|06|07)\d{8}$/', // Algeria friendly
            ],
            'address' => ['required', 'string', 'min:5', 'max:128'],
            'region_id' => ['required', 'integer', 'exists:regions,id',
            ],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'first_name' => trim($this->first_name),
            'last_name' => trim($this->last_name),
            'email' => strtolower(trim($this->email)),
            'phone' => trim($this->phone),
        ]);
    }
}
