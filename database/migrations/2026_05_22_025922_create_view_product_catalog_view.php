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
        DB::statement("CREATE VIEW `view_product_catalog` AS select `p`.`id` AS `product_id`,`p`.`name` AS `product_name`,`p`.`category` AS `category`,`p`.`subcategory` AS `subcategory`,`p`.`base_price` AS `base_price`,sum(`v`.`stock_quantity`) AS `total_inventory`,count(`v`.`id`) AS `variant_count` from (`empherator-db`.`product` `p` left join `empherator-db`.`product_variants` `v` on(`p`.`id` = `v`.`product_id`)) group by `p`.`id`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_product_catalog`");
    }
};
