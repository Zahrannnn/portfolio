import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { gsap, useGSAP } from "../lib/gsap";

const About = () => {
  const text = `Software engineer at RICOH Europe
    Building enterprise systems end to end
    from React front ends to .NET services`;
  const aboutText = `I’m Mohamed Zahran, a software engineer at RICOH Europe (formerly Corelia).
    I ship enterprise systems end to end: six production systems in parallel, from technical design through deployment and stabilization.
    That means React 19 and Next.js front ends, NestJS and ASP.NET Core services, PostgreSQL, MongoDB, and SQL Server underneath — with tested boundaries and performance-minded UI throughout.
    GSAP and Framer Motion when motion earns its place, and agentic tooling when it helps teams move faster.
    I’ve built multi-tenant CRMs, government healthcare portals, Arabic RTL storefronts, and AI pipelines running in production across Egypt and Europe.
    Let’s connect and build something that feels intentional.`;
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.8,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 10%",
        scrub: true,
      },
      ease: "power1.inOut",
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
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
