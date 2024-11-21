<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClienteSeeder extends Seeder
{
    public function run()
    {
        // Generar 5 clientes
        Cliente::factory(5)->create();
    }
}



