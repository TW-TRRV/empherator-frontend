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
        Schema::create('product', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('category', 50)->comment('e.g., MOUSE, KEYBOARDS, AUDIO, COMPONENTS');
            $table->string('subcategory', 50)->comment('e.g., PERIPHERALS, GPUS, HEADSETS');
            $table->string('name', 100)->unique('name');
            $table->text('description');
            $table->decimal('base_price', 10)->comment('Default base retail price');
            $table->boolean('isglobalshippingavailable')->nullable()->default(true);
            $table->string('warrantytime', 100)->comment('e.g., "2-Year Limited Warranty"');
            $table->string('spec_title_1', 100)->comment('e.g., POLLING RATE');
            $table->text('spec_value_1');
            $table->string('spec_title_2', 100)->comment('e.g., CHASSIS MATERIAL');
            $table->text('spec_value_2');
            $table->string('spec_title_3', 100)->comment('e.g., CHROMA RGB');
            $table->text('spec_value_3');
            $table->string('benchmark_label', 100)->default('INPUT ACCURACY');
            $table->integer('benchmark_score');
            $table->json('default_images')->comment('Structure: {"primary": "url", "gallery": ["url1", "url2"]}');
            $table->boolean('is_featured')->nullable()->default(false)->index('idx_featured_search')->comment('Determines visibility in hero section');
            $table->dateTime('created_at')->nullable()->useCurrent();

            $table->index(['category', 'subcategory'], 'idx_category_search');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
