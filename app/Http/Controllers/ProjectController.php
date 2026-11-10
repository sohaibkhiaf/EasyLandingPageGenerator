<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Theme;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function createProject(StoreProjectRequest $request)
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
                'project_class' => 'landing-page',
                'name' => $validProject['name'],
                'category' => $validProject['category'],
                'description' => $validProject['description'],
                'price' => $validProject['price'],
                'discount' => $validProject['discount'],
                'stock' => $validProject['stock'],
                'meta_pixel_id' => $validProject['meta_pixel_id'],
                'user_id' => $request->user()->id,
                'slug' => $validProject['slug'],
                'icon_url' => $icon_url,
            ]);
        } else { // icon not uploaded case
            // create project
            $project = Project::create([
                'project_class' => 'landing-page',
                'name' => $validProject['name'],
                'category' => $validProject['category'],
                'description' => $validProject['description'],
                'price' => $validProject['price'],
                'discount' => $validProject['discount'],
                'stock' => $validProject['stock'],
                'meta_pixel_id' => $validProject['meta_pixel_id'],
                'slug' => $validProject['slug'],
                'user_id' => $request->user()->id,
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

        if ($project && $theme) {
            return redirect()->route('home')
                ->with('success', 'PROJECT_CREATED');
        } else {
            return redirect()->route('home')
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function updateProject(UpdateProjectRequest $request, Project $project)
    {
        // authorize user access
        $this->authorize('update', $project);

        // validate project updating requrest
        $validProject = $request->validated();

        // update project
        $updated = $project->update([
            'name' => $validProject['name'],
            'category' => $validProject['category'],
            'description' => $validProject['description'],
            'price' => $validProject['price'],
            'discount' => $validProject['discount'],
            'stock' => $validProject['stock'],
            'max_quantity' => $validProject['max_quantity'],
            'meta_pixel_id' => $validProject['meta_pixel_id'],
            'default_language' => $validProject['default_language'],
        ]);

        if ($updated) {
            return redirect()->route('project.project', ['project' => $project->id])
                ->with('success', 'PROJECT_UPDATED');
        } else {
            return redirect()->route('project.project', ['project' => $project->id])
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function deleteProject(Request $request, Project $project)
    {

        // authorize user access
        $this->authorize('delete', $project);

        // delete project
        $deleted = $project->delete();

        if ($deleted) {
            return redirect()->route('home')
                ->with('success', 'PROJECT_DELETED');
        } else {
            return redirect()->route('home')
                ->with('error', 'UNEXPECTED_ERROR');
        }
    }
}
