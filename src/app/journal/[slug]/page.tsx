'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Clock, Share2, Quote } from 'lucide-react';
import { journalPosts } from '../page';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Detailed content structures for dynamic article contents
const articleDetails: Record<
  string,
  {
    quote: string;
    subheadings: string[];
    paragraphs: string[][];
  }
> = {
  'crafting-timeless-luxury': {
    quote: 'Garments are not merely covering; they are silent architectures defined by structural alignment and pure material integrity.',
    subheadings: [
      'The Sourcing of Organic Mongolian Cashmere',
      'The Biella Weaving Atelier Heritage',
      'Seamless Contours and Unstructured Drape',
    ],
    paragraphs: [
      [
        'At the core of JCOPS lies a commitment to finding the most refined fibers on earth. Our journey begins in the high steppes of Inner Mongolia, where extreme temperatures yield cashmere fibers of exceptional length and softness. We source exclusively during the spring molting season, working directly with local pastoralist collectives who have practiced ethical combing for generations.',
        'Each harvest is hand-sorted and tested for micron size, retaining only fibers below 15 microns. This level of selectivity ensures that when the cashmere is spun, it achieves maximum loft and strength without relying on chemical softeners, allowing the natural resilience and thermal-regulating properties of the wool to shine.',
      ],
      [
        'Once sourced, the raw fibers travel to the foothills of the Alps in Biella, Italy—a region renowned since the Renaissance for its pure glacier-fed rivers, which are uniquely suited for washing wool. There, our weavers blend the Mongolian cashmere with Grade-A mulberry silk in a 70/30 ratio.',
        'Using vintage low-tension looms, the silk-cashmere yarn is slowly woven into double-face cloths. This slow processing prevents stress on the fibers, keeping the drape fluid and the finish clean, creating a fabric that feels like a weightless second skin while retaining its shape through years of wear.',
      ],
      [
        'The final stage is pattern drafting. Our designers remove all unnecessary padding, interlining, and stiffness to create unstructured silhouettes. Shoulders fall naturally, armholes are raised for full range of movement, and seams are bonded or blind-stitched by hand.',
        'This combination of raw material purity and sartorial subtraction yields garments that look effortless yet remain sharp, embodying the quiet, unforced luxury that forms the cornerstone of the JCOPS design philosophy.',
      ],
    ],
  },
  'the-art-of-slow-fashion': {
    quote: 'In an era dominated by hyper-acceleration, selecting slow production is a deliberate act of quality reclamation.',
    subheadings: [
      'Micro-Production and Zero Inventory Waste',
      'The Human Suture: Generational Handcraft',
      'Biodegradable Linens and Circular Sourcing',
    ],
    paragraphs: [
      [
        'Modern fast retail operates on high volume and rapid turnover, a process that inherently compromises structural details and environmental health. JCOPS was founded on the opposite premise: slow fashion. We operate on a strict micro-production model, weaving and tailoring only a limited batch of each silhouette based on verified showroom demand.',
        'By avoiding overproduction, we eliminate inventory waste and allow our tailors the necessary time to focus on complex sewing details, such as bar-tacked pockets, french seams, and hand-rolled hems that are physically impossible to execute under high-speed manufacturing setups.',
      ],
      [
        'We believe that the hand of the maker is visible in the final garment. Our production takes place in small, family-owned workshops across Northern Italy and Japan, where tailoring is not just an industry but a heritage. These generational workshops employ veteran seamstresses and tailors who possess an intuitive understanding of grainlines and fabric drape.',
        'This human connection ensures that every lapel is rolled with the correct tension, every sleeve is set smoothly, and every garment undergoes individual inspection. The result is a wardrobe staple that behaves dynamically on the body and carries a structural resilience built to last decades.',
      ],
      [
        'Our dedication to slow practices extends beyond construction to packaging and life cycle. We avoid plastic entirely, wrapping our garments in custom reusable unbleached linen sleeves and shipping them in biodegradable, recycled-fiber cardboard boxes.',
        'We design each piece with circularity in mind, using single-fiber compositions (such as 100% organic cotton, 100% wool, or 100% silk) to ensure that when the garment eventually reaches the end of its life, it can be easily recycled back into raw yarn, closing the loop on luxury design.',
      ],
    ],
  },
  'okayama-selvedge-denim-mastery': {
    quote: 'Selvedge denim is a living archive—a fabric that slowly maps your movements and lifestyle into a canvas of custom indigo fades.',
    subheadings: [
      'The Low-Tension Toyoda Loom Legacy',
      'Natural Rope Dyeing and Indigo Depth',
      'The Pattern of Wear: Custom Contoured Fades',
    ],
    paragraphs: [
      [
        'The story of our denim begins in Kojima, a district in Okayama, Japan, which is widely considered the global birthplace of premium denim restoration. Our selvedge denim is woven on vintage Toyoda wooden shuttle looms from the mid-20th century. These machines run at a fraction of the speed of modern projectile looms, weaving the cotton yarn with a gentle, low-tension wobble.',
        'This slow process allows for slight, natural variations in the weave—known as slub and neps—giving the raw denim an organic, textured character that modern high-speed industrial mills cannot replicate.',
      ],
      [
        'Our yarns undergo a traditional rope-dyeing process, where they are repeatedly dipped in natural indigo dye and exposed to the air to oxidize. This process is repeated up to 30 times, creating a deep, saturated indigo crust on the outer layer while leaving the core of the yarn white.',
        'Because the core remains white, JCOPS raw denim fades beautifully over time. As the indigo rubs off with friction, the white core gradually emerges, creating high-contrast crease lines at the hips and knees that are entirely unique to the wearer.',
      ],
      [
        'We cut our raw denim in a clean, straight-leg profile that hangs with structured architectural weight. We avoid pre-washing and distressing, delivering the denim raw and rigid so it can stretch and mold to your specific frame.',
        'We recommend wearing the denim daily for six months before its first wash, allowing the fibers to break in naturally and record your life patterns into the fabric. Each pair becomes a personalized piece of wearable sculpture, documenting your journey in indigo.',
      ],
    ],
  },
};

export default function JournalPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const post = useMemo(() => {
    return journalPosts.find((p) => p.slug === slug);
  }, [slug]);

  const detail = useMemo(() => {
    return articleDetails[slug];
  }, [slug]);

  // Read next posts
  const readNextPosts = useMemo(() => {
    return journalPosts.filter((p) => p.slug !== slug).slice(0, 2);
  }, [slug]);

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-[#f8f7f4] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#8a8a8a]">
        Loading Article...
      </div>
    );
  }

  // Article not found fallback
  if (!post || !detail) {
    return (
      <div className="w-full min-h-screen bg-[#f8f7f4] flex flex-col items-center justify-center text-center px-6 py-24 space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider font-serif text-[#121212]">Article Not Found</h2>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-sm">The editorial story you are searching for is not currently in our archive.</p>
        <Link
          href="/journal"
          className="btn-outline px-8 py-3 text-xs tracking-widest"
        >
          Back To Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f7f4]">
      {/* Article Cover Header */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {/* Subtle glow backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,169,110,0.15),transparent_60%)] pointer-events-none" />
        </div>

        {/* Header Text Overlay */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 sm:pb-16 space-y-6">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] text-white/80 hover:text-white uppercase tracking-[0.2em] font-mono border border-white/20 bg-white/5 backdrop-blur-xs px-4 py-2 transition-all cursor-pointer"
          >
            <ChevronLeft size={12} className="text-[#C9A96E]" />
            <span>Back to Journal</span>
          </Link>

          <div className="space-y-3">
            <span className="text-[10px] text-[#C9A96E] font-mono uppercase tracking-[0.3em] font-bold block">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider font-serif leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Author / Date Info */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-[10px] text-white/70 font-mono border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <User size={12} className="text-[#C9A96E]" />
              Written by {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#C9A96E]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#C9A96E]" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main Reading Container */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-16">
        
        {/* Editorial Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Text */}
          <article className="lg:col-span-8 space-y-10 text-neutral-700 leading-relaxed font-light text-sm sm:text-base">
            
            {/* Introductory Paragraph with Drop Cap */}
            <p className="first-line:uppercase first-line:tracking-widest first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C9A96E] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {detail.paragraphs[0][0]}
            </p>
            <p>{detail.paragraphs[0][1]}</p>

            {/* Blockquote Segment */}
            <div className="border-l-2 border-[#C9A96E] pl-6 py-2 my-8 space-y-3 bg-[#C9A96E]/5 rounded-r-xs">
              <Quote className="w-6 h-6 text-[#C9A96E] transform rotate-180 opacity-60" />
              <p className="font-serif italic text-base sm:text-lg text-neutral-800 leading-relaxed">
                "{detail.quote}"
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#121212] font-serif border-b border-zinc-200 pb-2">
                {detail.subheadings[0]}
              </h2>
              <p>{detail.paragraphs[1][0]}</p>
              <p>{detail.paragraphs[1][1]}</p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#121212] font-serif border-b border-zinc-200 pb-2">
                {detail.subheadings[1]}
              </h2>
              <p>{detail.paragraphs[2][0]}</p>
              <p>{detail.paragraphs[2][1]}</p>
            </div>

          </article>

          {/* Sidebar Sourcing details */}
          <aside className="lg:col-span-4 border border-border p-6 bg-white space-y-6 sticky top-28 shadow-xs rounded-xs">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C9A96E] border-b border-border pb-2">
              Atelier Coordinates
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#8a8a8a] block uppercase text-[9px] tracking-wider font-mono">Workshop Sourcing</span>
                <span className="font-semibold text-neutral-800">Biella (Italy) / Kojima (Japan)</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#8a8a8a] block uppercase text-[9px] tracking-wider font-mono">Weave Technique</span>
                <span className="font-semibold text-neutral-800">Low-tension Loom shuttle</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#8a8a8a] block uppercase text-[9px] tracking-wider font-mono">Dye Composition</span>
                <span className="font-semibold text-neutral-800">100% natural plant Indigo extract</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#8a8a8a] block uppercase text-[9px] tracking-wider font-mono">Fiber Micron</span>
                <span className="font-semibold text-neutral-800">Under 15.0μ super-loft selection</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                }
              }}
              className="w-full flex items-center justify-center gap-2 border border-black hover:bg-black hover:text-white py-2.5 text-[10px] font-mono uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
            >
              <Share2 size={12} />
              Share Article
            </button>
          </aside>

        </div>

        <hr className="border-zinc-200" />

        {/* Read Next Section */}
        <div className="space-y-8 pt-4">
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-neutral-500 text-center sm:text-left">
            Continue Reading
          </h3>
          
          <div className="grid gap-8 sm:grid-cols-2">
            {readNextPosts.map((nextPost: any) => (
              <Link
                key={nextPost.slug}
                href={`/journal/${nextPost.slug}`}
                className="group flex gap-4 items-center border border-border p-4 bg-white hover:border-[#C9A96E] hover:shadow-md transition-all duration-300 rounded-xs"
              >
                <div className="h-16 w-20 overflow-hidden bg-zinc-100 rounded-xs shrink-0">
                  <img
                    src={nextPost.image}
                    alt={nextPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-mono text-[#C9A96E] uppercase tracking-widest block font-bold">{nextPost.category}</span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-neutral-800 truncate mt-1 group-hover:text-[#C9A96E] transition-colors uppercase">
                    {nextPost.title}
                  </h4>
                  <span className="text-[9px] text-[#8a8a8a] block font-mono mt-0.5">{nextPost.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
