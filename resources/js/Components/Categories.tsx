import { Link } from '@inertiajs/react';

const categories = [
  { id: 1, name: "MOUSE", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1Fz6A54OcoqYIa5KfRls6Hvu4Kux5vpqlA&s" },
  { id: 2, name: "KEYBOARDS", image: "https://images.prismic.io/frameworkmarketplace/aeepQ8BOoF08xL4K_Framework-wireless-keyboard%3Dfront-pdp-1-.png?auto=format,compress" },
  { id: 3, name: "AUDIO", image: "https://images.squarespace-cdn.com/content/v1/5a6a2d73bff200e7e9dde1f9/27f777e1-244d-409b-98c2-1f6ea77119a1/Kali-Audio-LonePine-V2-SecondWave-Studio-Monitors-Family.jpeg" },
];

/**
 * Componente Categories (Categorías)
 *
 * Muestra accesos directos visuales a las categorías principales de la tienda
 * utilizando imágenes y redireccionando al usuario al catálogo filtrado.
 */
export const Categories = () => {
  return (
    <section className="bg-obscure-darker py-16 px-4 md:px-8 lg:px-20 text-clarity-lighter">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-obscure-lightest pb-4">
          <h2 className="text-3xl font-bold tracking-tight border-b-2 border-emph pb-2 -mb-[18px]">
            CATEGORIES
          </h2>
          <Link
            href="/catalog"
            className="text-clarity-light hover:text-clarity-lighter text-xs font-bold tracking-widest transition-colors flex items-center"
          >
            VIEW ALL COLLECTIONS <span className="ml-2">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.name}`}
              className="relative aspect-[4/5] bg-obscure-lightest overflow-hidden group flex items-end p-6 border border-obscure-lightest hover:border-obscure-light transition-colors"
            >
              <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h3 className="relative z-10 text-xl font-bold tracking-wide uppercase">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
