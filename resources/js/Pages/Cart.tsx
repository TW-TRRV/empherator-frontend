import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link, router, usePage } from '@inertiajs/react';
import { MdClose } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";

// Mock Product Interface
interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  variantName?: string | null;
  specs: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export const Cart = ({ productPrices, variantPrices }: { productPrices?: Record<string, number>, variantPrices?: Record<string, number> }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { errors } = usePage().props as { errors: Record<string, string> };
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load from local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);

      // Update prices from the server if available
      const updatedCart = parsedCart.map(item => {
        if (item.variantId && variantPrices && variantPrices[item.variantId] !== undefined && variantPrices[item.variantId] !== null) {
            return { ...item, price: variantPrices[item.variantId] };
        }
        // Fallback or if it's a main product id
        const priceLookupId = item.productId || item.id;
        if (productPrices && productPrices[priceLookupId] !== undefined && productPrices[priceLookupId] !== null) {
          return { ...item, price: productPrices[priceLookupId] };
        }
        return item;
      });

      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [productPrices, variantPrices]);

  /**
   * Actualiza la cantidad de un ítem en específico del carrito.
   */
  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /**
   * Elimina un ítem del carrito basado en su identificador único.
   */
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax mock
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    const itemsPayload = cartItems.map(item => ({
        variantId: item.variantId ? parseInt(item.variantId) : null,
        productId: item.productId ? parseInt(item.productId) : parseInt(item.id),
        quantity: item.quantity
    }));

    router.post('/checkout', { items: itemsPayload }, {
        onSuccess: () => {
            setCartItems([]);
            localStorage.removeItem("cart");
            setIsProcessing(false);
        },
        onError: () => {
            setIsProcessing(false);
        }
    });
  };

  return (
    <div className="bg-obscure-darker min-h-screen font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 py-16">
        <h1 className="text-4xl font-bold text-clarity-lighter mb-2">YOUR ARSENAL</h1>
        <div className="w-16 h-1 bg-emph mb-12"></div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Products List Container - RTL for left scrollbar */}
          <div className="grow w-full lg:w-2/3" style={{ direction: "rtl" }}>
            <div className="max-h-125 overflow-y-auto custom-scrollbar pl-4 pr-0">
              <div className="flex flex-col gap-6" style={{ direction: "ltr" }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-obscure-lighter border border-obscure-light p-6 flex flex-col md:flex-row gap-6 relative">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 text-clarity-light hover:text-clarity-lighter transition-colors"
                    >
                      <MdClose size={20} />
                    </button>

                    {/* Mock Image Placeholder */}
                    <div className="w-32 h-32 bg-obscure-lightest shrink-0 flex items-center justify-center">
                      <span className="text-clarity text-sm">Image</span>
                    </div>

                    <div className="flex flex-col justify-between grow">
                      <div>
                        <h3 className="text-xl font-bold text-clarity-lighter mb-1">
                            {item.name}
                            {item.variantName && <span className="text-emph-light text-sm ml-2">[{item.variantName}]</span>}
                        </h3>
                        <p className="text-xs text-clarity-light mb-4">{item.specs}</p>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-obscure-light bg-obscure rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 text-clarity-light hover:text-clarity-lighter"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-clarity-lighter text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 text-clarity-light hover:text-clarity-lighter"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                           <p className="text-xs text-clarity-light mb-1">PRICE</p>
                           <p className="text-xl font-bold text-emph-light">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-obscure-lighter border border-obscure-light p-8">
              <h2 className="text-xl font-bold text-clarity-lighter mb-8">ORDER<br/>SUMMARY</h2>

              <div className="space-y-4 text-sm mb-8 border-b border-obscure-light pb-6">
                <div className="flex justify-between">
                  <span className="text-clarity-light">SUBTOTAL</span>
                  <span className="text-clarity-lighter font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-clarity-light">SHIPPING</span>
                  <span className="text-emph-light font-mono text-right max-w-37.5">CALCULATED AT NEXT STEP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-clarity-light">ESTIMATED TAX</span>
                  <span className="text-clarity-lighter font-mono">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-clarity-light text-sm">TOTAL</span>
                <span className="text-3xl font-bold text-clarity-lighter">${total.toFixed(2)}</span>
              </div>

              {errors.checkout && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm">
                      {errors.checkout}
                  </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-emph-light hover:bg-emph text-obscure-darker font-bold py-3 mb-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isProcessing ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
              </button>

              <Link href="/">
                <button className="w-full border border-obscure-light text-clarity-lighter hover:bg-obscure-light font-bold py-3 mb-6 transition-colors">
                  CONTINUE SHOPPING
                </button>
              </Link>

              <div className="flex items-center justify-center text-xs text-clarity-light gap-2">
                <HiOutlineLockClosed />
                <span>ENCRYPTED CHECKOUT PROCESSING</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
