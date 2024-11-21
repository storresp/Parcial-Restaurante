<?php

namespace Database\Factories;

use App\Models\Pedido;
Use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class PedidoFactory extends Factory
{
    protected $model = Pedido::class;

    public function definition()
    {
        return [
            'cliente_id' => Cliente::factory(),
            'estado' => 'PENDIENTE',
        ];
    }
}

