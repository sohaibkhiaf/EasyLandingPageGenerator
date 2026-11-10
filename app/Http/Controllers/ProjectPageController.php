<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderStatusResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ShippingResource;
use App\Http\Resources\ThemeResource;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Project;
use Carbon\Carbon;

class ProjectPageController extends Controller
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

        return inertia('Project/Dashboard', [
            'project' => new ProjectResource($project),
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

        return inertia('Project/Orders', [
            'project' => new ProjectResource($project),
            'orders' => OrderResource::collection($orders),
            'statuses' => OrderStatusResource::collection($statuses),
            'status' => new OrderStatusResource($status),
        ]);
    }

    public function projectPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        return inertia('Project/Project', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function shippingPage(Project $project)
    {

        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve shippings
        $shippings = $project->shippings()->with('region')
            ->get();

        return inertia('Project/Shipping', [
            'project' => new ProjectResource($project),
            'shippings' => ShippingResource::collection($shippings),
        ]);
    }

    public function themePage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project->theme);

        return inertia('Project/Theme', [
            'project' => new ProjectResource($project),
            'theme' => new ThemeResource($project->theme),
        ]);
    }

    public function visualsPage(Project $project)
    {
        // ahthorize user access
        $this->authorize('view', $project);

        // retrieve related images
        $project = Project::where('id', $project->id)
            ->with('imageUrls')->first();

        return inertia('Project/Visuals', [
            'project' => new ProjectResource($project),
        ]);
    }
}
