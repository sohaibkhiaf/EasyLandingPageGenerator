<?php

use App\Models\Project;
use App\Models\Region;
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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('desk');
            $table->unsignedInteger('home');
            $table->boolean('enabled')->default(true);
            $table->foreignIdFor(Project::class)->constrained()
                ->cascadeOnDelete();
            $table->foreignIdFor(Region::class)->constrained()
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
        Schema::dropIfExists('shippings');
    }
};
