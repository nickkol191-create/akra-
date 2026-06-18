"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const RAYS = [
  { angle: -60, len: 100, delay: 1.4 },
  { angle: -30, len: 100, delay: 1.1 },
  { angle: 30, len: 100, delay: 1.1 },
  { angle: 60, len: 100, delay: 1.4 },
];

/**
 * The AKRA sunburst lockup + wordmark. Shared by the loader and the hero so the
 * logo sits in the exact same spot and size in both — when the loader fades, the
 * identical resting logo is already underneath, so there's no jump.
 *
 * `animated` plays the unfurl (line grows -> rays fan out -> arc/horizon -> name).
 * Without it, the same lockup renders statically at its final state.
 */
export function DecoLogo({
  animated = false,
  reduce = false,
}: {
  animated?: boolean;
  reduce?: boolean;
}) {
  const a = animated && !reduce;
  const tr = (duration: number, delay: number, extra = {}) => ({
    duration: a ? duration : 0,
    delay: a ? delay : 0,
    ease: EASE,
    ...extra,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[124px] w-[280px] text-amber">
        {/* central ray: grows upward */}
        <motion.div
          className="absolute bottom-0 w-[2px] origin-bottom bg-amber"
          style={{ height: 112, left: "calc(50% - 1px)" }}
          initial={{ scaleY: a ? 0 : 1 }}
          animate={{ scaleY: 1 }}
          transition={tr(0.7, 0.3)}
        />
        {/* side rays: fan out from the centre to the sides */}
        {RAYS.map((r) => (
          <motion.div
            key={r.angle}
            className="absolute bottom-0 w-[2px] origin-bottom bg-amber"
            style={{ height: r.len, left: "calc(50% - 1px)" }}
            initial={{ rotate: a ? 0 : r.angle, opacity: a ? 0 : 1 }}
            animate={{ rotate: r.angle, opacity: 1 }}
            transition={tr(0.7, r.delay, {
              opacity: { duration: a ? 0.25 : 0, delay: a ? r.delay : 0 },
            })}
          />
        ))}
        {/* crowning arc */}
        <motion.div
          className="absolute bottom-0 border-2 border-b-0 border-amber"
          style={{
            width: 200,
            height: 100,
            left: "calc(50% - 100px)",
            borderRadius: "100px 100px 0 0",
          }}
          initial={{ opacity: a ? 0 : 0.5, scale: a ? 0.92 : 1 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={tr(0.6, 2.0)}
        />
        {/* horizon: grows from the centre outward */}
        <motion.div
          className="absolute bottom-0 h-[2px] origin-center bg-amber"
          style={{ width: 230, left: "calc(50% - 115px)" }}
          initial={{ scaleX: a ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={tr(0.5, 1.9)}
        />
      </div>
      <motion.span
        className="mt-9 font-display text-sm font-medium uppercase tracking-[0.5em] text-platinum"
        initial={{ opacity: a ? 0 : 1, y: a ? 8 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={tr(0.6, 2.3)}
      >
        ΑΚΡΑ
      </motion.span>
    </div>
  );
}
