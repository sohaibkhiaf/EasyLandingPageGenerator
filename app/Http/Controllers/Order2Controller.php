<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrder2Request;
use App\Models\Order;
use Illuminate\Http\Request;

class Order2Controller extends Controller
{
    public function updateOrder(UpdateOrder2Request $request, Order $order)
    {

        // authorize user access
        $this->authorize('update', $order);

        // validate order request
        $validOrder = $request->validated();

        // save current status
        $currentStatus = $order->orderStatus;

        // update order items
        $oldItems = $order->orderItems;
        $uploadedItems = $request->input('items');

        foreach ($oldItems as $old) {
            foreach ($uploadedItems as $uploaded) {
                if ($old->id == $uploaded['id']) {
                    $old->update([
                        'product_name' => $uploaded['product_name'],
                        'subtotal' => $uploaded['subtotal'],
                        'quantity' => $uploaded['quantity'],
                        'unit_price' => $uploaded['unit_price'],
                    ]);
                }
            }
        }

        // update order
        $updated = $order->withoutTimestamps(function () use ($order, $validOrder) {
            return $order->update([
                'subtotal' => $validOrder['subtotal'],
                'shipping' => $validOrder['shipping'],
                'total' => $validOrder['total'],
                'order_status_id' => $validOrder['order_status_id'],
                'shipping_type' => $validOrder['shipping_type'],

                'client_name' => $validOrder['client_name'],
                'client_phone' => $validOrder['client_phone'],
                'client_address' => $validOrder['client_address'],
            ]);
        });

        if ($updated) {
            return redirect()->route('store.orders', [
                'project' => $order->project->id,
                'status' => $currentStatus->id,
            ])->with('success', 'ORDER_UPDATED');
        } else {
            return redirect()->route('store.orders', [
                'project' => $order->project->id,
                'status' => $currentStatus->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function deleteOrder(Request $request, Order $order)
    {
        // authorize user access
        $this->authorize('delete', $order);

        // save project
        $project = $order->project;

        // save current status
        $currentStatus = $order->orderStatus;

        // delete order & order items
        $order->orderItems()->delete();
        $deleted = $order->delete();

        if ($deleted) {
            return redirect()->route('store.orders',
                ['project' => $project->id,
                    'status' => $currentStatus,
                ])->with('success', 'ORDER_DELETED');
        } else {
            return redirect()->route('store.orders',
                ['project' => $project->id,
                    'status' => $currentStatus,
                ])->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
