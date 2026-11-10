<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateVisual2sRequest;
use App\Models\ImageUrl;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Visual2sController extends Controller
{
    public function updateVisuals(UpdateVisual2sRequest $request, Project $project)
    {

        // authorize user access
        $this->authorize('update', $project);

        // validate visuals updating requrest
        $request->validated();

        $icon = $request->file('icon');
        if (isset($icon)) {

            // store icon
            $extension = $icon->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $iconUrl = $icon->storeAs('icons', $filename, 'public');

            $oldIcon = $project->icon_url; // store old icon
            $updated = $project->update(['icon_url' => $iconUrl]); // update icon
            if ($updated) {
                if ($oldIcon && Storage::disk('public')->exists($oldIcon)) {
                    Storage::disk('public')->delete($oldIcon);
                }
            }
        }

        $multiple = $request->file('multiple');
        if (isset($multiple) && (count($multiple) > 0)) {
            foreach ($multiple as $image) {

                // store image
                $extension = $image->getClientOriginalExtension();
                $uuid = Str::uuid();
                $date = Carbon::now()->format('Y-m-d');
                $filename = $date.'_'.$uuid.'.'.$extension;
                $imageUrl = $image->storeAs('images', $filename, 'public');

                $project->imageUrls()->create([
                    'image_url' => $imageUrl,
                    'project_id' => $project->id,
                ]);
            }
        }

        $deleted = $request->input('deleted');
        if (isset($deleted) && (count($deleted) > 0)) {
            foreach ($deleted as $imageUrlId) {
                $project->imageUrls->find($imageUrlId)->delete();
            }
        }

        // keep only first 5 images
        $keepIds = $project->imageUrls()
            ->orderBy('id')
            ->limit(5)
            ->pluck('id')
            ->toArray();
        ImageUrl::where('project_id', $project->id)
            ->whereNotIn('id', $keepIds)
            ->delete();

        return redirect()->route('store.visuals', [
            'project' => $project,
        ])->with('success', 'VISUALS_UPDATED');

    }
}
