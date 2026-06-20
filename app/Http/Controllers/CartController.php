<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductVariant;

/**
 * Controlador de Carrito
 *
 * Gestiona la carga de la vista del carrito de compras y la página de confirmación.
 */
class CartController extends Controller
{
    /**
     * Renderiza la vista del carrito.
     * Extrae de la base de datos de manera segura los precios de productos y variantes
     * para enviarlos al cliente y evitar alteraciones manuales de precios en el navegador.
     */
    public function index()
    {
        $productPrices = Product::pluck('base_price', 'id');
        $variantPrices = ProductVariant::pluck('price_override', 'id');

        return Inertia::render('Cart', [
            'productPrices' => $productPrices,
            'variantPrices' => $variantPrices
        ]);
    }

    /**
     * Renderiza la vista de confirmación de compra exitosa.
     */
    public function checkoutSuccess()
    {
        return Inertia::render('CheckoutSuccess');
    }
}
