import { Link } from '@inertiajs/react';
import { MdArrowForward } from "react-icons/md";
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";

export const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Background Container - Leave functionality commented out for future background image */}
      {/* style={{ backgroundImage: "url('/path/to/image.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} */}
      <main className="flex-grow flex items-center justify-center p-4 py-20 bg-obscure-dark relative">
          {/* A mock background div to simulate the dark overlay/background of the image without the actual image */}
          <div className="absolute inset-0 z-0 bg-obscure-darker/50"></div>

          <div className="relative z-10 w-full max-w-md bg-obscure-lighter border border-obscure-lightest p-8 sm:p-12 text-clarity-lighter">
            <div className="text-center mb-10">
              <p className="text-xs font-bold text-emph-lighter tracking-widest mb-2 uppercase">Acceso Restringido</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 uppercase">Reclutamiento de Operador</h1>
              <p className="text-sm text-clarity-light">
                Ingrese sus credenciales para la sincronización con el sistema EMPHERATOR.
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-clarity-dark uppercase tracking-wide">Gamer Name</label>
                <input
                  type="text"
                  placeholder="CODEX_01"
                  className="w-full bg-clarity-lighter text-obscure-darker px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emph"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-clarity-dark uppercase tracking-wide">Location</label>
                <input
                  type="text"
                  placeholder="NEO-TOKYO SECTOR 7"
                  className="w-full bg-clarity-lighter text-obscure-darker px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emph"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-clarity-dark uppercase tracking-wide">Birthday</label>
                  <input
                    type="date"
                    className="w-full bg-clarity-lighter text-obscure-darker px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emph"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-clarity-dark uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    placeholder="OPERATOR@SYSTEM.COM"
                    className="w-full bg-clarity-lighter text-obscure-darker px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emph"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-clarity-dark uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-clarity-lighter text-obscure-darker px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emph"
                />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start justify-center mt-0.5">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-clarity-darker bg-obscure checked:bg-emph checked:border-emph transition-colors" />
                    <svg className="absolute w-3 h-3 text-clarity-lighter pointer-events-none opacity-0 peer-checked:opacity-100 top-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-xs text-clarity-dark font-medium leading-tight group-hover:text-clarity-light transition-colors uppercase">
                    Acepto los términos de servicio y protocolos de confidencialidad de datos.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start justify-center mt-0.5">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-clarity-darker bg-obscure checked:bg-emph checked:border-emph transition-colors" />
                    <svg className="absolute w-3 h-3 text-clarity-lighter pointer-events-none opacity-0 peer-checked:opacity-100 top-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-xs text-clarity-dark font-medium leading-tight group-hover:text-clarity-light transition-colors uppercase">
                    Recibir transmisiones tácticas y actualizaciones de hardware (Newsletter).
                  </span>
                </label>
              </div>

              <button
                type="button"
                className="w-full bg-emph-light hover:bg-emph text-clarity-lighter font-bold py-4 px-6 mt-6 flex justify-between items-center transition-colors cursor-pointer"
              >
                <span>INICIAR RECLUTAMIENTO</span>
                <MdArrowForward className="text-xl" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/login" className="text-xs font-bold text-clarity-dark hover:text-emph-lighter uppercase transition-colors">
                ¿Ya tienes una cuenta? Iniciar Sesión
              </Link>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;