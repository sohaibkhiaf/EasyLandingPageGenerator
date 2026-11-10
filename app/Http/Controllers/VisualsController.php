<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateVisualsRequest;
use App\Models\ImageUrl;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VisualsController extends Controller
{
    public function updateVisuals(UpdateVisualsRequest $request, Project $project)
    {

        // authorize user access
        $this->authorize('update', $project);

        // validate visuals updating requrest
        $request->validated();

        $icon = $request->file('icon');
        if (isset($icon)) {

            // store image
            $extension = $icon->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $iconUrl = $icon->storeAs('icons', $filename, 'public');

            $oldIcon = $project->icon_url; // save old icon
            $updated = $project->update(['icon_url' => $iconUrl]); // update icon
            if ($updated) {
                if ($oldIcon && Storage::disk('public')->exists($oldIcon)) {
                    Storage::disk('public')->delete($oldIcon);
                }
            }
        }

        $main = $request->file('main');
        if (isset($main)) {

            // store image
            $extension = $main->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $mainImgUrl = $main->storeAs('images', $filename, 'public');

            $oldMainImg = $project->main_image_url; // store old main image
            $updated = $project->update(['main_image_url' => $mainImgUrl]); // update image
            if ($updated) {
                if ($oldMainImg && Storage::disk('public')->exists($oldMainImg)) {
                    Storage::disk('public')->delete($oldMainImg);
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

        return redirect()->route('project.visuals', [
            'project' => $project,
        ])->with('success', 'VISUALS_UPDATED');

    }
}
