<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\ActivityLog;
use App\Models\Region;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function registerPage(): Response
    {
        // retrieve regions
        $regions = Region::all();

        return inertia('Authentication/Register', ['regions' => $regions]);
    }

    public function register(RegisterRequest $request)
    {

        // validate register
        $request->validated();

        $user = User::create([
            'firstName' => $request->first_name,
            'lastName' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'region_id' => $request->region_id,
            'password' => Hash::make($request->password),
        ]);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'register',
            'model' => User::class,
            'model_id' => $user->id,
            'description' => 'USER REGISTERED',
        ]);

        event(new Registered($user));

        Auth::login($user, $request->remember);

        return redirect()->route('home')
            ->with('success', 'REGISTER_SUCCESS');
    }
}
