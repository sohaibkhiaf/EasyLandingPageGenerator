<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SecurityController extends Controller
{
    public function updatePassword(UpdatePasswordRequest $request)
    {
        // validate passwords
        $validPasswords = $request->validated();

        // check current password
        if (Hash::check($validPasswords['current_password'], $request->user()->password)) {
            // update password
            User::find($request->user()->id)->update([
                'password' => $validPasswords['password'],
            ]);

            return redirect()->route('security')
                ->with('success', 'PASSWORD_UPDATED');
        } else {
            return redirect()->route('security')
                ->with('error', 'INVALID_PASSWORD');
        }

    }

    public function logoutOtherDevices(Request $request)
    {
        // delete other sessions
        DB::table('sessions')
            ->where('user_id', $request->user()->id)
            ->where('id', '!=', session()->getId())
            ->delete();

        // ai generated: recreate remember token
        User::find($request->user()->id)->forceFill([
            'remember_token' => Str::random(60),
        ])->save();

        return redirect()->route('security')
            ->with('success', 'DEVICES_LOGGED_OUT');
    }
}
