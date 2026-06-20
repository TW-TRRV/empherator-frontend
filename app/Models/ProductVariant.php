<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Clase ProductVariant
 *
 * Representa una variante específica (SKU) de un producto.
 * Gestiona atributos como cantidad en stock, sobrescritura de precio y conjunto de imágenes propias.
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

	/**
	 * Obtiene el producto padre al que pertenece esta variante.
	 * Relación muchos a 1 con Product.
	 */
	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	/**
	 * Obtiene los elementos de pedido (order items) que incluyen esta variante.
	 * Relación 1 a muchos con OrderItem.
	 */
	public function order_items()
	{
		return $this->hasMany(OrderItem::class, 'variant_id');
	}
}
