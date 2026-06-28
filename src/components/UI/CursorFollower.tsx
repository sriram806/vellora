'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for exact cursor coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Separate luxury springs for organic, fluid lag
  const dotSpringConfig = { damping: 28, stiffness: 380, mass: 0.15 };
  const ringSpringConfig = { damping: 32, stiffness: 180, mass: 0.75 };

  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch interface support
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    // Hide default system cursor by adding class to body
    document.body.classList.add('cursor-custom');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Context-sensitive hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Explicit cursor modifiers
      const hoverAttr = target.closest('[data-cursor]');
      if (hoverAttr) {
        const type = hoverAttr.getAttribute('data-cursor') || 'hover';
        setHoveredType(type);
        return;
      }

      // 2. Interactive triggers (Buttons, Links, Swatches, Selectors)
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.btn-primary') ||
        target.closest('.btn-secondary') ||
        target.closest('.swatch-option') ||
        target.closest('.tab-trigger');

      if (isClickable) {
        setHoveredType('hover');
        return;
      }

      // 3. Typographical text elements (Inversion Blend Mode)
      const isTypography = 
        target.closest('h1') || 
        target.closest('h2') || 
        target.closest('h3') || 
        target.closest('h4') || 
        target.closest('h5') || 
        target.closest('h6') || 
        target.closest('.heading-serif') || 
        target.closest('.font-playfair') ||
        target.closest('.text-hover-invert') ||
        (target.tagName === 'P' && target.innerText.length > 0 && target.offsetHeight > 0) ||
        (target.tagName === 'SPAN' && target.classList.contains('font-serif'));

      if (isTypography) {
        setHoveredType('text');
        return;
      }

      setHoveredType(null);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Configuration variants for the outer cursor ring - sizes kept consistent to prevent zoom effect
  const ringVariants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(201, 169, 110, 0.02)',
      border: '1px solid rgba(201, 169, 110, 0.45)',
      boxShadow: '0 0 12px rgba(201, 169, 110, 0.06)',
      backdropFilter: 'blur(1px)',
      mixBlendMode: 'normal' as const,
    },
    hover: {
      width: 24, // Consistent size, no zoom
      height: 24,
      backgroundColor: 'rgba(201, 169, 110, 0.12)',
      border: '1px solid rgba(201, 169, 110, 0.85)',
      boxShadow: '0 0 15px rgba(201, 169, 110, 0.2)',
      backdropFilter: 'blur(2px)',
      mixBlendMode: 'normal' as const,
    },
    text: {
      width: 24, // Consistent size, no zoom
      height: 24,
      backgroundColor: '#FFFFFF',
      border: '0px solid rgba(255, 255, 255, 0)',
      boxShadow: '0 0 8px rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(0px)',
      mixBlendMode: 'difference' as const,
    },
    view: {
      width: 80, // View badge remains sized for readable text
      height: 80,
      backgroundColor: '#FFFFFF',
      border: '1px solid #C9A96E',
      boxShadow: '0 0 20px rgba(201, 169, 110, 0.2)',
      backdropFilter: 'blur(2px)',
      mixBlendMode: 'normal' as const,
    },
    drag: {
      width: 72, // Drag badge remains sized for readable text
      height: 72,
      backgroundColor: '#1A1A1A',
      border: '1px solid #C9A96E',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(2px)',
      mixBlendMode: 'normal' as const,
    }
  };

  // Configuration variants for the inner micro-dot
  const dotVariants = {
    default: {
      scale: 1,
      backgroundColor: '#C9A96E',
    },
    hover: {
      scale: 0.8, // Subtle size adjustment, no zoom
      backgroundColor: '#C9A96E',
    },
    text: {
      scale: 0,
      backgroundColor: '#FFFFFF',
    },
    view: {
      scale: 0,
      backgroundColor: '#FFFFFF',
    },
    drag: {
      scale: 0,
      backgroundColor: '#FFFFFF',
    }
  };

  const currentVariant = hoveredType ? (ringVariants[hoveredType as keyof typeof ringVariants] ? hoveredType : 'hover') : 'default';
  const currentRingStyle = ringVariants[currentVariant as keyof typeof ringVariants];
  const currentDotStyle = dotVariants[currentVariant as keyof typeof dotVariants];

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999] flex items-center justify-center select-none"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          ...currentRingStyle,
          scale: 1, // Removed click-based zoom scaling
        }}
        transition={{ type: 'spring', ...ringSpringConfig }}
      >
        {hoveredType === 'view' && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-bold text-[#1A1A1A]">
            View
          </span>
        )}
        {hoveredType === 'drag' && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-bold text-[#FFFFFF]">
            Drag
          </span>
        )}
      </motion.div>

      {/* Center Micro-Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[999999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          ...currentDotStyle,
          scale: currentVariant === 'default' ? 1 : 
                 currentVariant === 'hover' ? 0.8 : 0, // Keeps dot visible on hover without scaling out
        }}
        transition={{ type: 'spring', ...dotSpringConfig }}
      />
    </>
  );
}
