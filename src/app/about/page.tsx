import React from 'react';
import { getMetadata } from '@/lib/seo';
import { ShieldCheck, Cpu, Leaf } from 'lucide-react';

export const metadata = getMetadata({
  title: 'Atelier Philosophy & History | Vellora',
  description: 'Learn about the philosophy, history, and craft behind Vellora luxury digital showroom.',
  path: '/about',
});

const timeline = [
  {
    year: '2022',
    title: 'Brand Foundation',
    desc: 'Vellora is founded in Milan by a collective of traditional tailors and digital interaction designers, aiming to merge material luxury with high-end digital design.',
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
    desc: 'We simulate structural weights and drapes using computer-aided geometry, minimizing physical prototype waistage and maximizing fit accuracy.',
  },
  {
    icon: Leaf,
    title: 'Responsible Sourcing',
    desc: '100% of our merino wool is sourced from certified eco-responsible herds in Biella, and our packaging is entirely biodegradable and organic.',
  },
];

export default function AboutPage() {
  return (
    <div className="container-vellora py-12 space-y-24">
      
      {/* Intro Editorial Block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="label-text text-accent">Our Philosophy</span>
          <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase leading-tight">
            Where Fabric Meets Digital Precision
          </h1>
          <p className="body-text text-sm text-foreground-secondary leading-relaxed">
            Vellora represents a shift in modern clothing fabrication. We believe that true luxury is defined by the depth of consideration behind each piece: the quality of the thread, the ethics of the herd, and the precision of the fit.
          </p>
          <p className="body-text text-sm text-foreground-secondary leading-relaxed">
            By constructing digital wireframes of our silhouettes before tailoring, we understand the physics of drape and fit with mathematical exactness. This minimizes production waste and creates a highly optimized structural design.
          </p>
        </div>

        {/* High-end campaign image block */}
        <div className="aspect-editorial bg-zinc-100 border border-border overflow-hidden group relative">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
            alt="Vellora Atelier Studio"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Core Values Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="label-text text-accent">Core Pillars</span>
          <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase">
            Our Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="border border-border p-8 bg-background-tertiary text-center space-y-4 rounded">
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto text-accent">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="ui-text text-xs font-semibold">{val.title}</h3>
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
          <span className="label-text text-accent">The Journey</span>
          <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase">
            Milestones
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative border-l border-border pl-6 space-y-10 py-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative space-y-2 group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-background border-2 border-accent rounded-full group-hover:bg-accent transition-colors" />
              
              <span className="font-mono text-sm font-bold text-accent">{item.year}</span>
              <h3 className="ui-text text-xs font-semibold">{item.title}</h3>
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
