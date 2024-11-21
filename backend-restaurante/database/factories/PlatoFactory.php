<?php

namespace Database\Factories;

use App\Models\Plato;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlatoFactory extends Factory
{
    protected $model = Plato::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'tipo' => $this->faker->word,
            'descripcion' => $this->faker->sentence,
            'precio' => $this->faker->randomFloat(2, 5, 100),
            'imagen' => $this->faker->imageUrl(640, 480, 'food'),
        ];
    }
}

