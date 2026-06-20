<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Clase User
 *
 * Modelo de usuario que interactúa con la tienda, incluyendo clientes y administradores.
 * 
 * @property int $id
 * @property string $email
 * @property string $password_hash
 * @property string $full_name
 * @property string|null $role
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Order[] $orders
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';

	protected $fillable = [
		'email',
		'password_hash',
		'full_name',
		'role'
	];

	/**
	 * Obtiene todos los pedidos realizados por el usuario.
	 * Relación 1 a muchos con Order.
	 */
	public function orders()
	{
		return $this->hasMany(Order::class);
	}
}
