import Link from "next/link";
import { VILLAS } from "./villas";

export function ResidencesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {VILLAS.map((v) => (
        <Link key={v.slug} href={`/katoikies/${v.slug}`} className="group block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={v.image}
              alt={v.name}
              loading="lazy"
              className="cine h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.28em] text-amber-bright">
                {v.area}
              </p>
              <h3 className="mt-1 font-display text-2xl font-light text-platinum">
                {v.name}
              </h3>
            </div>
          </div>
          <span className="mt-4 inline-flex items-center gap-2 font-display text-[0.68rem] uppercase tracking-[0.22em] text-stone transition-colors duration-300 group-hover:text-amber-bright">
            Δείτε την κατοικία
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
