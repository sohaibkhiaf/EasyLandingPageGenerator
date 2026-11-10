<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'subtotal' => $this->subtotal,
            'shipping' => $this->shipping,
            'total' => $this->total,
            'client_address' => $this->client_address,
            'client_name' => $this->client_name,
            'client_phone' => $this->client_phone,
            'shipping_type' => $this->shipping_type,
            'project_name' => $this->project_name,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'project' => new ProjectResource($this->project),
            'order_status' => $this->orderStatus,
            'created_at' => $this->created_at,
        ];
    }
}
