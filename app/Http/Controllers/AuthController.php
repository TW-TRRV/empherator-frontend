<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controlador de Autenticación
 *
 * Gestiona la visualización de las páginas de inicio de sesión y registro.
 */
class AuthController extends Controller
{
    /**
     * Renderiza la página de inicio de sesión.
     */
    public function login()
    {
        return Inertia::render('Login');
    }

    /**
     * Renderiza la página de registro de usuario.
     */
    public function register()
    {
        return Inertia::render('Register');
    }
}
