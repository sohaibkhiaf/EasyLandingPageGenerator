<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\Order2Resource;
use App\Http\Resources\OrderStatusResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ShippingResource;
use App\Http\Resources\StoreResource;
use App\Http\Resources\Theme2Resource;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Project;
use Carbon\Carbon;

class StorePageController extends Controller
{
    public function dashboardPage(Project $project)
    {

        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve stats (today, yesterday, this week, this month, this year, all time)
        $statsToday = Order::whereDate('created_at', Carbon::today())
            ->where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();
        $statsYesterday = Order::whereDate('created_at', Carbon::yesterday())
            ->where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();
        $statsWeek = Order::whereBetween('created_at',
            [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();
        $statsMonth = Order::whereBetween('created_at',
            [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();
        $statsYear = Order::whereBetween('created_at',
            [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
            ->where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();
        $statsAllTime = Order::where('project_id', $project->id)
            ->selectRaw('COUNT(*) as orders_count, COALESCE(SUM(total),0) as earnings')
            ->first();

        return inertia('Store/Dashboard', [
            'project' => new StoreResource($project),
            'statsToday' => $statsToday,
            'statsYesterday' => $statsYesterday,
            'statsWeek' => $statsWeek,
            'statsMonth' => $statsMonth,
            'statsYear' => $statsYear,
            'statsAllTime' => $statsAllTime,
        ]);
    }

    public function ordersPage(Project $project, OrderStatus $status)
    {

        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve orders based on selected status
        if ($status->id == '1' || $status->id == '2') {
            $orders = Order::where('project_id', $project->id)
                ->where('order_status_id', $status->id)
                ->with('orderStatus')
                ->orderBy('created_at', 'asc')
                ->paginate(6)
                ->onEachSide(1024);
        } elseif ($status->id == '3') {
            $orders = Order::where('project_id', $project->id)
                ->where('order_status_id', $status->id)
                ->with('orderStatus')
                ->orderBy('updated_at', 'asc')
                ->paginate(6)
                ->onEachSide(1024);
        } else {
            $orders = Order::where('project_id', $project->id)
                ->where('order_status_id', $status->id)
                ->with('orderStatus')
                ->orderBy('updated_at', 'desc')
                ->paginate(6)
                ->onEachSide(1024);
        }

        // retrieve statuses
        $statuses = OrderStatus::all();

        return inertia('Store/Orders', [
            'project' => new StoreResource($project),
            'orders' => Order2Resource::collection($orders),
            'statuses' => OrderStatusResource::collection($statuses),
            'status' => new OrderStatusResource($status),
        ]);
    }

    public function storePage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        return inertia('Store/Store', [
            'project' => new StoreResource($project),
        ]);
    }

    public function shippingPage(Project $project)
    {

        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve shippings
        $shippings = $project->shippings()->with('region')
            ->get();

        return inertia('Store/Shipping', [
            'project' => new StoreResource($project),
            'shippings' => ShippingResource::collection($shippings),
        ]);
    }

    public function themePage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project->theme);

        return inertia('Store/Theme', [
            'project' => new StoreResource($project),
            'theme' => new Theme2Resource($project->theme),
        ]);
    }

    public function visualsPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve related images
        $project = Project::where('id', $project->id)
            ->with('imageUrls')->first();

        return inertia('Store/Visuals', [
            'project' => new StoreResource($project),
        ]);
    }

    public function categoriesPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve categories
        $categories = $project->categories()->get();

        return inertia('Store/Categories', [
            'project' => new StoreResource($project),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function productsPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve products
        $products = Product::whereHas('category', function ($query) use ($project) {
            $query->where('project_id', $project->id);
        })->get();

        return inertia('Store/Products', [
            'project' => new StoreResource($project),
            'products' => ProductResource::collection($products),
        ]);
    }

    public function editProductPage(Project $project, Product $product)
    {
        // ahthorize user access
        $this->authorize('update', $product);

        // retrieve categories
        $categories = $project->categories;

        return inertia('Store/EditProduct', [
            'project' => new StoreResource($project),
            'product' => new ProductResource($product),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function createProductPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve categories
        $categories = $project->categories;

        return inertia('Store/CreateProduct', [
            'project' => new StoreResource($project),
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
