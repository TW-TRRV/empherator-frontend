import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Icon from "@/Assets/home-hero.png";
import { Link } from '@inertiajs/react';
import Categories from "@/Components/Categories";
import FeaturedProducts from "@/Components/FeaturedProducts";
import Newsletter from "@/Components/Newsletter";

const Hero = () => {
  const gradient =
    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)";

  return (
    <section id="hero">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center grayscale"
        style={{ backgroundImage: `${gradient}, url(${Icon})` }}
      ></div>
      <div className="h-200 w-full  bg-cover bg-center bg-no-repeat flex flex-col justify-center">
        <div className="mx-4 md:mx-20">
          <p className="text-emph-light text-sm font-bold my-5">EST. 2024</p>
          <p className="text-clarity-lighter text-4xl md:text-6xl font-bold my-5">THE NEW ERA</p>
          <p className="text-clarity-light my-5">
            Engineered for those who demand absolute precision. Experience{" "}
            <br />
            zero-latency execution with the Empherator X-Series peripherals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 my-7">

            <Link href="/" className="w-full md:w-56.25 h-12.5 bg-emph hover:bg-emph-light text-center flex font-bold items-center justify-center transition-all duration-300">
              EXPLORE HARDWARE
            </Link>
            <Link href="/" className="w-full md:w-56.25 h-12.5 border text-clarity-light hover:text-clarity-lighter hover:border-clarity-lighter font-bold border-clarity-light flex items-center justify-center transition-all duration-300">
              VIEW SYSTEMS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  base_price: number;
  default_images: string;
  is_featured: boolean;
}

interface HomeProps {
  featuredProducts: Product[];
}

export const Home = ({ featuredProducts }: HomeProps) => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts products={featuredProducts} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
