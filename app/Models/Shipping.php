<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipping extends Model
{
    /** @use HasFactory<\Database\Factories\ShippingFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'desk',
        'home',
        'enabled',
        'region_id',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
}
