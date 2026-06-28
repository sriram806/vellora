'use client';

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface SplashScreenProps {
  /** Called when the splash animation finishes (~3.3s) */
  onComplete: () => void;
}

/* ------------------------------------------------------------------ */
/* Dust particle config                                                */
/* ------------------------------------------------------------------ */
interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 3,
    opacity: Math.random() * 0.25 + 0.05,
  }));
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

  const tagline = 'The Art of Modern Elegance';

  /* Split tagline into individual letter spans for staggered reveal */
  const taglineLetters = useMemo(
    () =>
      tagline.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: 0,
            transform: 'translateY(8px)',
            display: char === ' ' ? 'inline' : 'inline-block',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )),
    [],
  );

  /* Dust particles – generated once */
  const particles = useMemo(() => generateParticles(35), []);

  /* ---------------------------------------------------------------- */
  /* GSAP Master Timeline                                              */
  /* ---------------------------------------------------------------- */
  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete });

      // Initialize logo styling for spotlight gradient sweep
      gsap.set(logoRef.current, {
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.1) 80%)',
        backgroundSize: '200% auto',
        backgroundPosition: '200% 0',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
      });

      /* 0.0s → Black screen (already black by default) */

      /* 0.4s → Golden glow explodes in behind logo */
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.1 },
        { opacity: 0.8, scale: 1.2, duration: 2.5, ease: 'elastic.out(1, 0.5)' },
        0.4
      );

      /* 0.5s → Logo cinematic reveal with scale & blur */
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.75, y: 20, filter: 'blur(12px)' },
        { opacity: 1, scale: 1.0, y: 0, filter: 'blur(0px)', duration: 1.8, ease: 'expo.out' },
        0.5
      );

      // Spotlight sweep from left to right (accelerated)
      tl.to(
        logoRef.current,
        {
          backgroundPosition: '-200% 0',
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0.5
      );

      /* 0.6s → Light rays begin rotating and fading in */
      tl.fromTo(
        raysRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.1, scale: 1.1, duration: 2.0, ease: 'power2.out' },
        0.6
      );

      /* 1.1s → Tagline reveals with blur and stagger */
      if (taglineRef.current) {
        const letters = taglineRef.current.querySelectorAll('span');
        tl.fromTo(
          letters,
          { opacity: 0, y: 15, filter: 'blur(6px)', scale: 0.8 },
          {
            opacity: 0.9,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
          },
          1.1
        );
      }

      /* 2.7s → Everything dissolves outward in a cinematic blur */
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.15,
          filter: 'blur(15px)',
          duration: 0.6,
          ease: 'power3.inOut',
        },
        2.7
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {/* ── Golden radial glow ─────────────────────────────────── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 'min(600px, 90vw)',
          height: 'min(600px, 90vw)',
          background:
            'radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 35%, transparent 65%)',
          filter: 'blur(50px)',
          opacity: 0,
          willChange: 'opacity, transform',
        }}
      />

      {/* ── Subtle rotating light rays ─────────────────────────── */}
      <div
        ref={raysRef}
        className="absolute pointer-events-none"
        style={{
          width: 'min(900px, 130vw)',
          height: 'min(900px, 130vw)',
          opacity: 0,
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(201,169,110,0.35) 8deg, transparent 16deg, transparent 90deg, rgba(201,169,110,0.25) 98deg, transparent 106deg, transparent 180deg, rgba(201,169,110,0.35) 188deg, transparent 196deg, transparent 270deg, rgba(201,169,110,0.25) 278deg, transparent 286deg)',
          animation: 'splash-spin 25s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* ── Brand logo ─────────────────────────────────────────── */}
      <h1
        ref={logoRef}
        className="relative z-10 text-white select-none"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 700,
          letterSpacing: '0.35em',
          lineHeight: 1,
          opacity: 0,
          willChange: 'opacity, transform',
        }}
      >
        JCOPS
      </h1>

      {/* ── Decorative line ────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent"
        style={{ width: 'clamp(80px, 20vw, 200px)' }}
      />

      {/* ── Tagline (letter-by-letter reveal) ──────────────────── */}
      <div
        ref={taglineRef}
        className="relative z-10 mt-5 text-[#C9A96E] select-none"
        style={{
          fontFamily: 'var(--font-space)',
          fontSize: 'clamp(0.6rem, 1.4vw, 1rem)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        {taglineLetters}
      </div>

      {/* ── Floating dust particles ────────────────────────────── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#C9A96E',
            opacity: p.opacity,
            animation: `splash-dust ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* ── Film grain texture ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.15,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          animation: 'splash-grain 6s steps(8) infinite',
        }}
      />

      {/* ── Keyframes ──────────────────────────────────────────── */}
      <style>{`
        @keyframes splash-dust {
          0%   { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-25px) translateX(12px); opacity: 0; }
        }
        @keyframes splash-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes splash-grain {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-8%, 4%); }
          40% { transform: translate(6%, -10%); }
          60% { transform: translate(10%, 5%); }
          80% { transform: translate(-3%, 12%); }
        }
      `}</style>
    </div>
  );
}
