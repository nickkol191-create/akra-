import Link from "next/link";
import { Monogram } from "./Monogram";

const NAV = [
  { label: "Κατοικίες", href: "/katoikies" },
  { label: "Η Ριβιέρα", href: "/#riviera" },
  { label: "Πώς εργαζόμαστε", href: "/#approach" },
  { label: "Ιδιωτικό Αίτημα", href: "/#enquiry" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="min-w-0 md:col-span-6">
            <div className="flex items-center gap-3">
              <Monogram className="h-6 w-7 text-amber" />
              <span className="font-display text-base font-medium tracking-[0.42em] text-platinum">
                AKRA
              </span>
            </div>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-stone">
              Παράκτιες κατοικίες στην Αθηναϊκή Ριβιέρα. Κατόπιν ραντεβού.
            </p>
          </div>

          <nav className="min-w-0 md:col-span-3">
            <p className="label !tracking-[0.2em] text-stone-dim">Πλοήγηση</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone transition-colors duration-300 hover:text-platinum"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 md:col-span-3">
            <p className="label !tracking-[0.2em] text-stone-dim">Γραφείο</p>
            <address className="mt-5 space-y-3 break-words text-sm not-italic leading-relaxed text-stone">
              <p>
                Απόλλωνος 8
                <br />
                Βουλιαγμένη 166 71
                <br />
                Αθήνα, Ελλάδα
              </p>
              <p>
                <a
                  href="mailto:enquiries@akraresidences.gr"
                  className="transition-colors duration-300 hover:text-platinum"
                >
                  enquiries@akraresidences.gr
                </a>
                <br />
                <a
                  href="tel:+302109674180"
                  className="transition-colors duration-300 hover:text-platinum"
                >
                  +30 210 967 4180
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-stone-dim">
            © 2026 AKRA Residences. Με την επιφύλαξη παντός δικαιώματος.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-stone-dim transition-colors duration-300 hover:text-stone"
            >
              Απόρρητο
            </a>
            <a
              href="#"
              className="text-xs text-stone-dim transition-colors duration-300 hover:text-stone"
            >
              Όροι
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
