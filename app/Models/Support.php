<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Support extends Model
{
    /** @use HasFactory<\Database\Factories\SupportFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'subject',
        'content',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
