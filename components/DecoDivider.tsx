"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * A section divider: an Art-Deco sunburst on a horizon that draws itself with
 * light (SVG pathLength) as it scrolls into view. The brand's "light against
 * the dark" motif, in motion. Static (fully drawn) under reduced motion.
 */
export function DecoDivider() {
  const reduce = useReducedMotion();

  const stroke: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: (i: number = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, delay: i * 0.06 },
      },
    }),
  };

  return (
    <div className="bg-ink py-12 text-amber/70 md:py-20">
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.svg
          viewBox="0 0 1000 110"
          className="h-[70px] w-full md:h-[88px]"
          fill="none"
          aria-hidden
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <g
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          >
            {/* horizon: draws from the centre logo outward to both sides */}
            <motion.line x1="452" y1="80" x2="40" y2="80" variants={stroke} custom={0} />
            <motion.line x1="548" y1="80" x2="960" y2="80" variants={stroke} custom={0} />
            {/* rays */}
            <motion.line x1="500" y1="80" x2="500" y2="26" variants={stroke} custom={1} />
            <motion.line x1="500" y1="80" x2="526" y2="34" variants={stroke} custom={2} />
            <motion.line x1="500" y1="80" x2="474" y2="34" variants={stroke} custom={2} />
            <motion.line x1="500" y1="80" x2="546" y2="54" variants={stroke} custom={3} />
            <motion.line x1="500" y1="80" x2="454" y2="54" variants={stroke} custom={3} />
            {/* crowning arc */}
            <motion.path
              d="M458 80 A42 42 0 0 1 542 80"
              variants={stroke}
              custom={4}
              opacity={0.6}
            />
          </g>
        </motion.svg>
      </div>
    </div>
  );
}
