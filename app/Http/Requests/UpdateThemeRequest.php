<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateThemeRequest extends FormRequest
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
            'light_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'dark_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'body_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'background_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'action_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'action_hover_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],

            'facebook_link' => ['nullable', 'string', 'max:255', 'url',
                'regex:/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.\-_]+$/i',
            ],
            'instagram_link' => ['nullable', 'string', 'max:255', 'url',
                'regex:/^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]+$/i',
            ],
            'tiktok_link' => ['nullable', 'string', 'max:255', 'url',
                'regex:/^(https?:\/\/)?(www\.)?tiktok\.com\/@?[a-zA-Z0-9._]+$/i',
            ],
            'contact_email' => ['nullable', 'string', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string',
                'regex:/^(?:\+213|0)(5|6|7)\d{8}$/', // Algeria mobile numbers
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'facebook_link' => trim($this->facebook_link),
            'instagram_link' => trim($this->instagram_link),
            'tiktok_link' => trim($this->tiktok_link),
            'contact_email' => strtolower(trim($this->contact_email)),
            'contact_phone' => trim($this->contact_phone),
        ]);
    }
}
