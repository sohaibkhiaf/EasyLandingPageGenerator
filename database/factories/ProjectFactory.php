<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(5),
            'description' => fake()->text(500),
            'price' => fake()->numberBetween(2000, 50000),
            'stock' => fake()->numberBetween(1, 10),
            'discount' => fake()->numberBetween(2000, 10000),
            'free_shipping' => false,
            'category' => fake()->sentence(5),
            'user_id' => 1,
            'default_language' => 'fr',
        ];
    }
}
