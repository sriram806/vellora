"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Track mouse position with optional lerp (linear interpolation) smoothing.
 *
 * Returns both the raw mouse position and a smoothed position
 * for creating fluid cursor-following effects.
 */
export function useMousePosition(options?: {
  lerp?: number;
  enabled?: boolean;
}) {
  const { lerp: lerpFactor = 0.1, enabled = true } = options || {};

  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 });
  const currentRef = useRef<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!enabled) return;

      const newPosition = { x: event.clientX, y: event.clientY };
      targetRef.current = newPosition;
      setPosition(newPosition);
    },
    [enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Start the smoothing animation loop
    const animate = () => {
      currentRef.current = {
        x: lerp(currentRef.current.x, targetRef.current.x, lerpFactor),
        y: lerp(currentRef.current.y, targetRef.current.y, lerpFactor),
      };

      setSmoothPosition({ ...currentRef.current });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove, lerpFactor, enabled]);

  return {
    /** Raw mouse position (immediate) */
    position,
    /** Smoothed mouse position (lerp-interpolated) */
    smoothPosition,
    /** Normalized position (0-1 range based on viewport) */
    normalized: {
      x: typeof window !== "undefined" ? position.x / window.innerWidth : 0,
      y: typeof window !== "undefined" ? position.y / window.innerHeight : 0,
    },
  };
}
