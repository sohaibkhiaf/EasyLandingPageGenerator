<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipping>
 */
class ShippingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'desk' => fake()->numberBetween(300, 1200),
            'home' => fake()->numberBetween(300, 1200),
            'enabled' => fake()->boolean,
            'region_id' => 1,
            'project_id' => 1,
        ];
    }
}
