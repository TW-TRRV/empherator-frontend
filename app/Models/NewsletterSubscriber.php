<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NewsletterSubscriber
 * 
 * @property int $id
 * @property string $email
 * @property bool|null $is_active
 * @property Carbon|null $subscribed_at
 *
 * @package App\Models
 */
class NewsletterSubscriber extends Model
{
	protected $table = 'newsletter_subscribers';
	public $timestamps = false;

	protected $casts = [
		'is_active' => 'bool',
		'subscribed_at' => 'datetime'
	];

	protected $fillable = [
		'email',
		'is_active',
		'subscribed_at'
	];
}
