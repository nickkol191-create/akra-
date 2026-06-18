import { Reveal } from "./Reveal";
import { IMAGES } from "./images";

const PLACES = ["Καβούρι", "Λίμνη Βουλιαγμένης", "Ακρωτήρι Ζωστήρ", "Όρμος Αστέρα"];

export function Riviera() {
  return (
    <section
      id="riviera"
      className="relative flex min-h-[82vh] items-end overflow-hidden"
    >
      {/* TODO: real photography — the Vouliagmeni coastline at blue hour. */}
      <img
        src={IMAGES.riviera}
        alt="Η ακτογραμμή της Βουλιαγμένης με πεύκα και ασβεστόλιθο να συναντούν τα βαθιά νερά"
        className="cine absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="scrim-b absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 md:pb-24">
        <div className="max-w-[40rem]">
          <Reveal>
            <h2 className="t-h2 font-display font-light text-platinum">
              Μια ακτή που κρατά τη γαλήνη της.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-platinum/70 md:text-lg">
              Είκοσι χιλιόμετρα νότια της Αθήνας, η Βουλιαγμένη διπλώνει σε
              πεύκα, ασβεστόλιθο και βαθιά νερά· παραλίες που αδειάζουν με το
              σούρουπο.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              {PLACES.map((place, i) => (
                <div key={place} className="flex items-center gap-5">
                  {i > 0 && (
                    <span className="hidden h-3 w-px bg-line-strong sm:block" />
                  )}
                  <span className="font-display text-[0.78rem] uppercase tracking-[0.24em] text-stone">
                    {place}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
