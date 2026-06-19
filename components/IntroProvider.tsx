"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Preloader } from "./Preloader";

type IntroCtx = {
  ready: boolean; // preloader finished
  entered: boolean; // viewer tapped the hero to open the fan
  setEntered: (v: boolean) => void;
  setGate: (v: boolean) => void; // an entry gate (the hero) is present on this page
};

const Ctx = createContext<IntroCtx>({
  ready: false,
  entered: false,
  setEntered: () => {},
  setGate: () => {},
});

export const useIntro = () => useContext(Ctx);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [gate, setGate] = useState(false);

  // On a fresh load / refresh, start at the top so the hero intro always plays
  // (browsers otherwise restore the previous scroll position).
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll until the loader is done AND (if there's a hero gate) the viewer
  // has entered. Pages without a hero gate just wait for the loader.
  useEffect(() => {
    const locked = !ready || (gate && !entered);
    const value = locked ? "hidden" : "";
    // lock the root too — the scroll container is usually <html>, not <body>
    document.documentElement.style.overflow = value;
    document.body.style.overflow = value;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [ready, entered, gate]);

  return (
    <Ctx.Provider value={{ ready, entered, setEntered, setGate }}>
      <AnimatePresence>
        {!ready && <Preloader key="preloader" onComplete={() => setReady(true)} />}
      </AnimatePresence>
      {children}
    </Ctx.Provider>
  );
}
