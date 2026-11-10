<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Region extends Model
{
    /** @use HasFactory<\Database\Factories\RegionFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'ar_name',
        'fg_name',
    ];

    public function shippings()
    {
        return $this->hasMany(Shipping::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
