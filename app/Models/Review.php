<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Review
 * 
 * @property int $id
 * @property int $product_id
 * @property string $user
 * @property string|null $user_tag
 * @property bool|null $isverified
 * @property float $rating
 * @property string $reviewtext
 * @property Carbon|null $timestamp
 * 
 * @property Product $product
 *
 * @package App\Models
 */
class Review extends Model
{
	protected $table = 'reviews';
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'isverified' => 'bool',
		'rating' => 'float',
		'timestamp' => 'datetime'
	];

	protected $fillable = [
		'product_id',
		'user',
		'user_tag',
		'isverified',
		'rating',
		'reviewtext',
		'timestamp'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
