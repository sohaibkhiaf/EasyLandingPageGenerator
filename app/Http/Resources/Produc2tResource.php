<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Produc2tResource extends JsonResource
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
            'category_ar_name' => $this->category->ar_name,
            'category_fr_name' => $this->category->fr_name,
            'category_en_name' => $this->category->en_name,
            'multiple_images_urls' => ImageUrl2Resource::collection($this->imageUrl2s),
        ];
    }
}
