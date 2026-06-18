"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

/** An anchor CTA that magnetically leans toward the cursor. */
export function MagneticButton({
  href,
  children,
  className,
  strength,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const m = useMagnetic(strength);
  return (
    <motion.a
      ref={m.ref}
      href={href}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      style={m.style}
      className={className}
    >
      {children}
    </motion.a>
  );
}
