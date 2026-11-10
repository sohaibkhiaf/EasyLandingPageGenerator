<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderStatus extends Model
{
    /** @use HasFactory<\Database\Factories\OrderStatusFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'en_message',
        'ar_message',
        'fr_message',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
