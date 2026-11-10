<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Theme extends Model
{
    /** @use HasFactory<\Database\Factories\ThemeFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'light_color',
        'dark_color',
        'body_color',
        'background_color',
        'action_color',
        'action_hover_color',
        'facebook_link',
        'instagram_link',
        'tiktok_link',
        'contact_email',
        'contact_phone',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
