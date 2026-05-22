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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_subscribe_newsletter`(
    IN p_email VARCHAR(255),
    OUT out_message VARCHAR(255)
)
BEGIN
    INSERT INTO newsletter_subscribers (email, is_active)
    VALUES (p_email, TRUE)
    ON DUPLICATE KEY UPDATE is_active = TRUE;
    
    SET out_message = 'SUCCESS: Email successfully subscribed to telemetry and field updates.';
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS sp_subscribe_newsletter");
    }
};
