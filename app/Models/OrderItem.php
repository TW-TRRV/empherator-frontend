<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Clase OrderItem
 *
 * Representa un artículo individual dentro de un pedido.
 * Contiene el registro inmutable del precio al momento de la compra.
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

	/**
	 * Obtiene el pedido padre al que pertenece este artículo.
	 * Relación muchos a 1 con Order.
	 */
	public function order()
	{
		return $this->belongsTo(Order::class);
	}

	/**
	 * Obtiene la variante de producto específica comprada en este artículo.
	 * Relación muchos a 1 con ProductVariant.
	 */
	public function product_variant()
	{
		return $this->belongsTo(ProductVariant::class, 'variant_id');
	}
}
