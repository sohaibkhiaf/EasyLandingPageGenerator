<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
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
            'project_class' => $this->project_class,
            'name' => $this->name,
            'headline' => $this->headline,
            'subheadline' => $this->subheadline,
            'slug' => $this->slug,
            'meta_pixel_id' => $this->meta_pixel_id,
            'default_language' => $this->default_language,
            'icon_url' => $this->icon_url,
            'multiple_images_urls' => ImageUrlResource::collection($this->imageUrls),
            'categories' => CategoryResource::collection($this->categories),
            'free_shipping' => $this->free_shipping,
            'created_at' => $this->created_at,
        ];
    }
}
