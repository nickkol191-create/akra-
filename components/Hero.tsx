"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { IMAGES } from "./images";
import { MagneticButton } from "./MagneticButton";

const HEADLINE = "Μια ιδιωτική συλλογή παράκτιων κατοικιών.";

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.25 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-end overflow-hidden"
    >
      {/* Cinematic backdrop. TODO: replace with real AKRA photography —
          a residence above the sea at dusk, warm interior glow. */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Σύγχρονη κατοικία πάνω από τη θάλασσα στην ακτή της Βουλιαγμένης, την ώρα του δειλινού"
          className="cine kenburns h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      {/* Bat-signal: a slow amber light sweeping across the dark sky */}
      <div className="searchlight" aria-hidden />
      <div className="scrim-b absolute inset-0" />
      <div className="glow-amber absolute inset-0" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 md:pb-28"
      >
        <div>
          <motion.p variants={item} className="label mb-6 text-amber-bright">
            Βουλιαγμένη · Αθηναϊκή Ριβιέρα
          </motion.p>

          {/* Title-card reveal: the headline assembles word by word */}
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="t-hero max-w-[15ch] font-display font-light leading-[1.08] text-platinum sm:max-w-[18ch]"
          >
            {HEADLINE.split(" ").map((w, i, arr) => (
              <Fragment key={i}>
                <motion.span variants={item} className="inline-block pb-[0.06em]">
                  {w}
                </motion.span>
                {i < arr.length - 1 ? " " : null}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-base leading-relaxed text-platinum/70 md:text-lg"
          >
            Η ΑΚΡΑ διαθέτει ένα μικρό χαρτοφυλάκιο μοναδικών κατοικιών κατά
            μήκος της ακτογραμμής της Βουλιαγμένης.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href="#enquiry"
              className="inline-flex justify-center bg-amber px-7 py-3.5 font-display text-[0.74rem] uppercase tracking-[0.22em] text-ink shadow-[0_18px_50px_-18px_rgba(208,154,79,0.7)] transition-colors duration-300 hover:bg-amber-bright"
            >
              Ιδιωτικό Αίτημα
            </MagneticButton>
            <a
              href="#residences"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap border border-platinum/25 px-7 py-3.5 font-display text-[0.74rem] uppercase tracking-[0.22em] text-platinum transition-all duration-300 hover:-translate-y-px hover:border-platinum/60"
            >
              Δείτε τις κατοικίες
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
