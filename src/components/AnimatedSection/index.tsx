'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer } from '@/animations/variants';

type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  once = true,
  className,
  ...props
}: AnimatedSectionProps) {
  const getVariants = () => {
    switch (animation) {
      case 'fade-up':
        return fadeInUp;
      case 'fade-left':
        return fadeInLeft;
      case 'fade-right':
        return fadeInRight;
      case 'scale':
        return scaleIn;
      case 'stagger':
        return staggerContainer;
      default:
        return fadeInUp;
    }
  };

  const customTransition = {
    duration,
    ease: [0.25, 0.46, 0.45, 0.94], // luxury ease
    delay,
  };

  const variants = getVariants();
  
  // Override internal transition if present
  const visibleVariant = variants.visible as any;
  const motionVariants = {
    ...variants,
    visible: {
      ...visibleVariant,
      transition: {
        ...(visibleVariant?.transition || {}),
        ...customTransition,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={motionVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
