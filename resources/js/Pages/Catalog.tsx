import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from '@inertiajs/react';
import { MdFavoriteBorder } from "react-icons/md";
import { ListProductsShort } from "@/types";


export const Catalog = ({ products }: ListProductsShort) => {
  return (
    <div className="min-h-screen bg-obscure-darker font-sans text-clarity-lighter flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-4 md:px-8 lg:px-20 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              PERFORMANCE HARDWARE
            </h1>
            <p className="text-clarity-light text-sm md:text-base max-w-2xl">
              Engineered for the elite. Explore the latest in zero-latency
              peripherals and high-fidelity computing components.
            </p>
          </section>

          {/* Filters & Search Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <Link href="/" className="px-6 py-2 bg-clarity-lighter text-obscure-darker text-xs font-bold tracking-widest cursor-pointer flex items-center justify-center">
                ALL
              </Link>
              <Link href="/" className="px-6 py-2 border border-obscure-lightest text-clarity-lighter text-xs font-bold tracking-widest hover:border-clarity-dark transition-colors cursor-pointer flex items-center justify-center">
                KEYBOARDS
              </Link>
              <Link href="/" className="px-6 py-2 border border-obscure-lightest text-clarity-lighter text-xs font-bold tracking-widest hover:border-clarity-dark transition-colors cursor-pointer flex items-center justify-center">
                MICE
              </Link>
              <Link href="/" className="px-6 py-2 border border-obscure-lightest text-clarity-lighter text-xs font-bold tracking-widest hover:border-clarity-dark transition-colors cursor-pointer flex items-center justify-center">
                GPUS
              </Link>
            </div>

            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="SEARCH CATALOG"
                className="w-full md:w-64 bg-obscure-light border border-obscure-lightest px-4 py-2 text-xs tracking-widest text-clarity-lighter placeholder-clarity-dark focus:outline-none focus:border-emph transition-colors"
              />
            </div>
          </section>

          {/* Product Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-obscure-lightest flex flex-col h-full border border-obscure-lightest hover:border-obscure-light transition-colors"
              >
                {/* Product Image */}
                <div className="aspect-4/3 w-full bg-obscure-darker overflow-hidden p-6 flex items-center justify-center">
                  <img
                    src={JSON.parse(product.default_images).primary} 
                    alt={product.name}
                    className="object-cover max-h-full max-w-full drop-shadow-2xl"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-clarity-light text-[10px] font-bold tracking-widest mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight max-w-50">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-2xl md:text-3xl font-bold">
                      {product.base_price}
                    </span>
                  </div>

                  <div className="mt-auto flex gap-4">
                    <Link
                      href={"/product/"+String(product.id)}
                      className="flex-1 bg-emph hover:bg-emph-light text-clarity-lighter text-xs font-bold tracking-widest h-12 flex items-center justify-center transition-colors"
                    >
                      BUY NOW
                    </Link>
                    <button className="w-12 h-12 border border-obscure-light flex items-center justify-center text-clarity-lighter hover:text-emph hover:border-emph transition-colors cursor-pointer">
                      <MdFavoriteBorder className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
