import { useState, useEffect } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWideMenuOpen, setIsWideMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsWideMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {/* Spotlight Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-obscure-darker/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute -top-12 right-0 text-clarity-light hover:text-clarity-lighter text-3xl cursor-pointer transition-colors"
            >
              &times;
            </button>
            <div className="flex items-center bg-obscure border-b border-emph pb-2">
              <MdOutlineSearch className="text-3xl text-clarity-light mr-4" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full bg-transparent border-none outline-none text-2xl text-clarity-lighter placeholder-clarity"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      <nav className="fixed z-50 top-0 bg-obscure-darker border-b border-obscure-lightest h-20 w-full px-4 md:px-20">
        <div className="flex w-full h-full items-center justify-between md:justify-start relative">
          <div className="flex text-2xl items-center md:flex-1">
            <button
              className="hidden md:block text-emph text-3xl cursor-pointer"
              onClick={() => setIsWideMenuOpen(!isWideMenuOpen)}
            >
              <MdMenu />
            </button>
            <Link to="/" className="text-clarity-lighter md:ml-3 font-black">
              EMPHERATOR
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center items-center">
            <NavLink text="HOME" hrf="/"></NavLink>
            <NavLink text="HARDWARE" hrf="/"></NavLink>
            <NavLink text="LOGIN" hrf="/"></NavLink>
          </div>
          <div className="flex items-center text-3xl text-clarity-light gap-4 md:flex-1 md:justify-end">
            <button
              className="hover:text-emph-light transition-all duration-300 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <MdOutlineSearch />
            </button>
            <button className="hover:text-emph-light transition-all duration-300 cursor-pointer">
              <MdOutlineShoppingCart />
            </button>
            <button
              className="md:hidden text-emph text-3xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Wide Burger Menu (Explore with Search Filters) */}
      <div
        className={`hidden md:block fixed z-40 top-20 left-0 w-full bg-obscure-lighter border-b border-obscure-lightest transition-transform duration-300 transform ${
          isWideMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-20 py-8 text-clarity-lighter">
          <div className="flex justify-between items-center mb-6 border-b border-obscure-light pb-4">
            <h2 className="text-xl font-bold text-clarity-light">Explore Catalog</h2>
            <button
              onClick={() => setIsWideMenuOpen(false)}
              className="text-2xl text-clarity-light hover:text-clarity-lighter"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold text-clarity-light mb-4">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="hover:text-emph-light transition-colors">Processors</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">Graphics Cards</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">Motherboards</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">Memory</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-clarity-light mb-4">Brands</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="hover:text-emph-light transition-colors">Intel</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">AMD</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">NVIDIA</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">ASUS</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-clarity-light mb-4">Price Range</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="hover:text-emph-light transition-colors">Under $100</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">$100 - $300</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">$300 - $600</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">Over $600</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-clarity-light mb-4">Ratings</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="hover:text-emph-light transition-colors">4 Stars & Up</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">3 Stars & Up</Link></li>
                <li><Link to="#" className="hover:text-emph-light transition-colors">2 Stars & Up</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Burger Menu (Search Field Only) */}
      <div
        className={`md:hidden fixed z-40 top-20 left-0 w-full bg-obscure-lighter border-b border-obscure-lightest transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center bg-obscure border border-obscure-lightest rounded p-3">
            <MdOutlineSearch className="text-2xl text-clarity-light mr-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent border-none outline-none text-lg text-clarity-lighter placeholder-clarity"
            />
          </div>
          <div className="mt-6 flex flex-col space-y-4 items-center">
            <NavLink text="HOME" hrf="/"></NavLink>
            <NavLink text="HARDWARE" hrf="/"></NavLink>
            <NavLink text="LOGIN" hrf="/"></NavLink>
          </div>
        </div>
      </div>

      <div className="w-full h-20"></div>
    </div>
  );
};

export default Navbar;