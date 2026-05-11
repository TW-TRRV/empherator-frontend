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

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/cart', function () {
    return Inertia::render('Cart');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/product/{id}', function ($id) {
    return Inertia::render('Product', ['id' => $id]);
});

Route::get('/weewoo', function () {
    return response()->json([
        '1. Salud General' => '200 OK - El routing funciona',
        '2. Base Path' => base_path(),
        '3. Existe app.blade.php?' => file_exists(resource_path('views/app.blade.php')) ? 'Sí' : 'NO (Error actual)',
        '4. Existe el Manifest de Vite?' => file_exists(public_path('build/manifest.json')) ? 'Sí' : 'NO (Causará error 500 en Inertia)',
        '5. Variables Vercel Inyectadas' => [
            'APP_STORAGE' => env('APP_STORAGE'),
            'APP_KEY_CONFIGURADA' => !empty(env('APP_KEY')),
        ],
        '6. Permisos de Escritura (/tmp)' => is_writable('/tmp/storage/framework/views') ? 'Sí' : 'No',
        '7. Rutas de Vista' => config('view.paths')
    ]);
});