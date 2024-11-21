<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'precio', 'tipo','descripcion', 'imagen'];

    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class)->withPivot('cantidad')->withTimestamps();
    }
}


