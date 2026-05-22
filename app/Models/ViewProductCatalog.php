<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ViewProductCatalog
 * 
 * @property int $product_id
 * @property string $product_name
 * @property string $category
 * @property string $subcategory
 * @property float $base_price
 * @property float|null $total_inventory
 * @property int $variant_count
 *
 * @package App\Models
 */
class ViewProductCatalog extends Model
{
	protected $table = 'view_product_catalog';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'base_price' => 'float',
		'total_inventory' => 'float',
		'variant_count' => 'int'
	];

	protected $fillable = [
		'product_id',
		'product_name',
		'category',
		'subcategory',
		'base_price',
		'total_inventory',
		'variant_count'
	];
}
