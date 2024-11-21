<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = ['cliente_id', 'estado', 'precio_total'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function platos()
    {
        return $this->belongsToMany(Plato::class)->withPivot('cantidad')->withTimestamps();
    }

    public function calcularPrecioTotal()
    {
        $this->precio_total = $this->platos->sum(function ($plato) {
            return $plato->pivot->cantidad * $plato->precio;
        });

        $this->save();
    }
}
