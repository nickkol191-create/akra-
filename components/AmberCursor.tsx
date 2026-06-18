"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";

const TEXT_TAGS = new Set([
  "H1", "H2", "H3", "H4", "H5", "H6",
  "P", "SPAN", "LI", "STRONG", "EM", "LABEL", "DT", "DD", "BLOCKQUOTE", "ADDRESS",
]);

function overText(el: HTMLElement | null) {
  let n: HTMLElement | null = el;
  for (let i = 0; i < 3 && n; i++) {
    if (TEXT_TAGS.has(n.tagName) && (n.textContent?.trim().length ?? 0) > 0) {
      return true;
    }
    n = n.parentElement;
  }
  return false;
}

/**
 * A minimal amber cursor (centre dot + ring) for the whole site. The ring
 * tracks the pointer exactly (no spring delay). It grows + fills over
 * links/buttons, grows (open) over letters, and steps aside (native caret)
 * over text fields. Native cursor on touch / reduced motion.
 */
export function AmberCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false); // over a link / button
  const [text, setText] = useState(false); // over letters

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover)").matches &&
        window.matchMedia("(pointer: fine)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;
    document.documentElement.classList.add("amber-cursor-zone");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const onField = !!t.closest("input, textarea");
      const link = !onField && !!t.closest("a, button, [role='button']");
      setVisible(!onField);
      setHot(link);
      setText(!onField && !link && overText(t));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("amber-cursor-zone");
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  const size = hot ? 60 : text ? 92 : 28;

  return (
    <>
      {/* ring — tracks the pointer exactly (no delay) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-amber"
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            backgroundColor: hot ? "rgba(208,154,79,0.10)" : "rgba(208,154,79,0)",
          }}
          transition={{
            width: { duration: 0.2 },
            height: { duration: 0.2 },
            opacity: { duration: 0.18 },
          }}
        />
      </motion.div>

      {/* centre dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x, y }}
      >
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber"
          animate={{ opacity: visible ? 1 : 0, scale: hot || text ? 0 : 1 }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
    </>
  );
}
