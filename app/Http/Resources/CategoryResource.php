<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'ar_name' => $this->ar_name,
            'en_name' => $this->en_name,
            'fr_name' => $this->fr_name,
            'enabled' => $this->enabled,
            'products' => Produc2tResource::collection($this->products),
        ];
    }
}
