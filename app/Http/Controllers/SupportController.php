<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupportRequest;
use App\Models\Support;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function requestSupport(StoreSupportRequest $request)
    {
        // validate support request
        $validSupport = $request->validated();

        $created = Support::create([
            'subject' => $validSupport['subject'],
            'content' => $validSupport['content'],
            'user_id' => $request->user()->id,
        ]);

        if ($created) {
            return redirect()->route('support')
                ->with('success', 'SUPPORT_REQUEST_CREATED');
        } else {
            return redirect()->route('support')
                ->with('error', 'UNEXPECTED_ERROR');
        }

    }
}
