"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";
import { useMagnetic } from "./useMagnetic";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const FIELD =
  "w-full border border-line bg-surface px-4 py-3.5 text-platinum placeholder:text-stone/70 transition-colors duration-300 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/70";

export function Enquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const mag = useMagnetic(0.25);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Συμπληρώστε το όνομά σας.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      next.email = "Εισαγάγετε ένα έγκυρο email.";
    if (message.length < 8)
      next.message = "Δύο λόγια για το τι αναζητάτε.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    // No backend in this build — simulate a personal reply pipeline.
    window.setTimeout(() => setStatus("success"), 1300);
  }

  return (
    <section id="enquiry" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="glow-amber absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[680px] px-5 sm:px-8">
        <Reveal>
          <h2 className="t-h2 font-display font-light text-platinum">
            Υποβάλετε ένα ιδιωτικό αίτημα.
          </h2>
          <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-stone md:text-lg">
            Πείτε μας τι αναζητάτε. Απαντάμε προσωπικά σε κάθε αίτημα, με
            απόλυτη εχεμύθεια.
          </p>
        </Reveal>

        {status === "success" ? (
          <div className="mt-12 border border-line bg-ink-2 px-8 py-14 text-center">
            <Monogram className="mx-auto mb-6 h-9 w-11 text-amber" />
            <p className="font-display text-2xl font-light text-platinum">
              Το αίτημά σας ελήφθη.
            </p>
            <p className="mx-auto mt-4 max-w-[44ch] text-sm leading-relaxed text-stone">
              Διαβάζουμε προσωπικά κάθε μήνυμα και απαντάμε εντός μίας ημέρας,
              συνήθως νωρίτερα. Σας ευχαριστούμε που επικοινωνήσατε με την ΑΚΡΑ.
            </p>
          </div>
        ) : (
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="mt-12 grid gap-7">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-stone"
                >
                  Ονοματεπώνυμο
                </label>
                <input id="name" name="name" type="text" className={FIELD} />
                {errors.name && (
                  <p className="text-sm text-amber-bright">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-stone"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={FIELD}
                  />
                  {errors.email && (
                    <p className="text-sm text-amber-bright">{errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="phone"
                    className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-stone"
                  >
                    Τηλέφωνο
                    <span className="ml-2 normal-case tracking-normal text-stone-dim">
                      προαιρετικό
                    </span>
                  </label>
                  <input id="phone" name="phone" type="tel" className={FIELD} />
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-stone"
                >
                  Τι αναζητάτε
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${FIELD} resize-none`}
                />
                {errors.message && (
                  <p className="text-sm text-amber-bright">{errors.message}</p>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-5">
                <motion.button
                  ref={mag.ref}
                  onMouseMove={mag.onMouseMove}
                  onMouseLeave={mag.onMouseLeave}
                  style={mag.style}
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-amber px-8 py-3.5 font-display text-[0.74rem] uppercase tracking-[0.22em] text-ink shadow-[0_18px_50px_-18px_rgba(208,154,79,0.7)] transition-colors duration-300 hover:bg-amber-bright disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Αποστολή…" : "Αποστολή Αιτήματος"}
                </motion.button>
                <p className="text-sm text-stone-dim">
                  Με απόλυτη εχεμύθεια. Δεν κοινοποιείται ποτέ.
                </p>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
