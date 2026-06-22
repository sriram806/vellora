'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.classList.add('cursor-custom');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverAttr = target.closest('[data-cursor]');
      
      if (hoverAttr) {
        const type = hoverAttr.getAttribute('data-cursor') || 'hover';
        setHoveredType(type);
      } else if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('select')) {
        setHoveredType('hover');
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // If mobile/touch device, don't render custom cursor
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice || !isVisible) return null;

  // Render cursor styling based on hover type
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: '#C9A96E', // gold
      border: '0px solid #C9A96E',
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(201, 169, 110, 0.1)',
      border: '1px solid #C9A96E',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: '#FFFFFF',
      border: '1px solid #1A1A1A',
      color: '#1A1A1A',
    },
    drag: {
      width: 60,
      height: 60,
      backgroundColor: '#1A1A1A',
      border: '1px solid #C9A96E',
      color: '#FFFFFF',
    }
  };

  const currentVariant = hoveredType ? (variants[hoveredType as keyof typeof variants] ? hoveredType : 'hover') : 'default';

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-medium uppercase tracking-widest text-center select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={currentVariant}
        variants={variants}
        transition={{ type: 'spring', ...springConfig }}
      >
        {hoveredType === 'view' && <span>View</span>}
        {hoveredType === 'drag' && <span>Drag</span>}
      </motion.div>

      {/* Tiny Center Dot */}
      {hoveredType !== 'view' && hoveredType !== 'drag' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 bg-[#C9A96E] rounded-full pointer-events-none z-[10000]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
}
