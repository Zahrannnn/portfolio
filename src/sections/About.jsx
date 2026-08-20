import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollReveal from "../components/TextAnimations/ScrollReveal/ScrollReveal";
import RevealText from "../components/TextAnimations/RevealText";

const About = () => {
  const text = `Frontend engineer at RICOH Europe
    Crafting product UIs and agentic systems
    with TypeScript across the stack`;
  const aboutText = `I’m Mohamed Zahran, a frontend engineer at RICOH Europe (formerly Corelia).
    I focus on system design, marketplace architecture, and shipping polished React and Next.js interfaces.
    Day to day that means TypeScript, performance-minded UI, GSAP and Framer Motion when motion earns its place,
    and agentic tooling when it helps teams move faster.
    I’ve built multi-tenant CRMs, healthcare marketplaces, Arabic RTL storefronts, and client sites across Egypt and Europe.
    Let’s connect and build something that feels intentional.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.80,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 10%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />


      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        {/* <img
          ref={imgRef}
          src="images/man.jpg"
          alt="man"
          className="w-md rounded-3xl"
        /> */}
        <AnimatedTextLines text={aboutText} className={"w-full"} />
       
      </div>
    </section>
  );
};

export default About;
