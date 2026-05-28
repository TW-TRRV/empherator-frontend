import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { Link } from '@inertiajs/react';

export const Footer = () => {
  return (
    <footer className="w-full bg-obscure-darker px-4 md:px-20 lg:px-40 xl:px-82.5 border-t border-obscure-lightest">
      <div className="w-full flex flex-col lg:flex-row py-16 lg:pt-31.25 lg:pb-16 gap-12 lg:gap-0">
        <div className="flex-2 flex flex-col">
          <p className="text-2xl text-clarity-lighter font-bold">EMPHERATOR</p>
          <p className="text-base text-clarity my-6 lg:my-12.5 max-w-sm">
            Building the tools for the next generation of performance athletes and digital architects. High-performance, zero compromise.
          </p>
          <div className="text-clarity-light flex text-2xl gap-5">
            <SiInstagram className="hover:text-emph-lighter transition-all duration-300 cursor-pointer" />
            <SiTiktok className="hover:text-emph-lighter transition-all duration-300 cursor-pointer" />
            <SiWhatsapp className="hover:text-emph-lighter transition-all duration-300 cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-clarity-lighter mb-4 lg:mb-8 text-xl">SUPPORT</p>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            TECH SUPPORT
          </Link>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            DRIVERS & DOWNLOADS
          </Link>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            WARRANTY
          </Link>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-clarity-lighter mb-4 lg:mb-8 text-xl">COMPANY</p>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            CONTACT
          </Link>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            SYSTEMS
          </Link>
          <Link href="/" className="text-clarity my-1.5 lg:my-2.5 text-base hover:text-emph-lighter transition-all duration-300">
            GLOBAL SHIPPING
          </Link>
        </div>
      </div>
      <div className="w-full py-8 border-t border-obscure-lightest text-xs flex flex-col justify-center items-center gap-3 text-center">
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
