<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductVariant
 * 
 * @property int $id
 * @property int $product_id
 * @property string $sku
 * @property string $variant_name
 * @property float|null $price_override
 * @property int $stock_quantity
 * @property string $images
 * @property Carbon|null $created_at
 * 
 * @property Product $product
 * @property Collection|OrderItem[] $order_items
 *
 * @package App\Models
 */
class ProductVariant extends Model
{
	protected $table = 'product_variants';
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'price_override' => 'float',
		'stock_quantity' => 'int'
	];

	protected $fillable = [
		'product_id',
		'sku',
		'variant_name',
		'price_override',
		'stock_quantity',
		'images'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function order_items()
	{
		return $this->hasMany(OrderItem::class, 'variant_id');
	}
}
