/**
 * Placeholder photography — verified-loading Unsplash images on the theme of
 * modern coastal villas, interiors and the Greek shoreline. They are held in a
 * consistent noir grade by the `.cine` filter so the page reads as one world.
 *
 * TO MAKE IT REAL: replace each id below with real AKRA brand photography of
 * the actual residences (ideally shot at dusk with warm interior light).
 */
const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Tall crop for the vertical triangular fan blades in the hero.
const tall = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=680&h=1200&q=72`;

export const IMAGES = {
  hero: u("1613490493576-7fde63acd811", 2400), // modern villa + pool above the sea
  riviera: u("1508240782898-53ee4351d612", 2400), // dramatic coastline + cliffs
  signature: u("1602343168117-bb8ffe3e2e9f", 1600), // portrait, modernist villa
  atmosphere: {
    wide1: u("1580587771525-78b9dba3b914", 1600), // white villa exterior
    tall1: u("1612196808214-b8e1d6145a8c", 1200), // marble / minimal interior
    tall2: u("1570303349335-44d8488db678", 1200), // coast + sea
    wide2: u("1564540579594-0930edb6de43", 1600), // interior, evening light
  },
  // 7 tall villa / coast crops for the hero fan blades.
  fan: [
    tall("1613490493576-7fde63acd811"), // villa + pool
    tall("1580587771525-78b9dba3b914"), // white villa
    tall("1613977257363-707ba9348227"), // villa exterior
    tall("1602343168117-bb8ffe3e2e9f"), // modernist villa (portrait)
    tall("1603995393909-9af9bb3e7617"), // villa by the sea
    tall("1564540579594-0930edb6de43"), // interior, evening light
    tall("1570303349335-44d8488db678"), // coast + sea
  ],
} as const;
