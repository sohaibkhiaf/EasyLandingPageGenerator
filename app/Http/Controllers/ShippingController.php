<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateShippingRequest;
use App\Models\Project;
use App\Models\Shipping;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function updateShipping(UpdateShippingRequest $request, Shipping $shipping)
    {

        // authorize user access
        $this->authorize('update', $shipping);

        // authorize shipping request
        $validShipping = $request->validated();

        // deactivate free shipping mode
        if ($validShipping['desk'] == $shipping->desk && $validShipping['home'] == $shipping->home) {
            $fmUpdated = true;
        } else {
            $fmUpdated = $shipping->project->update([
                'free_shipping' => false,
            ]);
        }

        // update shipping
        $shUpdated = $shipping->update([
            'desk' => $validShipping['desk'],
            'home' => $validShipping['home'],
            'enabled' => $validShipping['enabled'],
        ]);

        $destination = $shipping->project->project_class == 'store-page'
            ? 'store.shipping' : 'project.shipping';
        if ($shUpdated && $fmUpdated) {
            return redirect()->route($destination, [
                'project' => $shipping->project->id,
            ])->with('success', 'SHIPPING_UPDATED');
        } else {
            return redirect()->route($destination, [
                'project' => $shipping->project->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function activateFreeShipping(Request $request, Project $project)
    {
        // authorize user access
        $this->authorize('update', $project);

        // activate free shipping
        $updated = $project->update([
            'free_shipping' => true,
        ]);

        $destination = $project->project_class == 'store-page'
            ? 'store.shipping' : 'project.shipping';
        if ($updated) {
            return redirect()->route($destination, [
                'project' => $project->id,
            ])->with('success', 'FREE_SHIPPING_ACTIVATED');
        } else {
            return redirect()->route($destination, [
                'project' => $project->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function deactivateFreeShipping(Request $request, Project $project)
    {
        // authorize user access
        $this->authorize('update', $project);

        // activate free shipping
        $updated = $project->update([
            'free_shipping' => false,
        ]);

        $destination = $project->project_class == 'store-page'
            ? 'store.shipping' : 'project.shipping';
        if ($updated) {
            return redirect()->route($destination, [
                'project' => $project->id,
            ])->with('success', 'FREE_SHIPPING_DEACTIVATED');
        } else {
            return redirect()->route($destination, [
                'project' => $project->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }

    }
}
