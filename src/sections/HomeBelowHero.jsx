import ServiceSummary from "./ServiceSummary";
import Services from "./Services";
import About from "./About";
import Tools from "./Tools";
import Works from "./Works";
import Contact from "./Contact";

/**
 * Lazy-loaded bundle: everything below the hero so the main chunk stays smaller
 * for faster first parse and earlier first paint.
 */
export default function HomeBelowHero() {
  return (
    <>
      <ServiceSummary />
      <Services />
      <About />
      <Tools />
      <Works />
      <Contact />
    </>
  );
}
