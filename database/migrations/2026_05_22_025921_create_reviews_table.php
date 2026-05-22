<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('product_id')->index('idx_review_product');
            $table->string('user', 100)->comment('Name or profile tag of the reviewer');
            $table->string('user_tag', 50)->nullable()->default('PRO USER')->comment('Displays badge like "PRO USER"');
            $table->boolean('isverified')->nullable()->default(true);
            $table->decimal('rating', 2, 1)->comment('Rating from 1.0 to 5.0');
            $table->text('reviewtext');
            $table->dateTime('timestamp')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
