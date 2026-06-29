'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Simplified 2D intro for mobile / low-end devices                    */
/* Uses Framer Motion instead of Three.js for performance              */
/* Duration: ~6-8 seconds                                              */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { id: 'hoodie1', src: '/images/clothes/hoodie1.webp', alt: 'Hoodie', x: 0, y: -5, rotate: -3 },
  { id: 'shirt1', src: '/images/clothes/shirt1.webp', alt: 'Shirt', x: -12, y: 8, rotate: 4 },
  { id: 'shirt2', src: '/images/clothes/shirt2.webp', alt: 'Shirt', x: 12, y: 8, rotate: -4 },
  { id: 'hoodie2', src: '/images/clothes/hoodie2.webp', alt: 'Hoodie', x: -8, y: 22, rotate: 3 },
  { id: 'pant1', src: '/images/clothes/pant1.webp', alt: 'Pants', x: 8, y: 22, rotate: -2 },
];

interface MobileIntroSceneProps {
  onComplete?: () => void;
}

export default function MobileIntroScene({ onComplete }: MobileIntroSceneProps) {
  const hasCompleted = useRef(false);

  /* Auto-complete after 7 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete?.();
      }
    }, 7000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* ── Dark radial gradient background ─────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, rgba(4,4,4,1) 70%)',
        }}
      />

      {/* ── Floating product images ─────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            className="absolute"
            style={{
              width: 'clamp(100px, 28vw, 180px)',
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              x: `${product.x}vw`,
              y: `${product.y + 15}vh`,
              rotate: product.rotate * 3,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: [0, 1, 1, 0.9, 0],
              scale: [0.5, 1.05, 1, 1.02, 0.9],
              x: [`${product.x}vw`, `${product.x + (index % 2 === 0 ? 2 : -2)}vw`, `${product.x}vw`, `${product.x}vw`, `${product.x}vw`],
              y: [`${product.y + 15}vh`, `${product.y}vh`, `${product.y - 2}vh`, `${product.y}vh`, `${product.y - 8}vh`],
              rotate: [product.rotate * 3, product.rotate, product.rotate - 2, product.rotate, product.rotate * 1.5],
              filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'],
            }}
            transition={{
              duration: 7.5,
              delay: index * 0.35,
              ease: [0.25, 0.1, 0.25, 1], // Custom cinematic ease
              times: [0, 0.15, 0.4, 0.8, 1],
            }}
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-6 rounded-2xl opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%)',
                filter: 'blur(25px)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Product image */}
            <img
              src={product.src}
              alt={product.alt}
              className="relative w-full h-auto rounded-lg shadow-2xl"
              style={{
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.8))',
              }}
              loading="eager"
            />
          </motion.div>
        ))}
      </div>

      {/* ── Brand watermark ─────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.04, 0.04, 0] }}
        transition={{ duration: 7, times: [0, 0.2, 0.7, 1] }}
      >
        <span
          className="text-white whitespace-nowrap select-none"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(3rem, 20vw, 10rem)',
            fontWeight: 900,
            letterSpacing: '0.3em',
          }}
        >
          JCOPS
        </span>
      </motion.div>

      {/* ── Floating gold particles (CSS) ───────────────────────── */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C9A96E] pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.3 + 0.05,
            animation: `mobile-particle ${Math.random() * 5 + 4}s ease-in-out ${Math.random() * 3}s infinite alternate`,
          }}
        />
      ))}

      {/* ── Vignette overlay ────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <style>{`
        @keyframes mobile-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
