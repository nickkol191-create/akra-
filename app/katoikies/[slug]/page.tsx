import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { VILLAS, getVilla } from "@/components/villas";

export function generateStaticParams() {
  return VILLAS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVilla(slug);
  return {
    title: villa ? `${villa.name} · ΑΚΡΑ` : "ΑΚΡΑ",
    description: villa?.description,
  };
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) notFound();

  return (
    <>
      <main className="bg-ink">
        {/* full-bleed villa image */}
        <section className="relative flex min-h-[78vh] items-end overflow-hidden">
          <img
            src={villa.wide}
            alt={villa.name}
            className="cine absolute inset-0 h-full w-full object-cover"
          />
          <div className="scrim-b absolute inset-0" />
          <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 md:pb-20">
            <p className="font-display text-[0.72rem] uppercase tracking-[0.3em] text-amber-bright">
              {villa.area}
            </p>
            <h1 className="t-name mt-4 font-display font-light text-platinum">
              {villa.name}
            </h1>
          </div>
        </section>

        {/* details */}
        <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-16 md:py-28">
          <div className="md:col-span-7">
            <p className="max-w-[52ch] text-lg leading-relaxed text-stone md:text-xl">
              {villa.description}
            </p>
            <Link
              href="/#enquiry"
              className="mt-10 inline-flex bg-amber px-7 py-3.5 font-display text-[0.74rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-amber-bright"
            >
              Ιδιωτικό Αίτημα
            </Link>
          </div>

          <div className="md:col-span-5">
            <dl className="border-t border-line">
              {villa.specs.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between border-b border-line py-5"
                >
                  <dt className="font-display text-[0.72rem] uppercase tracking-[0.2em] text-stone-dim">
                    {s.k}
                  </dt>
                  <dd className="font-display text-lg font-light text-platinum">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8">
          <Link
            href="/katoikies"
            className="group inline-flex items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.22em] text-stone transition-colors duration-300 hover:text-platinum"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &larr;
            </span>
            Όλες οι κατοικίες
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
