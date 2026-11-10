<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
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
            'client_name' => ['required', 'string', 'min:2', 'max:128'],
            'client_phone' => ['required',
                'regex:/^(05|06|07)\d{8}$/', // Algeria friendly
            ],
            'client_address' => ['required', 'string', 'min:5', 'max:256'],
            'shipping_type' => ['required',
                Rule::in(['home', 'desk']),
            ],
            'quantity' => ['required', 'integer', 'min:1', 'max:1024'],
            'region' => ['required', 'integer', 'exists:regions,id'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'client_name' => trim($this->client_name),
            'client_phone' => trim($this->client_phone),
            'client_address' => trim($this->client_address),
            'shipping_type' => strtolower(trim($this->shipping_type)),
        ]);
    }
}
