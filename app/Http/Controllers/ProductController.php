<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controlador de Productos
 *
 * Gestiona la visualización pública del catálogo de productos y de la página
 * individual de detalles del producto, conectándose a InertiaJS.
 */
class ProductController extends Controller
{
    /**
     * Muestra el catálogo de productos.
     * Filtra los productos por categoría si se proporciona en la solicitud.
     * Renderiza la vista React 'Catalog'.
     */
    public function catalog(Request $request) : Response
    {
        $query = Product::select();

        if ($request->has('category') && !empty($request->category)) {
            $query->where('category', $request->category);
        }

        $products = $query->get();

        return Inertia::render('Catalog', [
            'products' => $products,
            'currentCategory' => $request->category,
        ]);
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
     * Muestra la página de detalles de un producto en específico.
     * Carga de forma impaciente (eager loading) las variantes del producto.
     * Renderiza la vista React 'Product'.
     *
     * @param int $id El ID del producto.
     */
    public function show($id): Response
    {
    $product = Product::with('product_variants')->findOrFail($id);

    return Inertia::render('Product', [
        'product' => $product
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
