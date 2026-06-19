"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VILLAS } from "./villas";
import { useIntro } from "./IntroProvider";
import { DecoLogo } from "./DecoLogo";
import { VillaModal } from "./VillaModal";

// 7 blades fanning from a bottom-centre pivot.
const ANGLES = [-66, -44, -22, 0, 22, 44, 66];
const CENTER = (ANGLES.length - 1) / 2;

const BLADE_H = "150vh";
const BLADE_W = "60vh";
const BLADE_LEFT = "calc(50% - 30vh)";
const EASE = [0.16, 1, 0.3, 1] as const;

type BladeProps = {
  angle: number;
  src: string;
  index: number;
  dist: number;
  open: boolean;
  reduce: boolean;
  selected: boolean;
  onEnter: (i: number) => void;
  onLeave: (i: number) => void;
  onClick: (i: number) => void;
};

const Blade = memo(function Blade({
  angle,
  src,
  index,
  dist,
  open,
  reduce,
  selected,
  onEnter,
  onLeave,
  onClick,
}: BladeProps) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0"
      style={{
        width: BLADE_W,
        height: BLADE_H,
        left: BLADE_LEFT,
        transformOrigin: "bottom center",
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={open ? { rotate: angle, opacity: 1 } : { rotate: 0, opacity: 0 }}
      transition={{
        duration: reduce ? 0 : 1.05,
        delay: reduce ? 0 : dist * 0.13,
        ease: EASE,
        opacity: { duration: reduce ? 0 : 0.45, delay: reduce ? 0 : dist * 0.13 },
      }}
    >
      {/* only the clipped triangle is the hit area, so the whole photo reacts.
          hover (desktop) and `selected` (touch tap) both widen + brighten. */}
      <div
        className={`group pointer-events-auto absolute inset-0 origin-bottom cursor-pointer transition-transform duration-500 ease-out hover:scale-x-[1.3] ${
          selected ? "scale-x-[1.3]" : ""
        }`}
        style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}
        onMouseEnter={() => onEnter(index)}
        onMouseLeave={() => onLeave(index)}
        onClick={() => onClick(index)}
      >
        <img
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/55 transition-opacity duration-300 group-hover:opacity-[0.15] ${
            selected ? "opacity-[0.15]" : ""
          }`}
        />
      </div>
    </motion.div>
  );
});

export function HeroFan() {
  const reduce = !!useReducedMotion();
  const { ready, entered, setEntered, setGate } = useIntro();
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [modal, setModal] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const open = entered;

  useEffect(() => {
    setGate(true);
    return () => setGate(false);
  }, [setGate]);

  // `ready` captured at mount tells us how we arrived:
  //  - false  -> a fresh load / refresh: the loader is about to play, so we
  //    always start at the hero. Ignore any leftover #hash and any browser
  //    scroll restoration (which on mobile would jump us mid-page once the
  //    scroll-lock releases).
  //  - true   -> in-app navigation (e.g. footer "Πώς εργαζόμαστε" -> /#approach):
  //    skip the hero gate and jump to that section.
  const readyAtMount = useRef(ready);
  useEffect(() => {
    if (!readyAtMount.current) {
      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      window.scrollTo(0, 0);
      return;
    }
    const hash = window.location.hash;
    if (!hash) return;
    setEntered(true);
    const id = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "auto" });
    }, 250);
    return () => window.clearTimeout(id);
  }, [setEntered]);

  // Enter the fan and force the view to the top, overriding any pending mobile
  // scroll restoration that fires when the scroll-lock releases.
  const enter = useCallback(() => {
    setEntered(true);
    const top = () => window.scrollTo(0, 0);
    top();
    requestAnimationFrame(top);
    window.setTimeout(top, 80);
  }, [setEntered]);

  useEffect(() => {
    const touch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
  }, []);

  // On touch, once the fan is open, auto-showcase each photo left -> right
  // until the viewer takes over.
  useEffect(() => {
    if (!isTouch || !entered || !autoPlay || reduce) return;
    let i = 0;
    setSelected(0);
    const id = window.setInterval(() => {
      i = (i + 1) % ANGLES.length;
      setSelected(i);
    }, 2000);
    return () => window.clearInterval(id);
  }, [isTouch, entered, autoPlay, reduce]);

  const onEnter = useCallback((i: number) => setHovered(i), []);
  const onLeave = useCallback(
    (i: number) => setHovered((h) => (h === i ? null : h)),
    []
  );
  const onBladeClick = useCallback(
    (i: number) => {
      if (isTouch) {
        setAutoPlay(false); // viewer took over the showcase
        setSelected(i);
      } else {
        setModal(i); // desktop: click opens the modal
      }
    },
    [isTouch]
  );

  const blades = useMemo(
    () =>
      ANGLES.map((angle, i) => (
        <Blade
          key={i}
          angle={angle}
          src={VILLAS[i].image}
          index={i}
          dist={Math.abs(i - CENTER)}
          open={open}
          reduce={reduce}
          selected={isTouch && selected === i}
          onEnter={onEnter}
          onLeave={onLeave}
          onClick={onBladeClick}
        />
      )),
    [open, reduce, isTouch, selected, onEnter, onLeave, onBladeClick]
  );

  const active = isTouch ? selected : hovered;

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-ink">
      {/* the background light slowly rises once the loader is done */}
      <motion.div
        className="glow-amber absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 0.5 : 0 }}
        transition={{ duration: reduce ? 0 : 2.8, ease: "easeInOut" }}
      />

      <div className="absolute inset-0">{blades}</div>

      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(125%_92%_at_50%_100%,transparent_55%,rgba(8,9,12,0.9)_100%)]" />

      {/* villa label: name + area; on touch, a Details button that opens the modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[38%] z-40 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <span className="font-display text-3xl font-light text-platinum [text-shadow:0_2px_28px_rgba(0,0,0,0.85)] md:text-5xl">
              {VILLAS[active].name}
            </span>
            <span className="mt-3 font-display text-xs uppercase tracking-[0.3em] text-amber-bright [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] md:text-sm">
              {VILLAS[active].area}
            </span>
            {isTouch && (
              <button
                onClick={() => {
                  setAutoPlay(false);
                  setModal(active);
                }}
                className="pointer-events-auto mt-6 border border-amber/70 bg-ink/40 px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-amber-bright backdrop-blur-sm"
              >
                Λεπτομέρειες
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resting state: the shared logo. Tap to fly through it into the fan. */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="absolute inset-0 z-50 flex cursor-pointer items-center justify-center"
            role="button"
            tabIndex={0}
            aria-label="Είσοδος στις κατοικίες"
            onClick={() => ready && enter()}
            onKeyDown={(e) => {
              if (ready && (e.key === "Enter" || e.key === " ")) enter();
            }}
            exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.35 } }}
          >
            <motion.div
              exit={{
                scale: reduce ? 1 : 26,
                opacity: 0,
                transition: { duration: reduce ? 0 : 0.8, ease: [0.6, 0, 0.85, 0.1] },
              }}
            >
              <DecoLogo reduce={reduce} />
            </motion.div>
            <span className="hint-pulse absolute left-1/2 top-[64%] -translate-x-1/2 font-display text-[0.7rem] uppercase tracking-[0.3em] text-stone">
              Πατήστε για είσοδο
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <VillaModal
        villa={modal !== null ? VILLAS[modal] : null}
        onClose={() => setModal(null)}
      />
    </section>
  );
}
