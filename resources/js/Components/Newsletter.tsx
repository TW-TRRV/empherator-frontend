export const Newsletter = () => {
  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-20 text-clarity-lighter bg-obscure-dark overflow-hidden border-b border-obscure-light">
      {/* Background radial gradient to mimic the mockup's subtle lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emph-dark/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          JOIN THE NEW ERA OF <br className="hidden md:block" /> GAMING
        </h2>
        <p className="text-clarity-light mb-12 text-sm md:text-base">
          Receive exclusive access to hardware drops and technical performance reports.
        </p>

        <form className="w-full max-w-2xl flex items-center border-b border-obscure-lightest pb-2 focus-within:border-emph transition-colors">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-transparent border-none text-xs tracking-widest text-clarity-lighter placeholder-clarity-dark focus:outline-none focus:ring-0"
            required
          />
          <button
            type="submit"
            className="text-emph hover:text-emph-light text-xs font-bold tracking-widest transition-colors ml-4 uppercase whitespace-nowrap cursor-pointer"
          >
            SIGN UP NOW
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
