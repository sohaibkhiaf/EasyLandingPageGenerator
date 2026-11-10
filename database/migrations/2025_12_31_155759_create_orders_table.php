<?php

use App\Models\OrderStatus;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('subtotal');
            $table->unsignedInteger('shipping');
            $table->unsignedInteger('total');
            $table->string('client_address');
            $table->string('client_name');
            $table->string('client_phone');
            $table->string('shipping_type');
            $table->string('project_name')->nullable();
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedInteger('unit_price')->nullable();
            $table->foreignIdFor(Project::class)->constrained()
                ->cascadeOnDelete();
            $table->foreignIdFor(OrderStatus::class)->constrained()
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
        Schema::dropIfExists('orders');
    }
};
