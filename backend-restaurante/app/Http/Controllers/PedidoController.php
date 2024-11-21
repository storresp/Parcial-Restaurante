<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pedido;
use App\Models\Plato;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pedidos = Pedido::with('platos', 'cliente')->get();
        return response()
            ->json(['pedidos' => $pedidos], 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'platos' => 'required|array',
            'platos.*.id' => 'required|exists:platos,id',
            'platos.*.cantidad' => 'required|integer|min:1',
        ]);

        $pedido = Pedido::create([
            'cliente_id' => $validated['cliente_id'],
        ]);

        foreach ($validated['platos'] as $plato) {
            $pedido->platos()->attach($plato['id'], ['cantidad' => $plato['cantidad']]);
        }

        $pedido->calcularPrecioTotal();

        return $pedido->load('platos', 'cliente');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $validated = $request->validate([
            'estado' => 'required|string|in:PENDIENTE,ATENDIDO',
        ]);

        $pedido->estado = $validated['estado'];
        $pedido->save();

        return response()
            ->json([
            'message' => 'Pedido actualizado correctamente.',
            'pedido' => $pedido,
        ], 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
