<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\Project;
use App\Models\Support;
use App\Models\Theme;
use App\Observers\OrderObserver;
use App\Observers\ProjectObserver;
use App\Observers\SupportObserver;
use App\Observers\ThemeObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // login 5 attempts per ip
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });
        // register 5 attempts per ip
        RateLimiter::for('register', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        // place order 20 attempts per ip
        RateLimiter::for('order', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });

        // update projct limiter
        RateLimiter::for('projectUpdate', function (Request $request) {
            return Limit::perMinute(20)->by($request->user()->id);
        });
        // update theme limiter
        RateLimiter::for('themeUpdate', function (Request $request) {
            return Limit::perMinute(20)->by($request->user()->id);
        });
        // update visuals limiter
        RateLimiter::for('visualsUpdate', function (Request $request) {
            return Limit::perMinute(20)->by($request->user()->id);
        });
        // support form limiter
        RateLimiter::for('support', function (Request $request) {
            return Limit::perHour(20)->by($request->user()->id);
        });

        // register observers
        Project::observe(ProjectObserver::class);
        Theme::observe(ThemeObserver::class);
        Order::observe(OrderObserver::class);
        Support::observe(SupportObserver::class);
    }
}
