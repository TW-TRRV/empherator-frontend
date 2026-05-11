<?php
// 1. Crear toda la estructura que Laravel necesita en la memoria volátil de Vercel
$directories = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs'
];

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

// 2. Definir una variable de entorno para que Laravel sepa dónde escribir
$_ENV['APP_STORAGE'] = '/tmp/storage';

require __DIR__ . '/../public/index.php';