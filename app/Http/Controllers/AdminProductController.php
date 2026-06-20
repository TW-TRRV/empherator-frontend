<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

/**
 * Controlador de Administración de Productos
 *
 * Gestiona el listado, creación, actualización y eliminación de productos y sus variantes
 * desde el panel administrativo.
 */
class AdminProductController extends Controller
{
    /**
     * Muestra la lista de productos en el panel de administración.
     * Carga los productos junto con sus variantes.
     */
    public function index(Request $request)
    {
        $query = Product::with('product_variants');

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

    /**
     * Valida y guarda un nuevo producto en la base de datos, junto a sus variantes.
     *
     * @param Request $request La solicitud entrante con los datos del producto.
     */
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
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required|string|max:100',
            'variants.*.variant_name' => 'required|string|max:100',
            'variants.*.price_override' => 'nullable|numeric',
            'variants.*.stock_quantity' => 'required|integer',
            'variants.*.primary_image' => 'required|string',
            'variants.*.gallery_images' => 'nullable|array|max:4',
            'variants.*.gallery_images.*' => 'nullable|string',
        ]);

        $defaultImages = [
            'primary' => $validated['primary_image'],
            'gallery' => $validated['gallery_images'] ?? []
        ];

        $product = Product::create([
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

        if (!empty($validated['variants'])) {
            foreach ($validated['variants'] as $variantData) {
                $variantImages = [
                    'primary' => $variantData['primary_image'],
                    'gallery' => $variantData['gallery_images'] ?? []
                ];

                $product->product_variants()->create([
                    'sku' => $variantData['sku'],
                    'variant_name' => $variantData['variant_name'],
                    'price_override' => $variantData['price_override'] ?? null,
                    'stock_quantity' => $variantData['stock_quantity'],
                    'images' => json_encode($variantImages)
                ]);
            }
        }

        return redirect('/admin/products')->with('success', 'Product created successfully.');
    }

    /**
     * Valida y actualiza los detalles de un producto existente y sus variantes.
     * También sincroniza las variantes (actualiza, crea o elimina según sea necesario).
     *
     * @param Request $request La solicitud con los datos actualizados.
     * @param int $id El ID del producto a actualizar.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:50',
            'subcategory' => 'required|string|max:50',
            'name' => 'required|string|max:100|unique:product,name,' . $id,
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
            'gallery_images.*' => 'nullable|string',
            'is_featured' => 'required|boolean',
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|integer',
            'variants.*.sku' => 'required|string|max:100',
            'variants.*.variant_name' => 'required|string|max:100',
            'variants.*.price_override' => 'nullable|numeric',
            'variants.*.stock_quantity' => 'required|integer',
            'variants.*.primary_image' => 'required|string',
            'variants.*.gallery_images' => 'nullable|array|max:4',
            'variants.*.gallery_images.*' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);

        $defaultImages = [
            'primary' => $validated['primary_image'],
            'gallery' => $validated['gallery_images'] ?? []
        ];

        $product->update([
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

        if (isset($validated['variants'])) {
            $existingVariantIds = [];
            foreach ($validated['variants'] as $variantData) {
                $variantImages = [
                    'primary' => $variantData['primary_image'],
                    'gallery' => $variantData['gallery_images'] ?? []
                ];

                $variantAttributes = [
                    'sku' => $variantData['sku'],
                    'variant_name' => $variantData['variant_name'],
                    'price_override' => $variantData['price_override'] ?? null,
                    'stock_quantity' => $variantData['stock_quantity'],
                    'images' => json_encode($variantImages)
                ];

                if (isset($variantData['id']) && $variantData['id']) {
                    $product->product_variants()->where('id', $variantData['id'])->update($variantAttributes);
                    $existingVariantIds[] = $variantData['id'];
                } else {
                    $newVariant = $product->product_variants()->create($variantAttributes);
                    $existingVariantIds[] = $newVariant->id;
                }
            }
            $product->product_variants()->whereNotIn('id', $existingVariantIds)->delete();
        } else {
            $product->product_variants()->delete();
        }

        return redirect('/admin/products')->with('success', 'Product updated successfully.');
    }

    /**
     * Elimina el producto especificado de la base de datos.
     *
     * @param int $id El ID del producto a eliminar.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect('/admin/products')->with('success', 'Product deleted successfully.');
    }
}
