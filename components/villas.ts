const tall = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=680&h=1200&q=72`;
const wide = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&h=1120&q=78`;

type VillaInput = {
  slug: string;
  name: string;
  area: string;
  photoId: string;
  specs: { k: string; v: string }[];
  description: string;
};

export type Villa = VillaInput & { image: string; wide: string };

const RAW: VillaInput[] = [
  {
    slug: "villa-selene",
    name: "Villa Selene",
    area: "Καβούρι",
    photoId: "1613490493576-7fde63acd811",
    specs: [
      { k: "Υπνοδωμάτια", v: "Έξι" },
      { k: "Ακτή", v: "45μ ιδιωτική" },
      { k: "Εσωτερικοί χώροι", v: "720 τ.μ." },
    ],
    description:
      "Μια λευκή κατοικία πάνω από τον όρμο, με ιδιωτική πισίνα και θέα που αγκαλιάζει τον Σαρωνικό.",
  },
  {
    slug: "villa-thalassa",
    name: "Villa Thalassa",
    area: "Βουλιαγμένη",
    photoId: "1580587771525-78b9dba3b914",
    specs: [
      { k: "Υπνοδωμάτια", v: "Πέντε" },
      { k: "Ακτή", v: "38μ ιδιωτική" },
      { k: "Εσωτερικοί χώροι", v: "640 τ.μ." },
    ],
    description:
      "Γυάλινοι όγκοι ανοιχτοί στη θάλασσα, με εσωτερικούς κήπους και απευθείας πρόσβαση στο νερό.",
  },
  {
    slug: "villa-aura",
    name: "Villa Aura",
    area: "Λημανάκια",
    photoId: "1613977257363-707ba9348227",
    specs: [
      { k: "Υπνοδωμάτια", v: "Τέσσερα" },
      { k: "Θέση", v: "Βραχώδης ακτή" },
      { k: "Εσωτερικοί χώροι", v: "520 τ.μ." },
    ],
    description:
      "Σμιλεμένη στον βράχο, με εσωτερικά αίθρια και φως που αλλάζει όλη την ημέρα.",
  },
  {
    slug: "villa-galini",
    name: "Villa Galini",
    area: "Όρμος Αστέρα",
    photoId: "1602343168117-bb8ffe3e2e9f",
    specs: [
      { k: "Υπνοδωμάτια", v: "Έξι" },
      { k: "Ακτή", v: "52μ με προβλήτα" },
      { k: "Εσωτερικοί χώροι", v: "810 τ.μ." },
    ],
    description:
      "Διακριτική γαλήνη σε έναν κλειστό όρμο, με ιδιωτική προβλήτα και ελαιώνα.",
  },
  {
    slug: "villa-eos",
    name: "Villa Eos",
    area: "Ακρωτήρι Ζωστήρ",
    photoId: "1603995393909-9af9bb3e7617",
    specs: [
      { k: "Υπνοδωμάτια", v: "Επτά" },
      { k: "Προσανατολισμός", v: "Θάλασσα από τρεις πλευρές" },
      { k: "Εσωτερικοί χώροι", v: "900 τ.μ." },
    ],
    description:
      "Στην άκρη του ακρωτηρίου, με τη θάλασσα από τρεις πλευρές και φως που χρυσώνει το σούρουπο.",
  },
  {
    slug: "villa-meltemi",
    name: "Villa Meltemi",
    area: "Καβούρι",
    photoId: "1564540579594-0930edb6de43",
    specs: [
      { k: "Υπνοδωμάτια", v: "Πέντε" },
      { k: "Ακτή", v: "40μ ιδιωτική" },
      { k: "Εσωτερικοί χώροι", v: "600 τ.μ." },
    ],
    description:
      "Ανοιχτή στον βοριά, με σκιερές βεράντες, αμπέλι και θέα στον ανοιχτό ορίζοντα.",
  },
  {
    slug: "villa-nereida",
    name: "Villa Nereïda",
    area: "Βουλιαγμένη",
    photoId: "1570303349335-44d8488db678",
    specs: [
      { k: "Υπνοδωμάτια", v: "Πέντε" },
      { k: "Θέση", v: "Δίπλα στη λίμνη" },
      { k: "Εσωτερικοί χώροι", v: "580 τ.μ." },
    ],
    description:
      "Κοντά στη λίμνη της Βουλιαγμένης, με μαρμάρινα εσωτερικά και ιδιωτικό κήπο.",
  },
];

export const VILLAS: Villa[] = RAW.map((v) => ({
  ...v,
  image: tall(v.photoId),
  wide: wide(v.photoId),
}));

export const getVilla = (slug: string) => VILLAS.find((v) => v.slug === slug);
