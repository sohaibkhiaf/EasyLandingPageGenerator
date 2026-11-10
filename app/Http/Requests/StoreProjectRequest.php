<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'meta_pixel_id' => ['nullable', 'string', 'max:50'],
            'slug' => [
                'required',
                'string',
                'min:3',
                'max:32',
                Rule::unique('projects', 'slug'),
                // Reserved words (ai generated)
                function ($attribute, $value, $fail) {
                    $reserved = [
                        'www', 'admin', 'api', 'app', 'dashboard',
                        'support', 'help', 'mail', 'ftp',
                    ];

                    if (in_array($value, $reserved)) {
                        $fail('This store URL is reserved.');
                    }
                },
            ],
            'icon' => 'nullable|image|max:512',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim($this->name),
            'category' => trim($this->category),
            'description' => trim($this->description),
            'meta_pixel_id' => trim($this->meta_pixel_id),
        ]);
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->discount >= $this->price) {
                $validator->errors()->add('discount', 'Discount cannot exceed the price.');
            }
        });
    }
}
