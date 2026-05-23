<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where('name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('category', 'like', '%' . $searchTerm . '%')
                  ->orWhere('subcategory', 'like', '%' . $searchTerm . '%');
        }

        $products = $query->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Products', [
            'products' => $products,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:50',
            'subcategory' => 'required|string|max:50',
            'name' => 'required|string|max:100|unique:product,name',
            'description' => 'required|string',
            'base_price' => 'required|numeric',
            'isglobalshippingavailable' => 'required|boolean',
            'warrantytime' => 'required|string|max:100',
            'spec_title_1' => 'required|string|max:100',
            'spec_value_1' => 'required|string',
            'spec_title_2' => 'required|string|max:100',
            'spec_value_2' => 'required|string',
            'spec_title_3' => 'required|string|max:100',
            'spec_value_3' => 'required|string',
            'benchmark_label' => 'required|string|max:100',
            'benchmark_score' => 'required|integer',
            'primary_image' => 'required|string',
            'gallery_images' => 'required|array|max:4',
            'gallery_images.*' => 'required|string',
            'is_featured' => 'required|boolean',
        ]);

        $defaultImages = [
            'primary' => $validated['primary_image'],
            'gallery' => $validated['gallery_images']
        ];

        Product::create([
            'category' => $validated['category'],
            'subcategory' => $validated['subcategory'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'base_price' => $validated['base_price'],
            'isglobalshippingavailable' => $validated['isglobalshippingavailable'],
            'warrantytime' => $validated['warrantytime'],
            'spec_title_1' => $validated['spec_title_1'],
            'spec_value_1' => $validated['spec_value_1'],
            'spec_title_2' => $validated['spec_title_2'],
            'spec_value_2' => $validated['spec_value_2'],
            'spec_title_3' => $validated['spec_title_3'],
            'spec_value_3' => $validated['spec_value_3'],
            'benchmark_label' => $validated['benchmark_label'],
            'benchmark_score' => $validated['benchmark_score'],
            'default_images' => json_encode($defaultImages),
            'is_featured' => $validated['is_featured']
        ]);

        return redirect('/admin/products')->with('success', 'Product created successfully.');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect('/admin/products')->with('success', 'Product deleted successfully.');
    }
}
