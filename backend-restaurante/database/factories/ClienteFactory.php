<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'numero_celular' => $this->faker->phoneNumber,
            'direccion' => $this->faker->address,
        ];
    }
}

