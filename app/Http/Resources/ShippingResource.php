<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingResource extends JsonResource
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
            'desk' => $this->desk,
            'home' => $this->home,
            'enabled' => $this->enabled,
            'region' => new RegionResource($this->region),
        ];
    }
}
