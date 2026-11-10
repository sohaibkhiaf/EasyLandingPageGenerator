<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'main_image_url' => $this->main_image_url,
            'stock' => $this->stock,
            'max_quantity' => $this->max_quantity,
            'enabled' => $this->enabled,
            'discount' => $this->discount,
            'category' => new CategoryResource($this->category),
            'multiple_images_urls' => ImageUrl2Resource::collection($this->imageUrl2s),
        ];
    }
}
