"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Gem, Scissors, Layers } from "lucide-react";

/* ========================================================================
   Animation Helpers
   ======================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
} satisfies Variants;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.15, ease: "easeOut" },
  }),
} satisfies Variants;

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ========================================================================
   Data
   ======================================================================== */

const pillars = [
  {
    icon: Scissors,
    title: "Craftsmanship",
    body: "Every stitch is placed with intention. Our artisans bring decades of mastery to each garment, turning raw fabric into wearable art.",
  },
  {
    icon: Gem,
    title: "Timeless Design",
    body: "We design beyond trends. Each piece is conceived to remain as compelling in ten years as it is today — enduring, never disposable.",
  },
  {
    icon: Layers,
    title: "Premium Materials",
    body: "Sourced from the finest mills across Italy, Japan, and Portugal — only fabrics worthy of the JCob's standard ever reach our atelier.",
  },
];

/* ========================================================================
   About Page
   ======================================================================== */

export default function AboutPage() {
  /* Parallax for the hero image */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111]">
      {/* ================================================================
          1. Hero — Full‑screen cinematic
          ================================================================ */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Background with parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2400&auto=format&fit=crop"
            alt="JCob's luxury fashion editorial"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-24 md:pb-32"
        >
          <motion.span
            variants={fadeIn}
            custom={0}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium mb-5"
          >
            Est. 2024
          </motion.span>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold uppercase text-white tracking-[0.08em] leading-[0.9]"
          >
            Our Story
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 text-sm sm:text-base text-white/60 uppercase tracking-[0.25em] max-w-md leading-relaxed"
          >
            Where heritage meets modern luxury
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeIn}
            custom={4}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          2. Editorial Story — Asymmetric split
          ================================================================ */}
      <Section className="py-28 md:py-44 bg-[#FAF8F5]">
        <div
          id="story"
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Image */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="lg:col-span-5 relative overflow-hidden aspect-[3/4]"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop"
              alt="JCob's fashion portrait"
              className="w-full h-full object-cover transition-transform duration-[8s] ease-linear hover:scale-105"
            />
            {/* Decorative border offset */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#C9A96E]/20 pointer-events-none" />
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="lg:col-span-6 lg:col-start-7 space-y-8"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E] font-bold">
              The Beginning
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-[0.04em] leading-[1.05] text-[#111]">
              Crafting
              <br />
              <span className="font-bold">Timeless</span>
              <br />
              Identity
            </h2>

            <div className="w-16 h-px bg-[#C9A96E]" />

            <p className="text-[#555] text-base sm:text-lg leading-[2] tracking-wide max-w-lg">
              JCob&apos;s was born from a singular belief: that clothing should
              speak louder than words. We create garments that exist at the
              intersection of heritage and innovation — pieces that become part
              of who you are, not just what you wear.
            </p>

            <blockquote className="border-l-2 border-[#C9A96E]/40 pl-6">
              <p className="text-lg sm:text-xl italic text-[#111] tracking-wide leading-relaxed font-light">
                &ldquo;True luxury is not in what you wear — it is in how
                wearing it makes you feel.&rdquo;
              </p>
              <cite className="block mt-3 text-[10px] not-italic uppercase tracking-[0.4em] text-[#C9A96E] font-bold">
                — The JCob&apos;s Atelier
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </Section>

      {/* ================================================================
          3. Philosophy — Three Pillars
          ================================================================ */}
      <Section className="py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20 md:mb-28">
            <motion.p
              variants={fadeIn}
              custom={0}
              className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E] font-bold mb-5"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-[0.06em] text-[#111]"
            >
              Built on <span className="font-bold">Principles</span>
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-px bg-[#e8e8e8]">
            {pillars.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white p-10 md:p-12 flex flex-col"
              >
                {/* Gold top-line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#C9A96E] group-hover:w-full transition-all duration-700" />

                <card.icon
                  className="w-7 h-7 text-[#C9A96E] mb-8 transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.2}
                />

                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#111] mb-4">
                  {card.title}
                </h3>

                <p className="text-sm text-[#666] leading-[1.9] tracking-wide flex-1">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
          4. Full‑bleed Campaign Image + Quote
          ================================================================ */}
      <Section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <motion.img
          variants={fadeIn}
          src="https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="JCob's campaign editorial"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <motion.div variants={fadeUp} custom={0} className="max-w-3xl">
            <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-10" />
            <p className="text-2xl sm:text-3xl md:text-5xl font-light text-white uppercase tracking-[0.06em] leading-snug">
              &ldquo;We don&apos;t follow trends.
              <br />
              <span className="font-bold">We define them.</span>&rdquo;
            </p>
            <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-10" />
          </motion.div>
        </div>
      </Section>

      {/* ================================================================
          5. Numbers — Understated stats bar
          ================================================================ */}
      <Section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {[
              { value: "20K+", label: "Customers Worldwide" },
              { value: "98%", label: "Premium Materials" },
              { value: "250+", label: "Unique Designs" },
              { value: "4.9★", label: "Customer Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider">
                  {stat.value}
                </span>
                <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
          6. CTA — Minimal luxury close
          ================================================================ */}
      <Section className="py-32 md:py-44 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p
            variants={fadeIn}
            custom={0}
            className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E] font-bold mb-6"
          >
            Begin Your Journey
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-7xl font-light uppercase tracking-[0.06em] text-[#111] leading-tight"
          >
            Experience
            <br />
            <span className="font-bold">JCob&apos;s</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 border border-[#111] px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#111] hover:text-white transition-all duration-700"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[#c0c0c0] px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium text-[#888] hover:border-[#111] hover:text-[#111] transition-all duration-700"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
