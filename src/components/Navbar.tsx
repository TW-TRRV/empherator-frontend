import { MdMenu, MdOutlineSearch, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

interface NavLinkProps {
  text: string;
  hrf: string;
}

const NavLink = ({ text, hrf }: NavLinkProps) => {
  return (
    <div className="mx-7.5 text-sm font-bold text-clarity-light hover:text-emph-light hover:underline transition-all duration-300">
      <Link to={hrf}>{text}</Link>
    </div>
  );
};


export const Navbar = () => {
  return (
    <div>
      <nav className="fixed z-50 top-0 bg-obscure-darker border-b border-obscure-lightest h-20 w-full px-20">
        <div className="flex w-full h-full items-center">
          <div className="flex-1 text-2xl flex">
            <MdMenu className="text-emph text-3xl" />
            <Link to="/" className="text-clarity-lighter ml-3 font-black">
              EMPHERATOR
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <NavLink text="HOME" hrf="/"></NavLink>
            <NavLink text="HARDWARE" hrf="/"></NavLink>
            <NavLink text="LOGIN" hrf="/"></NavLink>
          </div>
          <div className="flex-1 flex justify-end items-end text-3xl text-clarity-light gap-4">
            <MdOutlineSearch className="hover:text-emph-light transition-all duration-300" />
            <MdOutlineShoppingCart className="hover:text-emph-light transition-all duration-300" />
          </div>
        </div>
      </nav>
      <div className="w-full h-20"></div>
    </div>
  );
};

export default Navbar;
