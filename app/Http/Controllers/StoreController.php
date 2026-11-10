<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Project;
use App\Models\Theme;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StoreController extends Controller
{
    public function createStore(StoreStoreRequest $request)
    {
        // check projects number
        if ($request->user()->projects()->count() >= 3) {
            return redirect()->route('home')
                ->with('error', 'MAX_PROJECTS_EXCEEDED');
        }

        // validate project creation request
        $validProject = $request->validated();

        // get the image
        $icon = $request->file('icon');

        if (isset($icon)) {// icon uploaded case

            // store icon
            $extension = $icon->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $icon_url = $icon->storeAs('icons', $filename, 'public');

            // create project
            $project = Project::create([
                'project_class' => 'store-page',
                'name' => $validProject['name'],
                'headline' => $validProject['headline'],
                'subheadline' => $validProject['subheadline'],
                'meta_pixel_id' => $validProject['meta_pixel_id'],
                'user_id' => $request->user()->id,
                'slug' => $validProject['slug'],
                'icon_url' => $icon_url,
            ]);
        } else { // icon not uploaded case
            // create project
            $project = Project::create([
                'project_class' => 'store-page',
                'name' => $validProject['name'],
                'headline' => $validProject['headline'],
                'subheadline' => $validProject['subheadline'],
                'meta_pixel_id' => $validProject['meta_pixel_id'],
                'user_id' => $request->user()->id,
                'slug' => $validProject['slug'],
            ]);
        }

        // create theme
        $theme = Theme::create([
            'project_id' => $project->id,
        ]);

        // create 69 shippings to regions
        for ($i = 1; $i <= 69; $i++) {
            $project->shippings()->create([
                'desk' => 0,
                'home' => 0,
                'enabled' => true,
                'project_id' => $project->id,
                'region_id' => $i,
            ]);
        }

        // create 1 category
        $project->categories()->create([
            'ar_name' => 'الصنف أ',
            'en_name' => 'Category A',
            'fr_name' => 'Catégorie A',
            'enabled' => true,
        ]);

        if ($project && $theme) {
            return redirect()->route('home')
                ->with('success', 'STORE_CREATED');
        } else {
            return redirect()->route('home')
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function updateStore(UpdateStoreRequest $request, Project $project)
    {
        // authorize user access
        $this->authorize('update', $project);

        // validate project updating requrest
        $validProject = $request->validated();

        // update project
        $updated = $project->update([
            'name' => $validProject['name'],
            'headline' => $validProject['headline'],
            'subheadline' => $validProject['subheadline'],
            'meta_pixel_id' => $validProject['meta_pixel_id'],
            'default_language' => $validProject['default_language'],
        ]);

        if ($updated) {
            return redirect()->route('store.store', ['project' => $project->id])
                ->with('success', 'STORE_UPDATED');
        } else {
            return redirect()->route('store.store', ['project' => $project->id])
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function deleteStore(Request $request, Project $project)
    {

        // authorize user access
        $this->authorize('delete', $project);

        // delete project
        $deleted = $project->delete();

        if ($deleted) {
            return redirect()->route('home')
                ->with('success', 'STORE_DELETED');
        } else {
            return redirect()->route('home')
                ->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
