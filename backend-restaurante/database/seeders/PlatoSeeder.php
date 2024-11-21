<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plato;

class PlatoSeeder extends Seeder
{
    public function run()
    {
        // Generar 10 platos
        Plato::factory(10)->create();
    }
}


