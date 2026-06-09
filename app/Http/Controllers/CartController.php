<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        $productPrices = Product::pluck('base_price', 'id');
        return Inertia::render('Cart', [
            'productPrices' => $productPrices
        ]);
    }

    public function checkoutSuccess()
    {
        return Inertia::render('CheckoutSuccess');
    }
}
