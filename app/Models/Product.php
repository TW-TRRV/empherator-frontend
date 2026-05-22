<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 * 
 * @property int $id
 * @property string $category
 * @property string $subcategory
 * @property string $name
 * @property string $description
 * @property float $base_price
 * @property bool|null $isglobalshippingavailable
 * @property string $warrantytime
 * @property string $spec_title_1
 * @property string $spec_value_1
 * @property string $spec_title_2
 * @property string $spec_value_2
 * @property string $spec_title_3
 * @property string $spec_value_3
 * @property string $benchmark_label
 * @property int $benchmark_score
 * @property string $default_images
 * @property bool|null $is_featured
 * @property Carbon|null $created_at
 * 
 * @property Collection|ProductVariant[] $product_variants
 * @property Collection|Review[] $reviews
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'product';
	public $timestamps = false;

	protected $casts = [
		'base_price' => 'float',
		'isglobalshippingavailable' => 'bool',
		'benchmark_score' => 'int',
		'is_featured' => 'bool'
	];

	protected $fillable = [
		'category',
		'subcategory',
		'name',
		'description',
		'base_price',
		'isglobalshippingavailable',
		'warrantytime',
		'spec_title_1',
		'spec_value_1',
		'spec_title_2',
		'spec_value_2',
		'spec_title_3',
		'spec_value_3',
		'benchmark_label',
		'benchmark_score',
		'default_images',
		'is_featured'
	];

	public function product_variants()
	{
		return $this->hasMany(ProductVariant::class);
	}

	public function reviews()
	{
		return $this->hasMany(Review::class);
	}
}
