<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutController;

Route::get('/catalog', [ProductController::class, 'catalog']);

Route::get('/', [PageController::class, 'home']);

Route::get('/cart', [CartController::class, 'index']);

Route::post('/checkout', [CheckoutController::class, 'process']);

Route::get('/checkout-success', [CartController::class, 'checkoutSuccess']);

Route::get('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'register']);

Route::get('/product/{id}', [ProductController::class, 'show']);


Route::get('/admin/products', [AdminProductController::class, 'index']);
Route::post('/admin/products', [AdminProductController::class, 'store']);
Route::put('/admin/products/{id}', [AdminProductController::class, 'update']);
Route::delete('/admin/products/{id}', [AdminProductController::class, 'destroy']);
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
