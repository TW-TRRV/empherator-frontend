<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/catalog', function () {
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
});

// Aquí puedes ir agregando las demás rutas, por ejemplo:
// Route::get('/catalog', [TuControlador::class, 'index']);