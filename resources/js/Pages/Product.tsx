import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export const ERROR = "Product Not Found";

interface ProductProps {
  productId: string;
  // Nota: Más adelante, en lugar de solo el ID, podrías recibir todo el 
  // objeto del producto (name, price, description, etc.)
}


const Product = ({ productId }: ProductProps) => {

  // We'll use productId when API integration is ready
  console.log("Loading product ID:", productId);

  // Use placehold.co images based on the requirements
  const placeholderImageUrl = "https://placehold.co/600x400?text=Placeholder";

  return (
    <div className="bg-obscure-darker min-h-screen text-clarity-lighter font-sans">
      <Navbar />

      <main className="w-full">
        {/* Top Section - Product Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-16/10 bg-obscure-lightest rounded-lg overflow-hidden">
                <img
                  src={placeholderImageUrl}
                  alt="Main Product Placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-obscure-lightest rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                     <img
                        src={placeholderImageUrl}
                        alt={`Thumbnail ${i} Placeholder`}
                        className="w-full h-full object-cover"
                      />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="text-sm text-emph-light font-bold mb-2 uppercase tracking-wider">
                PLACEHOLDER SERIES / PERIPHERALS
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-clarity-lighter mb-6 tracking-tight uppercase">
                PLACEHOLDER
              </h1>
              <p className="text-clarity text-lg mb-10 leading-relaxed">
                PLACEHOLDER: Engineered for the absolute edge. Zero-latency mechanical switches encased in an aircraft-grade aluminum chassis. The new standard for competitive precision.
              </p>

              <div className="flex items-end justify-between border-b border-obscure-light pb-6 mb-8">
                <span className="text-sm text-clarity font-bold uppercase tracking-widest">PRICE</span>
                <span className="text-4xl font-black text-clarity-lighter">PLACEHOLDER</span>
              </div>

              <div className="mb-8">
                <div className="text-sm text-clarity font-bold uppercase tracking-widest mb-4">SWITCH TYPE</div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-emph-light bg-obscure-darker text-emph-light font-bold py-3 px-4 uppercase text-xs tracking-wider transition-colors">
                    PLACEHOLDER
                  </button>
                  <button className="border border-obscure-lightest bg-obscure-darker text-clarity font-bold py-3 px-4 uppercase text-xs tracking-wider hover:border-clarity transition-colors">
                    PLACEHOLDER
                  </button>
                </div>
              </div>

              <button className="w-full bg-emph hover:bg-emph-light text-clarity-lighter font-black py-4 px-8 text-sm uppercase tracking-widest transition-colors duration-300">
                ADD TO CART
              </button>

              <div className="mt-4 text-xs text-clarity text-center uppercase tracking-wider">
                PLACEHOLDER GLOBAL SHIPPING AVAILABLE. 2-YEAR LIMITED WARRANTY INCLUDED.
              </div>
            </div>
          </div>
        </section>

        {/* Middle Section - Technical Prowess */}
        <section className="bg-obscure-dark border-t border-obscure-lightest py-24">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-clarity-lighter uppercase tracking-tight mb-2">
                TECHNICAL PROWESS
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-emph to-transparent mb-16"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature 1 (Span 2 cols on lg) */}
                <div className="lg:col-span-2 bg-obscure p-8 border border-obscure-lightest flex flex-col justify-center min-h-50">
                   <div className="text-emph-light text-2xl mb-4">⚡</div>
                   <h3 className="text-xl font-bold text-clarity-lighter uppercase mb-2">PLACEHOLDER POLLING</h3>
                   <p className="text-clarity text-sm">PLACEHOLDER processing chip ensures every keystroke is registered before your brain even finishes the press.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-obscure p-8 border border-obscure-lightest flex flex-col justify-center min-h-50">
                   <div className="text-emph-light text-2xl mb-4">🦾</div>
                   <h3 className="text-sm font-bold text-clarity-lighter uppercase mb-2">PLACEHOLDER ALUMINUM</h3>
                   <p className="text-clarity text-xs">PLACEHOLDER frame for zero-flex durability.</p>
                </div>

                 {/* Feature 3 */}
                 <div className="bg-obscure p-8 border border-obscure-lightest flex flex-col justify-center min-h-50">
                   <div className="text-emph-light text-2xl mb-4">💡</div>
                   <h3 className="text-sm font-bold text-clarity-lighter uppercase mb-2">PLACEHOLDER RGB</h3>
                   <p className="text-clarity text-xs">PLACEHOLDER colors with hardware-level control.</p>
                </div>

                {/* Feature 4 (Meter) */}
                <div className="lg:col-span-2 bg-obscure p-8 border border-obscure-lightest flex flex-col justify-center min-h-50">
                   <div className="flex justify-between items-center mb-6">
                      <div className="text-emph-light text-2xl">📈</div>
                      <div className="text-right">
                         <div className="text-3xl font-black text-emph-light">PLACEHOLDER%</div>
                         <div className="text-[10px] text-clarity uppercase tracking-widest">INPUT ACCURACY</div>
                      </div>
                   </div>
                   <h3 className="text-lg font-bold text-clarity-lighter uppercase mb-4">PERFORMANCE METER</h3>
                   <div className="w-full h-1 bg-obscure-lightest rounded-full overflow-hidden">
                      <div className="h-full bg-emph-light w-[98%]"></div>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* Bottom Section - Field Reports */}
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                 <div>
                    <h2 className="text-3xl font-black text-clarity-lighter uppercase tracking-tight mb-2">
                      FIELD REPORTS
                    </h2>
                    <p className="text-clarity text-sm">Verified intelligence from the front lines.</p>
                 </div>
                 <div className="text-right">
                    <div className="text-emph-light text-xl mb-1 flex justify-end gap-1">
                      ★ ★ ★ ★ ★
                    </div>
                    <div className="text-xl font-bold text-clarity-lighter">PLACEHOLDER / 5.0</div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-obscure border border-obscure-lightest p-8">
                       <div className="flex justify-between items-start mb-6">
                          <div className="text-xs text-clarity uppercase tracking-wider">PLACEHOLDER / PRO USER</div>
                          <div className="text-[10px] font-bold text-emph-light uppercase tracking-widest bg-emph-light/10 px-2 py-1 rounded">VERIFIED</div>
                       </div>
                       <p className="text-clarity-lighter text-sm italic leading-relaxed mb-6">
                         "PLACEHOLDER review text. The latency difference is actually perceptible. Best typing experience of my career."
                       </p>
                       <div className="text-emph-light text-sm flex gap-1">
                         ★ ★ ★ ★ ★
                       </div>
                    </div>
                 ))}
               </div>

               <div className="flex justify-center">
                  <button className="border border-obscure-lightest hover:border-clarity text-clarity hover:text-clarity-lighter text-xs font-bold uppercase tracking-widest py-4 px-8 transition-colors">
                     READ ALL PLACEHOLDER REVIEWS
                  </button>
               </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Product;
