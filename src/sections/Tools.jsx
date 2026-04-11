import { useRef } from "react";
import { toolsData } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

gsap.registerPlugin(ScrollTrigger);

const Tools = () => {
  const sectionRef = useRef(null);
  const tools = toolsData;

  const headerText = `The same instruments used on production-grade
    builds — design, version control, motion,
    and intelligent assistance.`;

  useGSAP(
    () => {
      const rail = sectionRef.current?.querySelector("#tools-rail");
      if (!rail) return;

      gsap.from(".tool-row", {
        y: 56,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rail,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="relative min-h-screen overflow-hidden rounded-t-4xl bg-primary pb-24 pt-6 md:pb-32 md:pt-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(57,54,50,0.07),transparent_50%)]"
        aria-hidden
      />

      <AnimatedHeaderSection
        subTitle={"Build faster, ship cleaner"}
        title={"The Stack"}
        text={headerText}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="relative px-10">
        <div className="mb-10 flex flex-col gap-4 border-b-2 border-black/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs font-light uppercase tracking-[0.45em] text-black/55">
            Selected tooling
          </p>
          <p className="text-right font-amiamie-round text-sm tracking-wide text-black/45">
            <span className="text-[color:var(--color-gold)]">
              {String(tools.length).padStart(2, "0")}
            </span>
            <span className="mx-2 text-black/25">/</span>
            platforms in active rotation
          </p>
        </div>

        <div id="tools-rail" className="flex flex-col">
          {tools.map((tool, index) => (
            <div
              key={tool.id ?? tool.name}
              className="tool-row group relative flex min-h-[5.5rem] cursor-default items-center justify-between gap-6 border-b border-black/20 py-8 transition-colors duration-200 ease-out hover:bg-black/[0.04] md:min-h-[6.5rem] md:gap-10 md:py-10"
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-4 md:gap-10 lg:gap-14">
                <span className="shrink-0 font-amiamie-round text-[11px] tabular-nums tracking-[0.25em] text-black/35 transition-colors duration-200 group-hover:text-black/55 md:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 text-[clamp(1.75rem,5vw,3.25rem)] font-light leading-[1.05] tracking-tight text-black">
                  {tool.name}
                </h3>
              </div>

              <div className="shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/50 transition-transform duration-200 ease-out group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem]">
                  <img
                    src={tool.icon}
                    alt=""
                    className="h-8 w-8 object-contain md:h-10 md:w-10"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
