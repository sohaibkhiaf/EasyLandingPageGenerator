<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'project_class',
        'name',
        'description',
        'price',
        'main_image_url',
        'icon_url',
        'stock',
        'max_quantity',
        'discount',
        'user_id',
        'free_shipping',
        'category',
        'slug',
        'meta_pixel_id',
        'default_language',
        'headline',
        'subheadline',
    ];

    public function theme()
    {
        return $this->hasOne(Theme::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shippings()
    {
        return $this->hasMany(Shipping::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function imageUrls()
    {
        return $this->hasMany(ImageUrl::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    protected static function booted()
    {
        static::deleting(function ($project) {
            // delete the icon from storage if exists
            if ($project->icon_url && Storage::disk('public')->exists($project->icon_url)) {
                Storage::disk('public')->delete($project->icon_url);
            }
            // delete main image
            $mainImageUrl = $project->main_image_url;
            if ($mainImageUrl && Storage::disk('public')->exists($mainImageUrl)) {
                Storage::disk('public')->delete($mainImageUrl);
            }
            // delete multiple images
            foreach ($project->imageUrls as $imageUrl) {
                if ($imageUrl->image_url && Storage::disk('public')->exists($imageUrl->image_url)) {
                    Storage::disk('public')->delete($imageUrl->image_url);
                }
            }

            if (! $project->isForceDeleting()) {
                $project->theme()->delete();
                $project->shippings()->delete();
                $project->orders()->delete();
                $project->imageUrls()->forceDelete();
            } else {
                $project->theme()->forceDelete();
                $project->shippings()->forceDelete();
                $project->orders()->forceDelete();
                $project->imageUrls()->forceDelete();
            }

        });

        static::restoring(function ($project) {
            $project->theme()->withTrashed()->restore();
            $project->shippings()->withTrashed()->restore();
            $project->orders()->withTrashed()->restore();
            $project->imageUrls()->withTrashed()->restore();
        });
    }
}
