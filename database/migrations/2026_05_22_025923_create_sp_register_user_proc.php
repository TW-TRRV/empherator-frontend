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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register_user`(
    IN p_email VARCHAR(255),
    IN p_plain_password VARCHAR(255), 
    IN p_name VARCHAR(100),
    OUT out_success BOOLEAN,
    OUT out_message VARCHAR(255)
)
BEGIN
    IF EXISTS(SELECT 1 FROM users WHERE email = p_email) THEN
        SET out_success = FALSE;
        SET out_message = 'ERROR: An account with this email address already exists.';
    ELSE
        INSERT INTO users (email, password_hash, full_name, role)
        VALUES (p_email, SHA2(p_plain_password, 256), p_name, 'customer');
        
        SET out_success = TRUE;
        SET out_message = 'SUCCESS: Account generated successfully.';
    END IF;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS sp_register_user");
    }
};
