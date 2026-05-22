<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ViewHeroFeatured
 * 
 * @property int $id
 * @property string $category
 * @property string $subcategory
 * @property string $name
 * @property float $base_price
 * @property string|null $image_primary
 * @property bool|null $is_featured
 *
 * @package App\Models
 */
class ViewHeroFeatured extends Model
{
	protected $table = 'view_hero_featured';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'base_price' => 'float',
		'is_featured' => 'bool'
	];

	protected $fillable = [
		'id',
		'category',
		'subcategory',
		'name',
		'base_price',
		'image_primary',
		'is_featured'
	];
}
