<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrder2Request extends FormRequest
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
            'subtotal' => ['required', 'integer', 'min:0', 'max:100000000'],
            'shipping' => ['required', 'integer', 'min:0', 'max:1000000'],
            'total' => ['required', 'integer', 'min:0', 'max:1100000'],
            'order_status_id' => ['required', 'integer', 'exists:order_statuses,id'],
            'client_name' => ['required', 'string', 'min:2', 'max:128'],
            'client_phone' => ['required',
                'regex:/^(05|06|07)\d{8}$/', // Algeria mobile numbers
            ],
            'client_address' => ['required', 'string', 'min:5', 'max:256'],
            'shipping_type' => ['required',
                Rule::in(['home', 'desk']),
            ],
            'items' => ['required', 'array'],
            'items.*.subtotal' => ['required', 'integer'],
            'items.*.product_name' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer'],
            'items.*.unit_price' => ['required', 'integer'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'client_name' => trim($this->client_name),
            'client_phone' => trim($this->client_phone),
            'client_address' => trim($this->client_address),
        ]);
    }
}
