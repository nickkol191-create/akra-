import { Reveal } from "./Reveal";
import { IMAGES } from "./images";

const FACTS = [
  { k: "Υπνοδωμάτια", v: "Έξι" },
  { k: "Προσανατολισμός", v: "Θάλασσα από τρεις πλευρές" },
  { k: "Πρόσβαση", v: "Ιδιωτική ακτή" },
];

export function SignatureResidence() {
  return (
    <section id="residences" className="bg-ink-2 py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="group relative aspect-[4/5] overflow-hidden md:aspect-[4/5]">
            {/* TODO: real photography — cliffside modernist villa, Kavouri,
                amber interior glow at dusk. */}
            <img
              src={IMAGES.signature}
              alt="Villa Nyx, μια μοντερνιστική κατοικία σμιλεμένη στον βράχο του Καβουρίου"
              className="cine h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="glow-amber absolute inset-0 opacity-70" />
          </div>
        </Reveal>

        <div className="md:pl-4">
          <Reveal>
            <p className="label mb-6 text-amber-bright">Εμβληματική κατοικία</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-name font-display font-light text-platinum">
              Villa Nyx
            </h2>
            <p className="mt-3 font-display text-sm uppercase tracking-[0.26em] text-stone">
              Καβούρι, Βουλιαγμένη
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-stone md:text-lg">
              Ένα μοντερνιστικό σπίτι σμιλεμένο στον βράχο του Καβουρίου, με τη
              θάλασσα από τρεις πλευρές και φως που χρυσώνει το σούρουπο.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:py-6 sm:pr-5 sm:last:border-r-0"
                >
                  <dt className="label !tracking-[0.2em] text-stone-dim">
                    {f.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-light text-platinum">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href="#enquiry"
              className="group mt-10 inline-flex items-center gap-2 font-display text-[0.74rem] uppercase tracking-[0.22em] text-amber-bright"
            >
              <span className="border-b border-amber/40 pb-1 transition-colors duration-300 group-hover:border-amber">
                Ιδιωτικό Αίτημα
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
