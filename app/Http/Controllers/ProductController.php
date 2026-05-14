<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function catalog()
    {
        // 1. Defines tus datos directamente en memoria (Mock Data) en lugar de consultar la BD
        $mockProducts = [
            [
                'id' => 'kbd-001',
                'name' => 'Pro Mechanical Keyboard',
                'price' => 149.99,
                'switch_type' => 'Linear Silver',
                'description' => 'Zero-latency mechanical switches encased in an aircraft-grade aluminum chassis.'
            ],
            [
                'id' => 'mse-002',
                'name' => 'Precision Mouse',
                'price' => 89.99,
                'switch_type' => 'Optical',
                'description' => 'Ultra-lightweight frame with maximum polling rate accuracy.'
            ]
        ];

        // 2. Se lo pasas a tu vista de React a través de Inertia
        return Inertia::render('Catalog', [
            'products' => $mockProducts
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Product', ['id' => $id]);
    }
}
