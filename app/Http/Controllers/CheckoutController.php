<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * Controlador de Checkout
 *
 * Procesa la compra de artículos del carrito.
 */
class CheckoutController extends Controller
{
    /**
     * Procesa la compra.
     * Recibe los items del carrito, valida el stock y crea la orden.
     */
    public function process(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.variantId' => 'nullable|integer',
            'items.*.productId' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $items = $validated['items'];
        $totalAmount = 0;
        $orderItemsData = [];

        try {
            DB::beginTransaction();

            foreach ($items as $item) {
                // Determine the variant to use
                $variantQuery = ProductVariant::with('product')->lockForUpdate();

                if (isset($item['variantId']) && $item['variantId']) {
                    $variant = $variantQuery->where('id', $item['variantId'])->first();
                } else {
                    // Fallback to the first variant of the product if no variant is specified
                    $variant = $variantQuery->where('product_id', $item['productId'])->first();
                }

                if (!$variant) {
                    throw new \Exception("La variante del producto no fue encontrada.");
                }

                if ($variant->stock_quantity < $item['quantity']) {
                    $productName = $variant->product ? $variant->product->name : 'Desconocido';
                    $variantName = $variant->variant_name ? " [{$variant->variant_name}]" : "";
                    throw new \Exception("Stock insuficiente para el producto: {$productName}{$variantName}");
                }

                // Decrement stock
                $variant->decrement('stock_quantity', $item['quantity']);

                // Calculate price securely from database
                $price = $variant->price_override ?? ($variant->product ? $variant->product->base_price : 0);

                $totalAmount += $price * $item['quantity'];

                $orderItemsData[] = [
                    'variant_id' => $variant->id,
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $price
                ];
            }

            // Apply 8% tax as defined in Cart.tsx
            $tax = $totalAmount * 0.08;
            $finalTotal = $totalAmount + $tax;

            // Create Order
            $order = Order::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'guest_email' => Auth::check() ? Auth::user()->email : null,
                'total_amount' => $finalTotal,
                'status' => 'COMPLETED'
            ]);

            // Create Order Items
            foreach ($orderItemsData as $orderItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'variant_id' => $orderItem['variant_id'],
                    'quantity' => $orderItem['quantity'],
                    'price_at_purchase' => $orderItem['price_at_purchase']
                ]);
            }

            DB::commit();

            return redirect('/checkout-success');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error processing checkout: ' . $e->getMessage());

            return back()->withErrors(['checkout' => $e->getMessage()]);
        }
    }
}
