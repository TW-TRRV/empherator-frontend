import { Link } from '@inertiajs/react';

const products = [
  { id: 1, name: "EMPH-1", category: "MOUSE", price: "$120", image: "https://placehold.co/600x400?text=Placeholder" },
  { id: 2, name: "X-PRO", category: "KEYBOARD", price: "$180", image: "https://placehold.co/600x400?text=Placeholder" },
  { id: 3, name: "Z-AUDIO", category: "HEADSET", price: "$200", image: "https://placehold.co/600x400?text=Placeholder" },
];

export const FeaturedProducts = () => {
  return (
    <section className="bg-obscure py-16 px-4 md:px-8 lg:px-20 text-clarity-lighter">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <p className="text-emph text-xs font-bold tracking-widest uppercase mb-2">
            FEATURED HARDWARE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            PRECISION TOOLS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-obscure-lightest flex flex-col h-full border border-obscure-lightest hover:border-obscure-light transition-colors"
            >
              {/* Product Image */}
              <Link href="/product/placeholder" className="aspect-[4/3] w-full bg-obscure-darker overflow-hidden p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover max-h-full max-w-full drop-shadow-2xl"
                />
              </Link>

              {/* Product Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-clarity-light text-[10px] font-bold tracking-widest mb-2">
                      {product.category}
                    </p>
                    <Link href="/product/placeholder">
                      <h3 className="text-xl md:text-2xl font-bold leading-tight hover:text-emph transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <span className="text-2xl font-bold">
                    {product.price}
                  </span>
                </div>

                <div className="mt-auto flex gap-4">
                  <Link
                    href="/product/placeholder"
                    className="flex-1 bg-emph hover:bg-emph-light text-clarity-lighter text-xs font-bold tracking-widest h-12 flex items-center justify-center transition-colors"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
