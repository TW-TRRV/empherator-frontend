import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaGoogle, FaMicrosoft, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-obscure-darker font-sans text-clarity-lighter">
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative w-full h-full my-32">
        {/* Background Image Container */}
        {/* Replace this div with your actual background image and gradients */}
        <div className="absolute inset-0 -z-10 bg-obscure-darker">
          {/* Example background format (currently commented out functionality for background image): */}
          {/* <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(path_to_image)` }}></div> */}
        </div>

        {/* Login Card */}
        <div className="w-[380px] bg-obscure-lighter border border-obscure-lightest p-10 flex flex-col items-center">
          <div className="w-full text-left mb-8">
            <h1 className="text-xl font-bold tracking-widest text-clarity-lighter mb-1">SYSTEM ACCESS</h1>
            <p className="text-[10px] text-clarity font-bold uppercase tracking-widest">NEW ERA OPERATIONAL INTERFACE</p>
          </div>

          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-5">
              <label className="block text-[10px] font-bold text-clarity mb-2 uppercase tracking-widest">OPERATOR ID</label>
              <input
                type="text"
                placeholder="OP-XXXX-X"
                className="w-full h-12 bg-obscure border border-obscure-lightest px-4 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light transition-colors"
              />
            </div>

            <div className="mb-8">
              <label className="block text-[10px] font-bold text-clarity mb-2 uppercase tracking-widest">PASSWORD</label>
              <input
                type="password"
                placeholder="********"
                className="w-full h-12 bg-obscure border border-obscure-lightest px-4 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-emph-lighter hover:bg-emph-light text-obscure-darker font-bold text-sm tracking-wider transition-colors duration-300"
            >
              LOG IN
            </button>
          </form>

          <div className="w-full my-8 flex items-center justify-center">
            <div className="h-px bg-obscure-lightest flex-1"></div>
            <span className="px-4 text-[9px] text-clarity uppercase tracking-widest">EXTERNAL ACCESS</span>
            <div className="h-px bg-obscure-lightest flex-1"></div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <button className="w-10 h-10 border border-obscure-lightest flex items-center justify-center text-clarity-light hover:text-clarity-lighter hover:border-clarity-lighter transition-all duration-300">
              <FaGoogle className="text-sm" />
            </button>
            <button className="w-10 h-10 border border-obscure-lightest flex items-center justify-center text-clarity-light hover:text-clarity-lighter hover:border-clarity-lighter transition-all duration-300">
              <FaMicrosoft className="text-sm" />
            </button>
            <button className="w-10 h-10 border border-obscure-lightest flex items-center justify-center text-clarity-light hover:text-clarity-lighter hover:border-clarity-lighter transition-all duration-300">
              <FaFacebookF className="text-sm" />
            </button>
          </div>

          <Link to="/" className="text-[9px] text-clarity-light hover:text-clarity-lighter uppercase tracking-widest border-b border-transparent hover:border-clarity-lighter transition-all duration-300">
            SYSTEM LOCKED? REQUEST RESET
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
