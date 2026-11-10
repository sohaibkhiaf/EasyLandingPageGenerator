<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'subtotal',
        'shipping',
        'total',
        'client_address',
        'client_name',
        'client_phone',
        'shipping_type',
        'project_name',
        'quantity',
        'unit_price',
        'project_id',
        'order_status_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
