<?php

use App\Models\Category;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->unsignedInteger('price');
            $table->unsignedInteger('discount')->nullable();
            $table->boolean('enabled')->default(true);
            $table->unsignedInteger('stock');
            $table->unsignedInteger('max_quantity')->default(5);
            $table->longText('main_image_url')->nullable();
            $table->foreignIdFor(Category::class)->constrained('categories')
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
        Schema::dropIfExists('products');
    }
};
