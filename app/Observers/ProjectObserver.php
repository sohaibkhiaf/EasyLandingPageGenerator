<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Project;

class ProjectObserver
{
    /**
     * Handle the Project "created" event.
     */
    public function created(Project $project): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'created',
            'model' => Project::class,
            'model_id' => $project->id,
            'description' => 'PROJECT CREATED :: ['.$project->name.']',
        ]);
    }

    /**
     * Handle the Project "updated" event.
     */
    public function updated(Project $project): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'updated',
            'model' => Project::class,
            'model_id' => $project->id,
            'description' => 'PROJECT UPDATED :: ['.$project->name.']',
        ]);
    }

    /**
     * Handle the Project "deleted" event.
     */
    public function deleted(Project $project): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'deleted',
            'model' => Project::class,
            'model_id' => $project->id,
            'description' => 'PROJECT DELETED :: ['.$project->name.']',
        ]);
    }

    /**
     * Handle the Project "restored" event.
     */
    public function restored(Project $project): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'restored',
            'model' => Project::class,
            'model_id' => $project->id,
            'description' => 'PROJECT RESTORED :: ['.$project->name.']',
        ]);
    }

    /**
     * Handle the Project "force deleted" event.
     */
    public function forceDeleted(Project $project): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'force deleted',
            'model' => Project::class,
            'model_id' => $project->id,
            'description' => 'PROJECT FORCE DELETED :: ['.$project->name.']',
        ]);
    }
}
