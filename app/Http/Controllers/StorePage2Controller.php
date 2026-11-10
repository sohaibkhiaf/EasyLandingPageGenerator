<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrder2Request;
use App\Http\Resources\ShippingResource;
use App\Http\Resources\StoreResource;
use App\Http\Resources\Theme2Resource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Project;
use App\Models\Region;
use App\Models\Shipping;

class StorePage2Controller extends Controller
{
    public function storePage(string $slug)
    {

        // retrieve project
        $project = Project::where('slug', $slug)
            ->where('project_class', 'store-page')
            ->first();

        if (! $project) {
            abort(404);
        }

        return inertia('StorePage/StorePage', [
            'project' => new StoreResource($project),
            'shippings' => ShippingResource::collection($project->shippings()
                ->with('region')->get()),
            'theme' => new Theme2Resource($project->theme),
        ]);
    }

    public function createOrder(StoreOrder2Request $request, Project $project)
    {

        // validate client order
        $validOrder = $request->validated();

        // set attributes
        $orderItems = [];

        // subtotal
        $subtotal = 0;
        foreach ($request->input('items') as $item) {
            $product = Product::where('id', $item['product_id'])->first();
            if (! $product->enabled || ! $product->category->enabled) {
                return;
            }
            $unitPrice = $product->discount == null ?
                $product->price : $product->discount;
            $subtotal += $item['quantity'] * $unitPrice;
            $orderItems[] = ['product_name' => $product->name,
                'product_id' => $product->id,
                'unit_price' => $unitPrice,
                'quantity' => $item['quantity'],
                'subtotal' => $item['quantity'] * $unitPrice,
            ];
        }

        // shipping
        if ($project->free_shipping) {
            $shipping = 0;
        } else {
            $shipping = Shipping::where('region_id', $validOrder['region'])
                ->where('project_id', $project->id)
                ->where('enabled', true)
                ->first();
            if ($shipping) {
                switch ($validOrder['shipping_type']) {
                    case 'home':
                        $shipping = $shipping->home;
                        break;
                    case 'desk':
                        $shipping = $shipping->desk;
                        break;
                    default:
                        $shipping = $shipping->home;
                        break;
                }
            } else {
                return;
            }
        }

        // total
        $total = $subtotal + $shipping;

        // address
        $region = Region::find($validOrder['region']);
        $address = $validOrder['client_address'].', '.$region->fg_name;

        // order status (initial value)
        $orderStatus = 1;

        $order = Order::create([
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $total,
            'client_address' => $address,
            'client_name' => $validOrder['client_name'],
            'client_phone' => $validOrder['client_phone'],
            'shipping_type' => $validOrder['shipping_type'],
            'project_id' => $project->id,
            'order_status_id' => $orderStatus,
        ]);

        if ($order) {
            foreach ($orderItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_name' => $item['product_name'],
                    'product_id' => $item['product_id'],
                    'unit_price' => $item['unit_price'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['subtotal'],
                ]);
            }
        }

        if ($order) {
            return redirect()->route('store.page', ['slug' => $project->slug])
                ->with('success', 'ORDER_CREATED');
        } else {
            return redirect()->route('store.page', ['slug' => $project->slug])
                ->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
