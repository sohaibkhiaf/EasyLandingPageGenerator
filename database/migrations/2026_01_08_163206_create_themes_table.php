<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('light_color')->default('#0062cc');
            $table->string('dark_color')->default('#0055b3');
            $table->string('body_color')->default('#ffffff');
            $table->string('background_color')->default('#fafafa');
            $table->string('action_color')->default('#0062cc');
            $table->string('action_hover_color')->default('#0055b3');
            $table->string('facebook_link')->default('');
            $table->string('instagram_link')->default('');
            $table->string('tiktok_link')->default('');
            $table->string('contact_email')->default('');
            $table->string('contact_phone')->default('');
            $table->foreignIdFor(Project::class)->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
