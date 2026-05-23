<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        $featuredProducts = Product::where('is_featured', true)->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts
        ]);
    }
}
