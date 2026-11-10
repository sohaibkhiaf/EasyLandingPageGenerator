<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function createCategory(Request $request, Project $project)
    {

        // authorize user access
        $this->authorize('update', $project);

        if ($project->categories()->count() < 5) {
            $created = $project->categories()->create([
                'ar_name' => 'التصنيف '.($project->categories()->count() + 1),
                'en_name' => 'Category '.($project->categories()->count() + 1),
                'fr_name' => 'Catégorie '.($project->categories()->count() + 1),
                'enabled' => true,
            ]);
        } else {
            $created = false;
        }

        if ($created) {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('success', 'CATEGORY_CREATED');
        } else {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('error', 'MAX_CATEGORIES_REACHED');
        }
    }

    public function updateCategory(UpdateCategoryRequest $request, Category $category)
    {

        // authorize user access
        $this->authorize('update', $category);

        // validate request
        $validCtg = $request->validated();

        // save project
        $project = $category->project;

        // update category
        $updated = $category->update([
            'ar_name' => $validCtg['ar_name'],
            'en_name' => $validCtg['en_name'],
            'fr_name' => $validCtg['fr_name'],
            'enabled' => $validCtg['enabled'],
        ]);

        if ($updated) {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('success', 'CATEGORY_UPDATED');
        } else {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }
    }

    public function deleteCategory(Request $request, Category $category)
    {

        // authorize user access
        $this->authorize('delete', $category);

        // save project
        $project = $category->project;

        // delete category
        if ($project->categories()->count() > 1) {
            $deleted = $category->delete();
        } else {
            $deleted = false;
        }

        if ($deleted) {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('success', 'CATEGORY_DELETED');
        } else {
            return redirect()->route('store.categories', [
                'project' => $project->id,
            ])->with('error', 'AT_LEAST_ONE');
        }
    }
}
