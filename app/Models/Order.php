<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Clase Order
 *
 * Representa un pedido realizado en el sistema.
 * Puede estar asociado a un usuario registrado o tener un correo de invitado.
 * 
 * @property int $id
 * @property int|null $user_id
 * @property string|null $guest_email
 * @property float $total_amount
 * @property string|null $status
 * @property Carbon|null $created_at
 * 
 * @property User|null $user
 * @property Collection|OrderItem[] $order_items
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'total_amount' => 'float'
	];

	protected $fillable = [
		'user_id',
		'guest_email',
		'total_amount',
		'status'
	];

	/**
	 * Obtiene el usuario asociado a este pedido, si existe.
	 * Relación muchos a 1 con User.
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}

	/**
	 * Obtiene los artículos incluidos en este pedido.
	 * Relación 1 a muchos con OrderItem.
	 */
	public function order_items()
	{
		return $this->hasMany(OrderItem::class);
	}
}
