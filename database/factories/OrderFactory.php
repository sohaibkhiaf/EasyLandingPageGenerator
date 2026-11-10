<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subtotal' => fake()->numberBetween(2000, 10000),
            'shipping' => fake()->numberBetween(300, 1200),
            'total' => fake()->numberBetween(2000, 10000),
            'client_address' => fake()->address,
            'client_name' => fake()->name,
            'client_phone' => fake()->phoneNumber,
            'shipping_type' => fake()->randomElement(['home', 'desk']),
            'project_name' => fake()->sentence(6),
            'quantity' => fake()->numberBetween(1, 5),
            'unit_price' => fake()->numberBetween(2000, 10000),
            'project_id' => 1,
            'order_status_id' => fake()->randomElement([1, 2, 3, 4, 5, 6]),
        ];
    }
}
