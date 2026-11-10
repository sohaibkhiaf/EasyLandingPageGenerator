<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Theme2Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'light_color' => $this->light_color,
            'dark_color' => $this->dark_color,
            'body_color' => $this->body_color,
            'background_color' => $this->background_color,
            'action_color' => $this->action_color,
            'action_hover_color' => $this->action_hover_color,
            'facebook_link' => $this->facebook_link,
            'instagram_link' => $this->instagram_link,
            'tiktok_link' => $this->tiktok_link,
            'contact_email' => $this->contact_email,
            'contact_phone' => $this->contact_phone,
        ];
    }
}
