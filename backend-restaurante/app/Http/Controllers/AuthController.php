<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $email = $request->getUser();
        $password = $request -> getPassword();

        Log::info('Email recibido para búsqueda:', ['email' => $email]);

        $user = User::where('email', $email)->first();

        Log::info('Resultado de la búsqueda del usuario:', ['user' => $user]);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        if (!Hash::check($password, $user->password)) {
            return response()->json(['error' => 'Contrasena incorrecta'], 401);
        }

        // Respuesta exitosa si la autenticación es correcta
        return response()->json(['message' => 'Inicio de sesion exitoso', 'user' => $user -> name, 'token' => $user -> remember_token], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
