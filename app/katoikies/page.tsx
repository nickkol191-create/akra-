import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { ResidencesGrid } from "@/components/ResidencesGrid";
import { BackHomeLink } from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "Κατοικίες · ΑΚΡΑ",
  description:
    "Η συλλογή κατοικιών της ΑΚΡΑ κατά μήκος της ακτογραμμής της Βουλιαγμένης.",
};

export default function KatoikiesPage() {
  return (
    <>
      <main className="bg-ink">
        <section className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 sm:px-8 md:pb-32 md:pt-40">
          <BackHomeLink className="group mb-10 inline-flex items-center gap-2 font-display text-[0.7rem] uppercase tracking-[0.22em] text-stone transition-colors duration-300 hover:text-platinum">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &larr;
            </span>
            Αρχική
          </BackHomeLink>
          <p className="label text-amber-bright">
            Βουλιαγμένη · Αθηναϊκή Ριβιέρα
          </p>
          <h1 className="t-h2 mt-6 max-w-[16ch] font-display font-light text-platinum">
            Οι κατοικίες μας.
          </h1>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-stone md:text-lg">
            Μια μικρή, ιδιωτική συλλογή κατοικιών κατά μήκος της ακτογραμμής της
            Βουλιαγμένης. Επιλέξτε μία για να δείτε τις λεπτομέρειες.
          </p>

          <div className="mt-14 md:mt-20">
            <ResidencesGrid />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
