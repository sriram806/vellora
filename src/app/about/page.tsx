import React from 'react';
import { getMetadata } from '@/lib/seo';
import { ShieldCheck, Cpu, Leaf, Compass, ArrowUpRight } from 'lucide-react';

export const metadata = getMetadata({
  title: 'Atelier Philosophy & History | Vellora',
  description: 'Learn about the philosophy, history, and craft behind Vellora luxury digital showroom.',
  path: '/about',
});

const timeline = [
  {
    year: '2022',
    title: 'Brand Foundation in Milan',
    desc: 'Vellora is founded by a collective of traditional tailors and digital interaction designers, aiming to merge material luxury with high-end digital design.',
  },
  {
    year: '2023',
    title: 'First Digital Sim Launch',
    desc: 'We introduce programmatic fabric simulation, modeling draping coordinates and density weights on complex physical solvers before any fabric is cut.',
  },
  {
    year: '2024',
    title: 'Faubourg Saint-Honoré Paris Showroom',
    desc: 'Vellora opens its first physical invitation-only digital showroom in Paris, combining real fabric swatches with holographic screens.',
  },
  {
    year: '2025',
    title: 'WebGL Showroom Release',
    desc: 'Launch of the online Vellora WebGL interactive showroom, allowing global clients to explore fabric structures in 360° point-clouds.',
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Artisanal Precision',
    desc: 'Each garment is hand-assembled in historic ateliers across Lombardy and Paris, maintaining standard stitching quality and double seams.',
  },
  {
    icon: Cpu,
    title: 'Digital Simulation',
    desc: 'We simulate structural weights and drapes using computer-aided geometry, minimizing physical prototype waste and maximizing fit accuracy.',
  },
  {
    icon: Leaf,
    title: 'Responsible Sourcing',
    desc: '100% of our merino wool is sourced from certified eco-responsible herds in Biella, and our packaging is entirely biodegradable and organic.',
  },
];

const stats = [
  { value: '98%', label: 'Organic Materials', desc: 'Certified mulberry silk and bio-cotton fibers.' },
  { value: '240K+', label: 'Sim Solver Nodes', desc: 'Precision coordinate mapping per silhouette drape.' },
  { value: '4', label: 'Global Showrooms', desc: 'Paris, Milan, Tokyo, and New York ateliers.' },
  { value: '100%', label: 'Insured Global Dispatch', desc: 'Secure DHL Express carbon-neutral delivery.' }
];

export default function AboutPage() {
  return (
    <div className="container-vellora py-12 space-y-24">
      
      {/* Intro Editorial Block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Our Philosophy</span>
          <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase leading-tight text-foreground">
            Where Fabric Meets Digital Precision
          </h1>
          <p className="body-text text-xs sm:text-sm text-foreground-secondary leading-relaxed">
            Vellora represents a structural shift in modern clothing fabrication. We believe that true luxury is defined by the depth of consideration behind each piece: the quality of the thread, the ethics of the herd, and the precision of the fit.
          </p>
          <p className="body-text text-xs sm:text-sm text-foreground-secondary leading-relaxed">
            By constructing digital wireframes of our silhouettes before tailoring, we understand the physics of drape and fit with mathematical exactness. This minimizes production waste and creates a highly optimized structural design.
          </p>
          <div className="pt-2">
            <a 
              href="/shop" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-accent hover:text-accent-hover transition-colors font-mono"
            >
              <span>Explore The Atelier Shop</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* High-end campaign image block */}
        <div className="aspect-editorial bg-background-secondary border border-border overflow-hidden group relative rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          {/* Gold Inset Frame */}
          <div className="absolute inset-4 border border-accent/25 pointer-events-none z-10 transition-all duration-700 group-hover:inset-3 group-hover:border-accent/50" />
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
            alt="Vellora Atelier Studio"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-1" />
        </div>
      </div>

      {/* Editorial Brand Stats Section */}
      <section className="border-y border-border py-12 bg-background-secondary/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-2 text-center sm:text-left border-l border-accent/20 pl-6 first:border-l-0">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-accent tracking-tight">{st.value}</span>
              <h3 className="text-[10px] uppercase font-bold tracking-widest font-mono text-foreground">{st.label}</h3>
              <p className="text-[11px] text-foreground-muted leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Material Focus Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 aspect-square bg-background-secondary border border-border overflow-hidden group relative rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          <div className="absolute inset-4 border border-accent/20 pointer-events-none z-10 transition-all duration-700 group-hover:inset-3 group-hover:border-accent/40" />
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
            alt="Weaving loom at organic mills"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-1" />
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Fabric Origin</span>
          <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase text-foreground">
            Lombardy Mills & Okayama Selvedge
          </h2>
          <p className="body-text text-xs sm:text-sm text-foreground-secondary leading-relaxed">
            Our raw materials are gathered at source. Our luxury silks are woven in historic mills along the shores of Como, Italy, utilizing centuries-old techniques. Our heavy raw denims are sourced exclusively from artisan mills in Kojima, Okayama, dyed with natural indigo plants, and woven on traditional shuttle looms.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Traceable Supply</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">Every garment includes a secure ledger ID tracing fibers to their farm source.</p>
              </div>
            </div>
            <div className="flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Zero Waste Draft</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">Every pattern outline is digitally nested to utilize 100% of the fabric roll.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Core Pillars</span>
          <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase text-foreground">
            Our Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx} 
                className="group border border-border hover:border-accent/40 p-8 bg-background-tertiary text-center space-y-4 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(201,169,110,0.06)]"
              >
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto text-accent transition-transform duration-500 group-hover:rotate-12">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-accent">{val.title}</h3>
                <p className="body-text text-xs text-foreground-secondary leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vertical Interactive Timeline */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">The Journey</span>
          <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase text-foreground">
            Atelier Milestones
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative border-l border-border pl-8 space-y-10 py-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative space-y-2 group">
              {/* Timeline marker with custom pulses */}
              <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-background border-2 border-border group-hover:border-accent rounded-full flex items-center justify-center transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent transition-all duration-300" />
              </div>
              
              <span className="font-mono text-sm font-bold text-accent transition-all duration-300 group-hover:tracking-wider">{item.year}</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-accent">{item.title}</h3>
              <p className="body-text text-xs text-foreground-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
