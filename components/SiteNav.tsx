"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Monogram } from "./Monogram";
import { useIntro } from "./IntroProvider";

const LINKS = [
  { label: "Κατοικίες", href: "/katoikies" },
  { label: "Πώς εργαζόμαστε", href: "/#approach" },
];

export function SiteNav() {
  const { setEntered } = useIntro();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // Hidden while the hero is on screen; on pages without a hero, always shown.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <nav className="relative mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* left: desktop links / mobile hamburger */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 bg-platinum transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-platinum transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-6 bg-platinum transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label !tracking-[0.22em] !text-stone transition-colors duration-300 hover:!text-platinum"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* centre: logo */}
        <Link
          href="/"
          onClick={() => {
            setEntered(false);
            window.scrollTo(0, 0);
          }}
          className="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 text-platinum"
          aria-label="ΑΚΡΑ, αρχική"
        >
          <Monogram className="h-6 w-7 text-amber transition-transform duration-500 group-hover:-translate-y-0.5" />
          <span className="font-display text-[1.05rem] font-medium tracking-[0.42em] text-platinum">
            AKRA
          </span>
        </Link>

        {/* right: CTA (desktop) / spacer to keep the logo centred on mobile */}
        <div className="flex items-center">
          <Link
            href="/#enquiry"
            className="hidden border border-amber/60 px-5 py-2.5 font-display text-[0.7rem] uppercase tracking-[0.22em] text-amber-bright transition-colors duration-300 hover:border-amber hover:bg-amber/10 md:inline-flex"
          >
            Ιδιωτικό Αίτημα
          </Link>
          <div className="h-9 w-9 md:hidden" />
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`grid overflow-hidden bg-ink transition-all duration-500 md:hidden ${
          open ? "grid-rows-[1fr] border-b border-line" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-6 px-5 py-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-light tracking-wide text-platinum"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#enquiry"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block w-fit bg-amber px-6 py-3 font-display text-[0.72rem] uppercase tracking-[0.24em] text-ink"
            >
              Ιδιωτικό Αίτημα
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
