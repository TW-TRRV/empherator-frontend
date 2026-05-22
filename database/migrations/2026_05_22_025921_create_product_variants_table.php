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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('product_id')->index('idx_variant_product');
            $table->string('sku', 100)->unique('sku')->comment('Unique identifier, e.g., EMPH1-BLK, EMPH1-WHT');
            $table->string('variant_name', 100)->comment('The variant distinction, e.g., Carbon Black, Arctic White');
            $table->decimal('price_override', 10)->nullable()->comment('Optional price override for this color. If NULL, use product.base_price');
            $table->integer('stock_quantity')->default(0)->comment('Variant-specific inventory calculation');
            $table->json('images')->comment('Structure: {"primary": "url", "gallery": ["thumb_url_1"]}');
            $table->dateTime('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
