<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAccountRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function updateAccount(UpdateAccountRequest $request)
    {
        // validate account request
        $validAccount = $request->validated();

        // update account information
        $updated = User::find($request->user()->id)
            ->update([
                'firstName' => $validAccount['first_name'],
                'lastName' => $validAccount['last_name'],
                'email' => $validAccount['email'],
                'phone' => $validAccount['phone'],
                'address' => $validAccount['address'],
                'region_id' => $validAccount['region_id'],
            ]);

        if ($updated) {
            return redirect()->route('account')
                ->with('success', 'ACCOUNT_UPDATED');
        } else {
            return redirect()->route('account')
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }
}
