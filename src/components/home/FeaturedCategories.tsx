'use client';

import Link from 'next/link';

const categories = [
  {
    title: 'Menswear',
    subtitle: 'Modern tailoring & timeless essentials',
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1400&auto=format&fit=crop',
    link: '/collections/menswear',
  },
  {
    title: 'Womenswear',
    subtitle: 'Elegant silhouettes for every season',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
    link: '/collections/womenswear',
  },
  {
    title: 'Accessories',
    subtitle: 'Luxury details that complete every look',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1400&auto=format&fit=crop',
    link: '/collections/accessories',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-[#f8f7f4] py-20 lg:py-32">
      <div className="container-JCOPS">

        {/* Heading */}
        <div className="mb-16 text-center">

          <p className="text-xs uppercase tracking-[8px] text-neutral-500">
            Curated Collections
          </p>

          <h2 className="mt-5 text-4xl md:text-6xl font-light uppercase tracking-[6px] text-[#111]">
            Shop By Category
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-[#C9A96E]" />

          <p className="mx-auto mt-8 max-w-2xl text-neutral-600 leading-8">
            Discover refined collections crafted with premium fabrics,
            timeless silhouettes and effortless elegance.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-3">

          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative overflow-hidden bg-black aspect-[4/5]"
            >

              {/* Image */}

              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-linear group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-all duration-700 group-hover:from-black/90" />

              {/* Border */}

              <div className="absolute inset-5 border border-white/20 transition-all duration-500 group-hover:border-[#C9A96E]/50" />

              {/* Content */}

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">

                <p className="mb-3 text-xs uppercase tracking-[5px] text-white/70">
                  Premium Collection
                </p>

                <h3 className="text-3xl font-light uppercase tracking-[3px] text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/75">
                  {item.subtitle}
                </p>

                <div className="mt-8 flex items-center gap-3 text-white group-hover:text-[#C9A96E] transition-colors duration-300">

                  <span className="text-xs uppercase tracking-[4px] text-inherit">
                    Explore
                  </span>

                  <span className="transition-transform duration-500 group-hover:translate-x-2 text-inherit">
                    →
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}