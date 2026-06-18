import { Reveal } from "./Reveal";
import { IMAGES } from "./images";

const SHOTS = [
  {
    src: IMAGES.atmosphere.wide1,
    alt: "Λευκή βίλα πάνω από τον όρμο, την ώρα του δειλινού",
    span: "md:col-span-2",
    aspect: "aspect-[16/10]",
  },
  {
    src: IMAGES.atmosphere.tall1,
    alt: "Μαρμάρινο εσωτερικό στο μισοσκόταδο",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: IMAGES.atmosphere.tall2,
    alt: "Η ακτή και η θάλασσα κάτω από τον βράχο",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: IMAGES.atmosphere.wide2,
    alt: "Εσωτερικό λουσμένο σε ζεστό βραδινό φως",
    span: "md:col-span-2",
    aspect: "aspect-[16/10]",
  },
];

export function Atmosphere() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <h2 className="t-h3-cap mb-12 max-w-[18ch] font-display font-light tracking-[-0.01em] text-platinum md:mb-16">
            Η ζωή στο ακρωτήρι.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {SHOTS.map((s, i) => (
            <Reveal
              key={s.src}
              delay={i * 0.06}
              className={`${s.span}`}
            >
              <div className={`group relative ${s.aspect} overflow-hidden`}>
                {/* TODO: real photography per alt text */}
                <img
                  src={s.src}
                  alt={s.alt}
                  className="cine h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
