import ServiceSummary from "./ServiceSummary";
import Services from "./Services";
import About from "./About";
import Tools from "./Tools";
import Works from "./Works";
import QuoteBand from "./QuoteBand";
import Contact from "./Contact";
import { useGSAP } from "../lib/gsap";
import { createSectionRecede } from "../lib/motion";

/**
 * Lazy-loaded bundle: everything below the hero so the main chunk stays smaller
 * for faster first parse and earlier first paint.
 */
export default function HomeBelowHero() {
  // Deck handoffs: as each rounded sheet arrives, the section it covers
  // recedes — scale + dim, scroll-locked. Only on boundaries whose covered
  // section has no pinned descendants (Tools pins) or fixed children (Works).
  useGSAP(() => {
    createSectionRecede("#summary", "#services");
    createSectionRecede("#testimonials", "#contact");
  });

  return (
    <>
      <ServiceSummary />
      <Services />
      <About />
      <Tools />
      <Works />
      <QuoteBand />
      <Contact />
    </>
  );
}
