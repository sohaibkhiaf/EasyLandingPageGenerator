<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function updateOrder(UpdateOrderRequest $request, Order $order)
    {

        // authorize user access
        $this->authorize('update', $order);

        // validate order request
        $validOrder = $request->validated();

        // save current status
        $currentStatus = $order->orderStatus;

        // update order
        $updated = $order->withoutTimestamps(function () use ($order, $validOrder) {
            return $order->update([
                'subtotal' => $validOrder['subtotal'],
                'shipping' => $validOrder['shipping'],
                'total' => $validOrder['total'],
                'quantity' => $validOrder['quantity'],
                'unit_price' => $validOrder['unit_price'],
                'order_status_id' => $validOrder['order_status_id'],
                'shipping_type' => $validOrder['shipping_type'],

                'client_name' => $validOrder['client_name'],
                'client_phone' => $validOrder['client_phone'],
                'client_address' => $validOrder['client_address'],
            ]);
        });

        if ($updated) {
            return redirect()->route('project.orders', [
                'project' => $order->project->id,
                'status' => $currentStatus->id,
            ])->with('success', 'ORDER_UPDATED');
        } else {
            return redirect()->route('project.orders', [
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
            return redirect()->route('project.orders',
                ['project' => $project->id,
                    'status' => $currentStatus, ])
                ->with('success', 'ORDER_DELETED');
        } else {
            return redirect()->route('project.orders',
                ['project' => $project->id,
                    'status' => $currentStatus, ])
                ->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
