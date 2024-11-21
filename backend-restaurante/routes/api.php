<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\PedidoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/users', UserController::class)->middleware(AuthMiddleware::class);

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('clientes', ClienteController::class);

Route::apiResource('/pedidos', PedidoController::class)->middleware(AuthMiddleware::class);

Route::put('/pedidos/{id}', [PedidoController::class, 'update'])->middleware(AuthMiddleware::class);

Route::apiResource('platos', PlatoController::class);
