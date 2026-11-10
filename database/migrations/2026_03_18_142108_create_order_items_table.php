<?php

use App\Models\Order;
use App\Models\Product;
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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('subtotal');
            $table->string('product_name')->nullable();
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedInteger('unit_price')->nullable();
            $table->foreignIdFor(Product::class)->constrained('products')
                ->cascadeOnDelete();
            $table->foreignIdFor(Order::class)->constrained('orders')
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
        Schema::dropIfExists('order_items');
    }
};
