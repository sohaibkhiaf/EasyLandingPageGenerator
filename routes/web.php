<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\Order2Controller;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectPageController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\SecurityController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StorePage2Controller;
use App\Http\Controllers\StorePageController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\Theme2Controller;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\Visual2sController;
use App\Http\Controllers\VisualsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// production ///////////////////////////////////////////

// Route::domain('page.elpgen.com')->group(function () {
//     Route::get('/', function () {
//         return abort(404);
//     });
//     Route::get('/{slug}', [LandingPageController::class, 'landingPage'])
//       	->name('landing.page');

//     Route::post('/{project}/order', [LandingPageController::class, 'createOrder'])
//         ->middleware('throttle:order')
//         ->name('page.order');
//  });

// Route::domain('store.elpgen.com')->group(function () {
//     Route::get('/', function () {
//         return abort(404);
//     });
//     Route::get('/{slug}', [StorePage2Controller::class, 'storePage'])
//       	->name('store.page');

//     Route::post('/{project}/order', [StorePage2Controller::class, 'createOrder'])
//         ->middleware('throttle:order')
//         ->name('store.order');
//  });

// local /////////////////////////////////////////////
Route::get('/page/slug/{slug}', [LandingPageController::class, 'landingPage'])
    ->name('landing.page');

Route::post('/page/slug/{project}/order', [LandingPageController::class, 'createOrder'])
    ->middleware('throttle:order')
    ->name('page.order');

Route::get('/store/slug/{slug}', [StorePage2Controller::class, 'storePage'])
    ->name('store.page');

Route::post('/store/slug/{project}/order', [StorePage2Controller::class, 'createOrder'])
    ->middleware('throttle:order')
    ->name('store.order');

// /////////////////////////////////////////////////////

// store language
Route::post('/language/change', function (Request $request) {
    session(['locale' => $request->language]);

    return back();
})->name('language.change');

// main page
Route::get('/', function () {
    return inertia('MainPage/MainPage');
})->name('main.page');

// user pages
Route::middleware('auth')->group(function () {

    // home page
    Route::get('/home', [HomePageController::class, 'homePage'])
        ->name('home');

    Route::get('/home/account', [HomePageController::class, 'accountPage'])
        ->name('account');

    Route::get('/home/security', [HomePageController::class, 'securityPage'])
        ->name('security');

    Route::get('/home/support', [HomePageController::class, 'supportPage'])
        ->name('support');

    Route::get('/home/create', [HomePageController::class, 'createProjectPage'])
        ->name('create');

    Route::get('/home/store', [HomePageController::class, 'createStorePage'])
        ->name('store');

    // project page
    Route::get('/project/{project}/dashboard', [ProjectPageController::class, 'dashboardPage'])
        ->name('project.dashboard');

    Route::get('/project/{project}/orders/{status}', [ProjectPageController::class, 'ordersPage'])
        ->name('project.orders');

    Route::get('/project/{project}/project', [ProjectPageController::class, 'projectPage'])
        ->name('project.project');

    Route::get('/project/{project}/theme', [ProjectPageController::class, 'themePage'])
        ->name('project.theme');

    Route::get('/project/{project}/shipping', [ProjectPageController::class, 'shippingPage'])
        ->name('project.shipping');

    Route::get('/project/{project}/visuals', [ProjectPageController::class, 'visualsPage'])
        ->name('project.visuals');

    // store page
    Route::get('/store/{project}/dashboard', [StorePageController::class, 'dashboardPage'])
        ->name('store.dashboard');

    Route::get('/store/{project}/orders/{status}', [StorePageController::class, 'ordersPage'])
        ->name('store.orders');

    Route::get('/store/{project}/store', [StorePageController::class, 'storePage'])
        ->name('store.store');

    Route::get('/store/{project}/theme', [StorePageController::class, 'themePage'])
        ->name('store.theme');

    Route::get('/store/{project}/categories', [StorePageController::class, 'categoriesPage'])
        ->name('store.categories');

    Route::get('/store/{project}/products', [StorePageController::class, 'productsPage'])
        ->name('store.products');

    Route::get('/store/{project}/product/{product}/edit', [StorePageController::class, 'editProductPage'])
        ->name('store.products.edit');

    Route::get('/store/{project}/product/create', [StorePageController::class, 'createProductPage'])
        ->name('store.products.create');

    Route::get('/store/{project}/shipping', [StorePageController::class, 'shippingPage'])
        ->name('store.shipping');

    Route::get('/store/{project}/visuals', [StorePageController::class, 'visualsPage'])
        ->name('store.visuals');

    // support
    Route::post('/support/request', [SupportController::class, 'requestSupport'])
        ->middleware('throttle:support')
        ->name('support.request');

    // security
    Route::post('/security/password', [SecurityController::class, 'updatePassword'])
        ->name('security.password');

    Route::post('/security/session', [SecurityController::class, 'logoutOtherDevices'])
        ->name('security.session');

    // account
    Route::post('/account/update', [AccountController::class, 'updateAccount'])
        ->name('account.update');

    // orders
    Route::post('orders/{order}/update', [OrderController::class, 'updateOrder'])
        ->name('order.update');

    Route::post('orders/{order}/delete', [OrderController::class, 'deleteOrder'])
        ->name('order.delete');

    // order2s
    Route::post('order2s/{order}/update', [Order2Controller::class, 'updateOrder'])
        ->name('order2.update');

    Route::post('order2s/{order}/delete', [Order2Controller::class, 'deleteOrder'])
        ->name('order2.delete');

    // shipping
    Route::post('/shipping/{shipping}/update', [ShippingController::class, 'updateShipping'])
        ->name('shipping.update');

    Route::post('/shipping/{project}/free', [ShippingController::class, 'activateFreeShipping'])
        ->name('shipping.free');

    Route::post('/shipping/{project}/paid', [ShippingController::class, 'deactivateFreeShipping'])
        ->name('shipping.paid');

    // project
    Route::post('/project/create', [ProjectController::class, 'createProject'])
        ->name('project.create');

    Route::post('/project/{project}/update', [ProjectController::class, 'updateProject'])
        ->middleware('throttle:projectUpdate')
        ->name('project.update');

    Route::post('/project/{project}/delete', [ProjectController::class, 'deleteProject'])
        ->name('project.delete');

    // theme
    Route::post('/theme/{theme}/update', [ThemeController::class, 'updateTheme'])
        ->middleware('throttle:themeUpdate')
        ->name('theme.update');

    // visuals
    Route::post('/visuals/{project}/update', [VisualsController::class, 'updateVisuals'])
        ->middleware('throttle:visualsUpdate')
        ->name('visuals.update');

    // theme2
    Route::post('/theme2/{theme}/update', [Theme2Controller::class, 'updateTheme'])
        ->middleware('throttle:themeUpdate')
        ->name('theme2.update');

    // visuals2
    Route::post('/visuals2/{project}/update', [Visual2sController::class, 'updateVisuals'])
        ->middleware('throttle:visualsUpdate')
        ->name('visual2s.update');

    // store
    Route::post('/store/create', [StoreController::class, 'createStore'])
        ->name('store.create');

    Route::post('/store/{project}/update', [StoreController::class, 'updateStore'])
        ->middleware('throttle:projectUpdate')
        ->name('store.update');

    Route::post('/store/{project}/delete', [StoreController::class, 'deleteStore'])
        ->name('store.delete');

    // categories
    Route::post('/categories/{project}/create', [CategoryController::class, 'createCategory'])
        ->name('category.create');

    Route::post('/categories/{category}/delete', [CategoryController::class, 'deleteCategory'])
        ->name('category.delete');

    Route::post('/categories/{category}/update', [CategoryController::class, 'updateCategory'])
        ->name('category.update');

    // products
    Route::post('/products/{product}/update', [ProductController::class, 'updateProduct'])
        ->name('product.update');

    Route::post('/products/{project}/create', [ProductController::class, 'createProduct'])
        ->name('product.create');

    Route::post('/products/{product}/delete', [ProductController::class, 'deleteProduct'])
        ->name('product.delete');

});

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'registerPage'])
        ->name('register');
    Route::post('/register', [RegisteredUserController::class, 'register'])
        ->middleware('throttle:register');

    Route::get('/login', [AuthenticatedSessionController::class, 'loginPage'])
        ->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'login'])
        ->middleware('throttle:login');

});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])
        ->name('logout');
});
