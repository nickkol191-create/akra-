import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";

export function Statement() {
  return (
    <section className="bg-ink py-32 md:py-44">
      <div className="mx-auto max-w-[1000px] px-5 text-center sm:px-8">
        <Reveal>
          <Monogram className="mx-auto mb-10 h-9 w-11 text-amber" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="t-statement font-display font-light tracking-[-0.01em] text-platinum">
            Οι πιο σπάνιες διευθύνσεις δεν διαφημίζονται ποτέ. Εμπιστεύονται,
            διακριτικά, σε ανθρώπους που ήδη γνωρίζουν την ακτή.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label mx-auto mt-10 !tracking-[0.28em] text-stone-dim">
            Άκρα (ΑΚΡΑ) · το ακρωτήρι, το έσχατο σημείο της στεριάς
          </p>
        </Reveal>
      </div>
    </section>
  );
}
