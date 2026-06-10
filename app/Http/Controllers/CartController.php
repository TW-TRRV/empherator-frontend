<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductVariant;

class CartController extends Controller
{
    public function index()
    {
        $productPrices = Product::pluck('base_price', 'id');
        $variantPrices = ProductVariant::pluck('price_override', 'id');

        return Inertia::render('Cart', [
            'productPrices' => $productPrices,
            'variantPrices' => $variantPrices
        ]);
    }

    public function checkoutSuccess()
    {
        return Inertia::render('CheckoutSuccess');
    }
}
