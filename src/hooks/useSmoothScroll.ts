"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll integration with GSAP ScrollTrigger
 *
 * Initializes Lenis for buttery-smooth scrolling and syncs it with
 * GSAP's ScrollTrigger for scroll-linked animations.
 */
export function useSmoothScroll(options?: {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  enabled?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const {
    lerp: lerpValue = 0.1,
    duration = 1.2,
    smoothWheel = true,
    wheelMultiplier = 1,
    touchMultiplier = 2,
    enabled = true,
  } = options || {};

  useEffect(() => {
    if (!enabled) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: lerpValue,
      duration,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [lerpValue, duration, smoothWheel, wheelMultiplier, touchMultiplier, enabled]);

  return lenisRef;
}
