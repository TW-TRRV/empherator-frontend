import { Link } from '@inertiajs/react';

const categories = [
  { id: 1, name: "MOUSE", image: "https://placehold.co/600x400?text=Placeholder" },
  { id: 2, name: "KEYBOARDS", image: "https://placehold.co/600x400?text=Placeholder" },
  { id: 3, name: "AUDIO", image: "https://placehold.co/600x400?text=Placeholder" },
  { id: 4, name: "COMPONENTS", image: "https://placehold.co/600x400?text=Placeholder" },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="/catalog"
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
