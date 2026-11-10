<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'ar_name',
        'en_name',
        'fr_name',
        'enabled',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
