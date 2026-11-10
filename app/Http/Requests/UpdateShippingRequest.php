<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShippingRequest extends FormRequest
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
            'desk' => ['required', 'integer', 'min:0', 'max:100000'],
            'home' => ['required', 'integer', 'min:0', 'max:100000'],
            'enabled' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'enabled' => filter_var($this->enabled, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
