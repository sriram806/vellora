import type { Variants, Transition } from "framer-motion";

// Custom cubic-bezier easings for luxury feel, cast to any to resolve Framer Motion type mismatches
const luxuryEase = [0.25, 0.46, 0.45, 0.94] as any;
const smoothEase = [0.43, 0.13, 0.23, 0.96] as any;
const dramaticEase = [0.76, 0, 0.24, 1] as any;
const softEase = [0.4, 0, 0.2, 1] as any;
const bounceEase = [0.34, 1.56, 0.64, 1] as any;

const luxuryTransition: Transition = {
  duration: 0.8,
  ease: luxuryEase,
};

const smoothTransition: Transition = {
  duration: 1,
  ease: smoothEase,
};

const dramaticTransition: Transition = {
  duration: 1.2,
  ease: dramaticEase,
};

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: luxuryTransition,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: softEase },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: softEase },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4, ease: softEase },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.4, ease: softEase },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.4, ease: softEase },
  },
};

// ============================================
// Slide Variants
// ============================================

export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: dramaticTransition,
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.6, ease: dramaticEase },
  },
};

export const slideDown: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: dramaticTransition,
  },
  exit: {
    y: "100%",
    transition: { duration: 0.6, ease: dramaticEase },
  },
};

export const slideLeft: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: dramaticTransition,
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.6, ease: dramaticEase },
  },
};

export const slideRight: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: dramaticTransition,
  },
  exit: {
    x: "100%",
    transition: { duration: 0.6, ease: dramaticEase },
  },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: bounceEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: softEase },
  },
};

export const scaleOut: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: luxuryTransition,
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.3, ease: softEase },
  },
};

// ============================================
// Stagger Container & Items
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: softEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.3 },
  },
};

// ============================================
// Text Reveal Variants
// ============================================

export const textReveal: Variants = {
  hidden: {
    y: "120%",
    rotateX: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: dramaticEase,
    },
  },
};

export const charReveal: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: luxuryEase,
    },
  }),
};

export const wordReveal: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    rotateZ: 3,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateZ: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.8,
      ease: smoothEase,
    },
  }),
};

// ============================================
// Page Transition
// ============================================

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: softEase,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.4,
      ease: softEase,
    },
  },
};

// ============================================
// Hero Reveal
// ============================================

export const heroReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: dramaticEase,
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1.2,
      ease: dramaticEase,
    },
  },
};

export const heroImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.2,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: smoothEase,
    },
  },
};

// ============================================
// Card Hover
// ============================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: softEase,
    },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.4,
      ease: softEase,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const cardImageHover: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.6,
      ease: softEase,
    },
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: softEase,
    },
  },
};

export const cardOverlayHover: Variants = {
  rest: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// Navigation Variants
// ============================================

export const navMenuOpen: Variants = {
  hidden: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
    transition: {
      duration: 0.6,
      ease: dramaticEase,
    },
  },
  visible: {
    clipPath: "circle(150% at calc(100% - 40px) 40px)",
    transition: {
      duration: 0.8,
      ease: dramaticEase,
    },
  },
};

export const navItemReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: luxuryEase,
    },
  }),
};

// ============================================
// Modal / Overlay Variants
// ============================================

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: softEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.3 },
  },
};

// ============================================
// Image Gallery Variants
// ============================================

export const imageGallerySlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: dramaticEase,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: dramaticEase,
    },
  }),
};

// ============================================
// Magnetic Button Effect
// ============================================

export const magneticHover: Variants = {
  rest: { x: 0, y: 0 },
  hover: { x: 0, y: 0 },
};

// ============================================
// Loading / Skeleton
// ============================================

export const shimmer: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

// ============================================
// Scroll-Linked Variants
// ============================================

export const parallaxUp: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

export const revealFromMask: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1,
      ease: dramaticEase,
    },
  },
};
