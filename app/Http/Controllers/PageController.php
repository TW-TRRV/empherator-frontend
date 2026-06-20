<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controlador de Páginas
 *
 * Gestiona la carga de vistas estáticas o principales de la aplicación, como la página de inicio.
 */
class PageController extends Controller
{
    /**
     * Renderiza la página principal (Home).
     * Obtiene los productos marcados como destacados y los pasa a la vista.
     */
    public function home()
    {
        $featuredProducts = Product::where('is_featured', true)->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts
        ]);
    }
}
