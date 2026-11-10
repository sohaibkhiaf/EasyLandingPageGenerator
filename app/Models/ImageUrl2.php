<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class ImageUrl2 extends Model
{
    /** @use HasFactory<\Database\Factories\ImageUrl2Factory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'image_url',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected static function booted()
    {
        static::deleting(function ($imageUrl2) {
            // delete the image from storage if exists
            if ($imageUrl2->image_url && Storage::disk('public')->exists($imageUrl2->image_url)) {
                Storage::disk('public')->delete($imageUrl2->image_url);
            }
        });
    }
}
