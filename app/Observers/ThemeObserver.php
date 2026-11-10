<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Theme;

class ThemeObserver
{
    /**
     * Handle the Theme "created" event.
     */
    public function created(Theme $theme): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'created',
            'model' => Theme::class,
            'model_id' => $theme->id,
            'description' => 'THEME CREATED :: FOR ['.$theme->project->name.']',
        ]);
    }

    /**
     * Handle the Theme "updated" event.
     */
    public function updated(Theme $theme): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'updated',
            'model' => Theme::class,
            'model_id' => $theme->id,
            'description' => 'THEME UPDATED :: FOR ['.$theme->project->name.']',
        ]);
    }

    /**
     * Handle the Theme "deleted" event.
     */
    public function deleted(Theme $theme): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'deleted',
            'model' => Theme::class,
            'model_id' => $theme->id,
            'description' => 'THEME DELETED :: FOR ['.$theme->project->name.']',
        ]);
    }

    /**
     * Handle the Theme "restored" event.
     */
    public function restored(Theme $theme): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'restored',
            'model' => Theme::class,
            'model_id' => $theme->id,
            'description' => 'THEME RESTORED :: FOR ['.$theme->project->name.']',
        ]);
    }

    /**
     * Handle the Theme "force deleted" event.
     */
    public function forceDeleted(Theme $theme): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'force deleted',
            'model' => Theme::class,
            'model_id' => $theme->id,
            'description' => 'THEME FORCE DELETED :: FOR ['.$theme->project->name.']',
        ]);
    }
}
