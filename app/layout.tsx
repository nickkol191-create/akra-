import type { Metadata, Viewport } from "next";
import { Jura, Manrope } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/IntroProvider";
import { AmberCursor } from "@/components/AmberCursor";

const jura = Jura({
  subsets: ["greek", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jura",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["greek", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ΑΚΡΑ, Παράκτιες Κατοικίες στην Αθηναϊκή Ριβιέρα",
  description:
    "Η ΑΚΡΑ εκπροσωπεί μια μικρή, ιδιωτική συλλογή μοναδικών κατοικιών κατά μήκος της ακτογραμμής της Βουλιαγμένης, στην Αθηναϊκή Ριβιέρα.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // allow safe-area insets (iPhone notch) to be used
  themeColor: "#08090c", // browser chrome matches the dark theme on mobile
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="el"
      className={`${jura.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body
        className="grain vignette antialiased"
        suppressHydrationWarning
      >
        <IntroProvider>{children}</IntroProvider>
        <AmberCursor />
      </body>
    </html>
  );
}
