<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ShippingResource;
use App\Http\Resources\ThemeResource;
use App\Models\Order;
use App\Models\Project;
use App\Models\Region;
use App\Models\Shipping;

class LandingPageController extends Controller
{
    public function landingPage(string $slug)
    {

        // retrieve project
        $project = Project::where('slug', $slug)
            ->where('project_class', 'landing-page')
            ->first();

        if (! $project) {
            abort(404);
        }

        return inertia('LandingPage/LandingPage', [
            'project' => new ProjectResource($project),
            'shippings' => ShippingResource::collection($project->shippings()
                ->with('region')->get()),
            'theme' => new ThemeResource($project->theme),
        ]);
    }

    public function createOrder(StoreOrderRequest $request, Project $project)
    {

        // validate client order
        $validOrder = $request->validated();

        // set attributes
        // quantity
        if ($validOrder['quantity'] > 0 && $validOrder['quantity'] <= $project->max_quantity) {
            $quantity = $validOrder['quantity'];
        } else {
            $quantity = 1;
        }
        // unit price
        $unitPrice = $project->discount == null ? $project->price : $project->discount;

        // subtotal
        $subtotal = $unitPrice * $quantity;

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

        $created = Order::create([
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $total,
            'client_address' => $address,
            'client_name' => $validOrder['client_name'],
            'client_phone' => $validOrder['client_phone'],
            'shipping_type' => $validOrder['shipping_type'],
            'project_name' => $project->name,
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'project_id' => $project->id,
            'order_status_id' => $orderStatus,
        ]);

        if ($created) {
            return redirect()->route('landing.page', ['slug' => $project->slug])
                ->with('success', 'ORDER_CREATED');
        } else {
            return redirect()->route('landing.page', ['slug' => $project->slug])
                ->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
