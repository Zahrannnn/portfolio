'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FollowingCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Exact cursor position (no lag) for the dot
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring-based position for the ring (follows with delay)
  const smoothX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
  const smoothY = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
    };

    setIsVisible(true);

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    cursorX.set(initialX);
    cursorY.set(initialY);
    smoothX.set(initialX);
    smoothY.set(initialY);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseenter', () => setIsVisible(true));
      window.removeEventListener('mouseleave', () => setIsVisible(false));
    };
  }, [cursorX, cursorY, smoothX, smoothY]);

  return (
    <>
      {/* Precise dot – sits exactly at the cursor position */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Following ring – trails behind with spring physics */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent ring-1 ring-white/75 mix-blend-difference transition-opacity duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </>
  );
}