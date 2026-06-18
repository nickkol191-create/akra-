"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { MagneticButton } from "./MagneticButton";

const HEADLINE = "Μια ιδιωτική συλλογή παράκτιων κατοικιών.";

export function Intro() {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative bg-ink pt-24 pb-28 md:pt-28 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p variants={item} className="label mb-7 text-amber-bright">
            Βουλιαγμένη · Αθηναϊκή Ριβιέρα
          </motion.p>

          {/* word-by-word title-card reveal */}
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="t-hero max-w-[15ch] font-display font-light leading-[1.08] text-platinum sm:max-w-[20ch]"
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
            className="mt-7 max-w-[48ch] text-base leading-relaxed text-stone md:text-lg"
          >
            Η ΑΚΡΑ διαθέτει ένα μικρό χαρτοφυλάκιο μοναδικών κατοικιών κατά μήκος
            της ακτογραμμής της Βουλιαγμένης.
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
        </motion.div>
      </div>
    </section>
  );
}
