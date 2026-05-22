<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `view_hero_featured` AS select `empherator-db`.`product`.`id` AS `id`,`empherator-db`.`product`.`category` AS `category`,`empherator-db`.`product`.`subcategory` AS `subcategory`,`empherator-db`.`product`.`name` AS `name`,`empherator-db`.`product`.`base_price` AS `base_price`,json_value(`empherator-db`.`product`.`default_images`,'$.primary') AS `image_primary`,`empherator-db`.`product`.`is_featured` AS `is_featured` from `empherator-db`.`product` where `empherator-db`.`product`.`is_featured` = 1");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_hero_featured`");
    }
};
