import { Reveal } from "./Reveal";

const STEPS = [
  {
    title: "Διακριτική απόκτηση",
    body: "Τα περισσότερα ακίνητα φτάνουν σε εμάς πριν φτάσουν στην αγορά. Κάποια δεν φτάνουν ποτέ.",
  },
  {
    title: "Απόλυτη εχεμύθεια",
    body: "Χωρίς πινακίδες, χωρίς δημόσιες αγγελίες, χωρίς ονόματα. Εκπροσώπηση που προστατεύει τους ανθρώπους της.",
  },
  {
    title: "Μια ζωή, όχι μια συναλλαγή",
    body: "Μένουμε κοντά στις οικογένειες με τις οποίες συνεργαζόμαστε, πολύ μετά την παράδοση των κλειδιών.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="bg-ink-2 py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="t-h2 font-display font-light text-platinum md:sticky md:top-28">
              Πώς
              <br />
              εργαζόμαστε.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-line">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="grid grid-cols-1 gap-3 border-b border-line py-10 sm:grid-cols-[1fr_1.4fr] sm:gap-10 md:py-12">
                  <h3 className="font-display text-xl font-light text-platinum md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="max-w-[44ch] text-base leading-relaxed text-stone">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
