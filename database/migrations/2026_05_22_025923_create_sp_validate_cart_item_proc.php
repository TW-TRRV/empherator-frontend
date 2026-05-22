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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_validate_cart_item`(
    IN p_variant_id INT,
    IN p_client_qty INT,
    IN p_client_price DECIMAL(10,2),
    OUT out_is_valid BOOLEAN,
    OUT out_status_message VARCHAR(255)
)
BEGIN
    DECLARE v_base_price DECIMAL(10,2);
    DECLARE v_override_price DECIMAL(10,2);
    DECLARE v_target_price DECIMAL(10,2);
    DECLARE v_db_stock INT;
    DECLARE v_product_name VARCHAR(100);
    DECLARE v_variant_name VARCHAR(100);
    
    -- Fetch product and variant pricing + stock levels
    SELECT p.name, p.base_price, v.variant_name, v.price_override, v.stock_quantity 
    INTO v_product_name, v_base_price, v_variant_name, v_override_price, v_db_stock
    FROM product_variants v
    JOIN product p ON v.product_id = p.id
    WHERE v.id = p_variant_id;
    
    -- Determine current actual live price (accounting for optional overrides)
    IF v_override_price IS NOT NULL THEN
        SET v_target_price = v_override_price;
    ELSE
        SET v_target_price = v_base_price;
    END IF;
    
    IF v_product_name IS NULL THEN
        SET out_is_valid = FALSE;
        SET out_status_message = 'ERROR: Selected product variant does not exist in our active database.';
    ELSEIF v_db_stock < p_client_qty THEN
        SET out_is_valid = FALSE;
        SET out_status_message = CONCAT('ERROR: Under-stock limit. Only (', v_db_stock, ') units available for ', v_product_name, ' (', v_variant_name, ').');
    ELSEIF v_target_price != p_client_price THEN
        SET out_is_valid = FALSE;
        SET out_status_message = CONCAT('PRICE MISMATCH: Live price updated. Correct cost is $', v_target_price);
    ELSE
        SET out_is_valid = TRUE;
        SET out_status_message = 'SUCCESS: Variant parameters validated successfully.';
    END IF;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS sp_validate_cart_item");
    }
};
