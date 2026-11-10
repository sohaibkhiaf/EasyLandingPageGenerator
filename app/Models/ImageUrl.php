<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class ImageUrl extends Model
{
    /** @use HasFactory<\Database\Factories\ImageUrlFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'image_url',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    protected static function booted()
    {
        static::deleting(function ($imageUrl) {
            // delete the image from storage if exists
            if ($imageUrl->image_url && Storage::disk('public')->exists($imageUrl->image_url)) {
                Storage::disk('public')->delete($imageUrl->image_url);
            }
        });
    }
}
