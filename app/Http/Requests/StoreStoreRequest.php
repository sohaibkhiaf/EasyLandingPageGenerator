<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStoreRequest extends FormRequest
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
            'headline' => trim($this->headline),
            'subheadline' => trim($this->subheadline),
            'meta_pixel_id' => trim($this->meta_pixel_id),
        ]);
    }
}
