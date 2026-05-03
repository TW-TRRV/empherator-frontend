import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full h-147.5 bg-obscure-darker px-82.5 border-t border-obscure-lightest">
      <div className="w-full h-115 flex pt-31.25">
        <div className="flex-2 flex flex-col ">
          <p className="text-2xl text-clarity-lighter font-bold">EMPHERATOR</p>
          <p className="text-base text-clarity my-12.5">
            Building the tools for the next generation of
            <br />
            performance athletes and digital architects. High-
            <br />
            performance, zero compromise.
          </p>
          <div className="text-clarity-light flex text-2xl gap-5">
            <SiInstagram className="hover:text-emph-lighter transition-all duration-300" />
            <SiTiktok className="hover:text-emph-lighter transition-all duration-300" />
            <SiWhatsapp className="hover:text-emph-lighter transition-all duration-300" />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-clarity-lighter mb-8 text-xl">SUPPORT</p>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            TECH SUPPORT
          </Link>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            DRIVERS & DOWNLOADS
          </Link>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            WARRANTY
          </Link>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-clarity-lighter mb-8 text-xl">COMPANY</p>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            CONTACT
          </Link>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            SYSTEMS
          </Link>
          <Link to="/" className="text-clarity my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            GLOBAL SHIPPING
          </Link>
        </div>
      </div>
      <div className="w-full h-32.25 border-t border-obscure-lightest text-xs flex flex-col justify-center items-center gap-3">
        <p className="text-clarity-darker">
          Grupo N# Tecnologias Web UNT 2026-1
        </p>
        <p className="text-obscure-lightest">
         Gerardo Venegas | Cesar Ruiz | Kerry Rivera | Eduardo Torres
        </p>
      </div>
    </footer>
  );
};

export default Footer;
