<?php
$tmpStorage = '/tmp/storage/framework/views';
if (!is_dir($tmpStorage)) {
    mkdir($tmpStorage, 0777, true);
}

require __DIR__ . '/../public/index.php';
