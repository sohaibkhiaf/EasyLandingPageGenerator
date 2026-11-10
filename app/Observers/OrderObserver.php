<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Order;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'created',
            'model' => Order::class,
            'model_id' => $order->id,
            'description' => 'ORDER CREATED :: FOR ['.$order->project->name.']',
        ]);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'updated',
            'model' => Order::class,
            'model_id' => $order->id,
            'description' => 'ORDER UPDATED :: FOR ['.$order->project->name.']',
        ]);
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'deleted',
            'model' => Order::class,
            'model_id' => $order->id,
            'description' => 'ORDER DELETED :: FOR ['.$order->project->name.']',
        ]);
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'restored',
            'model' => Order::class,
            'model_id' => $order->id,
            'description' => 'ORDER RESTORED :: FOR ['.$order->project->name.']',
        ]);
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'force deleted',
            'model' => Order::class,
            'model_id' => $order->id,
            'description' => 'ORDER FORCE DELETED :: FOR ['.$order->project->name.']',
        ]);
    }
}
