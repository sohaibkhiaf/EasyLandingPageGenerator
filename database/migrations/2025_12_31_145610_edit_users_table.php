<?php

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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('role')->default(0);
            $table->string('phone');
            $table->string('address');
            $table->foreignIdFor(Region::class)->constrained()
                ->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
            $table->dropColumn('phone');
            $table->dropColumn('address');
            $table->dropConstrainedForeignIdFor(Region::class);
        });
    }
};
