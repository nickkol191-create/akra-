"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Villa } from "./villas";

export function VillaModal({
  villa,
  onClose,
}: {
  villa: Villa | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {villa && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-ink/70" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={villa.name}
            className="liquid-glass relative z-10 w-full max-w-[440px]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Κλείσιμο"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center text-platinum/80 transition-colors hover:text-platinum"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={villa.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
            </div>

            <div className="px-6 pb-7 pt-5">
              <p className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-amber-bright">
                {villa.area}
              </p>
              <h3 className="mt-2 font-display text-3xl font-light text-platinum">
                {villa.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                {villa.description}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {villa.specs.map((s) => (
                  <div key={s.k}>
                    <dt className="font-display text-[0.6rem] uppercase tracking-[0.16em] text-stone-dim">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-display text-sm font-light text-platinum">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 grid gap-3">
                <Link
                  href={`/katoikies/${villa.slug}`}
                  onClick={onClose}
                  className="inline-flex w-full justify-center bg-amber px-6 py-3 font-display text-[0.72rem] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-amber-bright"
                >
                  Δείτε την κατοικία
                </Link>
                <Link
                  href="/#enquiry"
                  onClick={onClose}
                  className="inline-flex w-full justify-center border border-platinum/25 px-6 py-3 font-display text-[0.72rem] uppercase tracking-[0.22em] text-platinum transition-colors hover:border-platinum/60"
                >
                  Ιδιωτικό Αίτημα
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
