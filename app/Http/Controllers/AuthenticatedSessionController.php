<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function loginPage(): Response
    {
        return inertia('Authentication/Login');
    }

    public function login(LoginRequest $request)
    {
        // validate login
        $request->validated();

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, $request->remember)) {
            ActivityLog::create([
                'user_id' => auth()->id(),
                'action' => 'login',
                'model' => User::class,
                'model_id' => auth()->id(),
                'description' => 'USER LOGGED IN :: REMEMBER ME = '.$request->remember,
            ]);

            return redirect()->route('home')
                ->with('success', 'LOGIN_SUCCESS');
        } else {
            return redirect()->route('login')
                ->with('error', 'INVALID_CREDENTIALS');
        }
    }

    public function logout(Request $request)
    {

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'logout',
            'model' => User::class,
            'model_id' => auth()->id(),
            'description' => 'USER LOGGED OUT',
        ]);

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('main.page')
            ->with('success', 'LOGOUT_SUCCESS');
    }
}
