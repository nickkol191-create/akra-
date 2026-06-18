"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DecoLogo } from "./DecoLogo";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onComplete, reduce ? 1400 : 3000);
    return () => clearTimeout(t);
  }, [onComplete, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      // fade in place (no drift) so the identical hero logo underneath lines up
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <DecoLogo animated reduce={!!reduce} />
    </motion.div>
  );
}
