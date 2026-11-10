<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'enabled',
        'main_image_url',
        'stock',
        'max_quantity',
        'discount',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function imageUrl2s()
    {
        return $this->hasMany(ImageUrl2::class);
    }
}
