<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderItem
 * 
 * @property int $id
 * @property int $order_id
 * @property int $variant_id
 * @property int $quantity
 * @property float $price_at_purchase
 * 
 * @property Order $order
 * @property ProductVariant $product_variant
 *
 * @package App\Models
 */
class OrderItem extends Model
{
	protected $table = 'order_items';
	public $timestamps = false;

	protected $casts = [
		'order_id' => 'int',
		'variant_id' => 'int',
		'quantity' => 'int',
		'price_at_purchase' => 'float'
	];

	protected $fillable = [
		'order_id',
		'variant_id',
		'quantity',
		'price_at_purchase'
	];

	public function order()
	{
		return $this->belongsTo(Order::class);
	}

	public function product_variant()
	{
		return $this->belongsTo(ProductVariant::class, 'variant_id');
	}
}
