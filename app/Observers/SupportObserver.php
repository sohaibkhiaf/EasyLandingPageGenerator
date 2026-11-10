<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Support;

class SupportObserver
{
    /**
     * Handle the Support "created" event.
     */
    public function created(Support $support): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'created',
            'model' => Support::class,
            'model_id' => $support->id,
            'description' => 'SUPPORT CREATED :: FOR [Mr. '.$support->user->firstName.' '.$support->user->lastName.']',
        ]);
    }

    /**
     * Handle the Support "updated" event.
     */
    public function updated(Support $support): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'updated',
            'model' => Support::class,
            'model_id' => $support->id,
            'description' => 'SUPPORT UPDATED :: FOR [Mr. '.$support->user->firstName.' '.$support->user->lastName.']',
        ]);
    }

    /**
     * Handle the Support "deleted" event.
     */
    public function deleted(Support $support): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'deleted',
            'model' => Support::class,
            'model_id' => $support->id,
            'description' => 'SUPPORT DELETED :: FOR [Mr. '.$support->user->firstName.' '.$support->user->lastName.']',
        ]);
    }

    /**
     * Handle the Support "restored" event.
     */
    public function restored(Support $support): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'restored',
            'model' => Support::class,
            'model_id' => $support->id,
            'description' => 'SUPPORT RESTORED :: FOR [Mr. '.$support->user->firstName.' '.$support->user->lastName.']',
        ]);
    }

    /**
     * Handle the Support "force deleted" event.
     */
    public function forceDeleted(Support $support): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'force deleted',
            'model' => Support::class,
            'model_id' => $support->id,
            'description' => 'SUPPORT FORCE DELETED :: FOR [Mr. '.$support->user->firstName.' '.$support->user->lastName.']',
        ]);
    }
}
