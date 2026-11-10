<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\ImageUrl2;
use App\Models\Product;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function updateProduct(UpdateProductRequest $request, Product $product)
    {
        // authorize user access
        $this->authorize('update', $product);

        // validate product updating requrest
        $validProduct = $request->validated();

        // update product
        $updated = $product->update([
            'name' => $validProduct['name'],
            'category_id' => $validProduct['category_id'],
            'description' => $validProduct['description'],
            'price' => $validProduct['price'],
            'discount' => $validProduct['discount'],
            'enabled' => $validProduct['enabled'],
            'stock' => $validProduct['stock'],
            'max_quantity' => $validProduct['max_quantity'],
        ]);

        $main = $request->file('main');
        if (isset($main)) {

            // store main image
            $extension = $main->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $mainImgUrl = $main->storeAs('images', $filename, 'public');

            $oldMainImg = $product->main_image_url; // store old main image
            $updated = $product->update(['main_image_url' => $mainImgUrl]); // update image
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

                $product->imageUrl2s()->create([
                    'image_url' => $imageUrl,
                    'product_id' => $product->id,
                ]);
            }
        }

        $deleted = $request->input('deleted');
        if (isset($deleted) && (count($deleted) > 0)) {
            foreach ($deleted as $imageUrlId) {
                $product->imageUrl2s->find($imageUrlId)->delete();
            }
        }

        // keep only first 5 images
        $keepIds = $product->imageUrl2s()
            ->orderBy('id')
            ->limit(5)
            ->pluck('id')
            ->toArray();
        ImageUrl2::where('product_id', $product->id)
            ->whereNotIn('id', $keepIds)
            ->delete();

        if ($updated) {
            return redirect()->route('store.products',
                ['project' => $product->category->project->id,
                    'product' => $product->id,
                ])->with('success', 'PRODUCT_UPDATED');
        } else {
            return redirect()->route('store.products',
                ['project' => $product->category->project->id,
                    'product' => $product->id,
                ])->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function createProduct(StoreProductRequest $request, Project $project)
    {
        // authorize user access
        $this->authorize('update', $project);

        // validate product updating requrest
        $validProduct = $request->validated();

        // update product
        $product = Product::create([
            'name' => $validProduct['name'],
            'category_id' => $validProduct['category_id'],
            'description' => $validProduct['description'],
            'price' => $validProduct['price'],
            'discount' => $validProduct['discount'],
            'enabled' => $validProduct['enabled'],
            'stock' => $validProduct['stock'],
            'max_quantity' => $validProduct['max_quantity'],
        ]);

        $main = $request->file('main');
        if (isset($main)) {

            // store main image
            $extension = $main->getClientOriginalExtension();
            $uuid = Str::uuid();
            $date = Carbon::now()->format('Y-m-d');
            $filename = $date.'_'.$uuid.'.'.$extension;
            $mainImgUrl = $main->storeAs('images', $filename, 'public');

            $product->update(['main_image_url' => $mainImgUrl]); // update image
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

                $product->imageUrl2s()->create([
                    'image_url' => $imageUrl,
                    'product_id' => $product->id,
                ]);
            }
        }

        // keep only first 5 images
        $keepIds = $product->imageUrl2s()
            ->orderBy('id')
            ->limit(5)
            ->pluck('id')
            ->toArray();
        ImageUrl2::where('product_id', $product->id)
            ->whereNotIn('id', $keepIds)
            ->delete();

        if ($product) {
            return redirect()->route('store.products',
                ['project' => $product->category->project->id])
                ->with('success', 'PRODUCT_CREATED');
        } else {
            return redirect()->route('store.products',
                ['project' => $product->category->project->id])
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }

    public function deleteProduct(Request $request, Product $product)
    {
        // authorize user access
        $this->authorize('delete', $product);

        // save project
        $project = $product->category->project;

        $product->imageUrl2s()->delete();
        $deleted = $product->delete();

        if ($deleted) {
            return redirect()->route('store.products',
                ['project' => $project->id])
                ->with('success', 'PRODUCT_DELETED');
        } else {
            return redirect()->route('store.products',
                ['project' => $project->id])
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }
}
