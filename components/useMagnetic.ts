"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Magnetic micro-physics: the element leans toward the cursor and springs back.
 * Driven entirely by motion values (never useState), so it stays smooth and
 * never re-renders the tree. Collapses to static under reduced motion.
 */
export function useMagnetic(strength = 0.3) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: sx, y: sy }, onMouseMove, onMouseLeave };
}
