"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================
// VELLORA - GSAP Utilities
// ============================================

/**
 * Register all required GSAP plugins
 */
export function registerGSAPPlugins(): void {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// ============================================
// ScrollTrigger Preset Configs
// ============================================

export const scrollTriggerPresets = {
  /** Element fades in when entering viewport */
  fadeIn: {
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse" as const,
  },
  /** Element parallaxes while scrolling through viewport */
  parallax: {
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
  /** Element pins during scroll */
  pin: {
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: 1,
  },
  /** Element triggers once when entering viewport */
  once: {
    start: "top 80%",
    toggleActions: "play none none none" as const,
  },
  /** Horizontal scroll section */
  horizontal: {
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / 3,
      duration: 0.5,
      ease: "power2.inOut",
    },
  },
} as const;

// ============================================
// Text Reveal Animation
// ============================================

/**
 * Create a text reveal animation that splits text and animates each line
 */
export function createTextReveal(
  element: HTMLElement,
  options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Timeline {
  const {
    duration = 1,
    stagger = 0.1,
    delay = 0,
    scrollTrigger: scrollTriggerConfig,
  } = options || {};

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig
      ? {
          trigger: element,
          ...scrollTriggerPresets.once,
          ...scrollTriggerConfig,
        }
      : undefined,
  });

  tl.fromTo(
    element,
    {
      y: 60,
      opacity: 0,
      rotateX: -15,
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
    }
  );

  return tl;
}

// ============================================
// Parallax Animation
// ============================================

/**
 * Create a parallax scroll effect on an element
 */
export function createParallax(
  element: HTMLElement,
  options?: {
    speed?: number;
    direction?: "up" | "down";
    scrub?: number | boolean;
  }
): gsap.core.Tween {
  const { speed = 50, direction = "up", scrub = 1 } = options || {};

  const yFrom = direction === "up" ? speed : -speed;
  const yTo = direction === "up" ? -speed : speed;

  return gsap.fromTo(
    element,
    { y: yFrom },
    {
      y: yTo,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    }
  );
}

// ============================================
// Fade In Animation
// ============================================

/**
 * Create a fade-in animation triggered by scroll
 */
export function createFadeIn(
  element: HTMLElement | HTMLElement[],
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    y = 40,
    stagger = 0,
    scrollTrigger: scrollTriggerConfig,
  } = options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: Array.isArray(element) ? element[0] : element,
        ...scrollTriggerPresets.once,
        ...scrollTriggerConfig,
      },
    }
  );
}

// ============================================
// Slide In Animation
// ============================================

/**
 * Create a slide-in animation from any direction
 */
export function createSlideIn(
  element: HTMLElement,
  options?: {
    direction?: "left" | "right" | "up" | "down";
    duration?: number;
    delay?: number;
    distance?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const {
    direction = "left",
    duration = 1,
    delay = 0,
    distance = 100,
    scrollTrigger: scrollTriggerConfig,
  } = options || {};

  const fromVars: gsap.TweenVars = { opacity: 0 };

  switch (direction) {
    case "left":
      fromVars.x = -distance;
      break;
    case "right":
      fromVars.x = distance;
      break;
    case "up":
      fromVars.y = distance;
      break;
    case "down":
      fromVars.y = -distance;
      break;
  }

  return gsap.fromTo(element, fromVars, {
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      ...scrollTriggerPresets.once,
      ...scrollTriggerConfig,
    },
  });
}

// ============================================
// Scale Reveal Animation
// ============================================

/**
 * Create a scale reveal animation for images/cards
 */
export function createScaleReveal(
  element: HTMLElement,
  options?: {
    duration?: number;
    delay?: number;
    startScale?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const {
    duration = 1.2,
    delay = 0,
    startScale = 0.85,
    scrollTrigger: scrollTriggerConfig,
  } = options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: startScale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        ...scrollTriggerPresets.once,
        ...scrollTriggerConfig,
      },
    }
  );
}

// ============================================
// Stagger Reveal Animation
// ============================================

/**
 * Create a staggered reveal animation for a group of elements
 */
export function createStaggerReveal(
  elements: HTMLElement[] | NodeListOf<Element>,
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const {
    duration = 0.7,
    stagger = 0.12,
    y = 50,
    scrollTrigger: scrollTriggerConfig,
  } = options || {};

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0] as HTMLElement,
        ...scrollTriggerPresets.once,
        ...scrollTriggerConfig,
      },
    }
  );
}

// ============================================
// Horizontal Scroll Animation
// ============================================

/**
 * Create a horizontal scroll section
 */
export function createHorizontalScroll(
  container: HTMLElement,
  scrollContent: HTMLElement,
  options?: {
    ease?: string;
  }
): gsap.core.Tween {
  const { ease = "none" } = options || {};

  const scrollWidth =
    scrollContent.scrollWidth - container.offsetWidth;

  return gsap.to(scrollContent, {
    x: -scrollWidth,
    ease,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

// ============================================
// Cleanup Utility
// ============================================

/**
 * Kill all ScrollTrigger instances and GSAP tweens
 */
export function cleanupGSAP(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
}

/**
 * Refresh all ScrollTrigger instances (useful after layout changes)
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}
