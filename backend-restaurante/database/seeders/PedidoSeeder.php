<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\Cliente;
use App\Models\Plato;

class PedidoSeeder extends Seeder
{
    public function run()
    {
        $platos = Plato::all(); // Obtener todos los platos existentes

        // Generar pedidos para cada cliente
        Cliente::all()->each(function ($cliente) use ($platos) {
            // Cada cliente tiene entre 1 y 3 pedidos
            Pedido::factory(rand(1, 3))->create(['cliente_id' => $cliente->id])->each(function ($pedido) use ($platos) {
                // Cada pedido tiene entre 1 y 5 platos
                $platosSeleccionados = $platos->random(rand(1, 5));
                foreach ($platosSeleccionados as $plato) {
                    $cantidad = rand(1, 3); // Cantidad aleatoria para cada plato
                    $pedido->platos()->attach($plato->id, ['cantidad' => $cantidad]);
                }
                // Calcular el precio total del pedido
                $pedido->calcularPrecioTotal();
            });
        });
    }
}

