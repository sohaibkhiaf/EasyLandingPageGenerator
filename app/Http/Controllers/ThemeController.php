<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateThemeRequest;
use App\Models\Theme;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function updateTheme(UpdateThemeRequest $request, Theme $theme)
    {
        // authorize user access
        $this->authorize('update', $theme);

        // validate theme updating request
        $validTheme = $request->validated();

        // update theme
        $updated = $theme->update([
            'light_color' => $validTheme['light_color'],
            'dark_color' => $validTheme['dark_color'],
            'body_color' => $validTheme['body_color'],

            'background_color' => $validTheme['background_color'],
            'action_color' => $validTheme['action_color'],
            'action_hover_color' => $validTheme['action_hover_color'],

            'facebook_link' => $validTheme['facebook_link'] ?? '',
            'instagram_link' => $validTheme['instagram_link'] ?? '',
            'tiktok_link' => $validTheme['tiktok_link'] ?? '',
            'contact_email' => $validTheme['contact_email'] ?? '',
            'contact_phone' => $validTheme['contact_phone'] ?? '',
        ]);

        if ($updated) {
            return redirect()->route('project.theme', [
                'project' => $theme->project->id,
            ])->with('success', 'THEME_UPDATED');
        } else {
            return redirect()->route('project.theme', [
                'project' => $theme->project->id,
            ])->with('error', 'UNEXPECTED_ERROR');
        }

    }
}
