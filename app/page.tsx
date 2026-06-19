import { HeroFan } from "@/components/HeroFan";
import { Intro } from "@/components/Intro";
import { Statement } from "@/components/Statement";
import { Riviera } from "@/components/Riviera";
import { Atmosphere } from "@/components/Atmosphere";
import { Approach } from "@/components/Approach";
import { Enquiry } from "@/components/Enquiry";
import { SiteFooter } from "@/components/SiteFooter";
import { DecoDivider } from "@/components/DecoDivider";

export default function Home() {
  return (
    <>
      <main>
        <HeroFan />
        <Intro />
        <Statement />
        <DecoDivider />
        <Riviera />
        <Atmosphere />
        <DecoDivider />
        <Approach />
        <Enquiry />
      </main>
      <SiteFooter />
    </>
  );
}
