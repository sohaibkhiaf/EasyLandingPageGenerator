<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\RegionResource;
use App\Models\Order;
use App\Models\Project;
use App\Models\Region;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Jenssegers\Agent\Agent;

class HomePageController extends Controller
{
    public function accountPage()
    {

        return inertia('Home/Account', [
            'regions' => RegionResource::collection(Region::all()),
        ]);
    }

    public function securityPage(Request $request)
    {

        // retrieve user sessions
        $sessions = DB::table('sessions')
            ->where('user_id', $request->user()->id)
            ->orderBy('last_activity', 'desc')
            ->get();

        // extract user agents
        $devices = [];
        foreach ($sessions as $session) {
            $agent = new Agent;
            $agent->setUserAgent($session->user_agent);

            $device = [
                'session_id' => $session->id,
                'browser' => $agent->browser(),
                'platform' => $agent->platform(),
                'ip' => $session->ip_address,
                'last_activity' => Carbon::createFromTimestamp($session->last_activity)
                    ->diffForHumans(),
                'is_current' => $session->id == session()->getId(),
            ];

            $devices[] = $device;
        }

        return inertia('Home/Security', ['devices' => $devices]);
    }

    public function supportPage()
    {
        return inertia('Home/Support');
    }

    public function homePage()
    {
        // authenticated user id
        $userId = auth()->user()->id;

        // total orders number
        $totalOrders = Order::whereHas('project',
            function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->count();

        // total sales number
        $totalSales = Order::whereHas('project',
            function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->sum('subtotal');

        return inertia('Home/Home', [
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'projects' => ProjectResource::collection(
                Project::where('user_id', $userId)
                    ->get()),
        ]);
    }

    public function createProjectPage()
    {
        return inertia('Home/CreateProject');
    }

    public function createStorePage()
    {
        return inertia('Home/CreateStore');
    }
}
