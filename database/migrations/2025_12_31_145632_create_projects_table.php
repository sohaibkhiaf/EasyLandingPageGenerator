<?php

use App\Models\User;
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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            // project information
            $table->string('project_class');
            $table->string('name');
            $table->string('slug');
            $table->string('meta_pixel_id');
            $table->string('default_language')->default('en');
            // landing page //
            $table->longText('description')->nullable();
            $table->unsignedInteger('price')->nullable();
            $table->unsignedInteger('discount')->nullable();
            $table->unsignedInteger('stock')->nullable();
            $table->unsignedInteger('max_quantity')->nullable()->default(5);
            $table->string('category')->nullable();
            // store //
            $table->string('headline')->nullable();
            $table->text('subheadline')->nullable();
            // visuals
            $table->text('icon_url')->nullable();
            $table->longText('main_image_url')->nullable();
            // shipping
            $table->boolean('free_shipping')->default(false);
            // owner
            $table->foreignIdFor(User::class)->constrained('users')
                ->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
