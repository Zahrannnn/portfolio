import { useRef } from "react";
import { aiLoop, aiProof } from "../constants/aiFlow";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { EASE } from "../lib/motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import TextZoo from "../components/TextZoo";

// Dial geometry — a 100×100 viewBox, loop ring at r=38 (dash math depends on it).
const CX = 49;
const CY = 50;
const R = 38;
const CIRC = 2 * Math.PI * R;
const N = aiLoop.length;

const nodePos = (i, radius) => {
  const a = ((-90 + (360 / N) * i) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
};

/*
  AI-First — the loop dial.
  The five steps (Spec → Delegate → Review → Verify → Ship) scroll beside a
  dial: a gold arc sweeps node-to-node scrubbed by scroll, the brand star
  rides the arc tip, and the center readout swaps to the active step. On
  Ship the arc closes into a full circle — the loop literally closes.
  Sticky CSS, no pin (Works pins next); dash-offset + rotation are the only
  scrubbed properties. Reduced motion gets the closed loop, fully lit.
*/
const AIFlow = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const dialRef = useRef(null);
  const arcRef = useRef(null);
  const markerRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const nodesRef = useRef([]);
  const activeRef = useRef(0);

  const headerText = `Coding agents in the daily loop — held honest by
    discipline: specs before generation, every line reviewed,
    merges gated on test suites.`;

  const setActive = (i) => {
    if (i === activeRef.current) return;
    activeRef.current = i;
    const step = aiLoop[i];
    if (counterRef.current) {
      counterRef.current.textContent = String(i + 1).padStart(2, "0");
    }
    nodesRef.current.forEach((dot, idx) => {
      if (!dot) return;
      dot.setAttribute("fill", idx <= i ? "#cfa355" : "#ffffff");
      dot.setAttribute("stroke", idx <= i ? "#cfa355" : "rgba(12,12,11,0.3)");
    });
    if (nameRef.current) {
      gsap
        .timeline()
        .to(nameRef.current, {
          autoAlpha: 0,
          y: -14,
          duration: 0.16,
          ease: "power2.in",
        })
        .add(() => {
          nameRef.current.textContent = step.name;
        })
        .fromTo(
          nameRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.28, ease: "expo.out" }
        );
    }
  };

  useGSAP(
    (context, contextSafe) => {
      const section = sectionRef.current;
      const list = listRef.current;
      if (!section || !list) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Dial holds the viewport while the steps transit — pinSpacing:false
          // mimics CSS sticky (the grid column keeps its space). Real sticky is
          // impossible here: the Lenis root wrapper is an overflow-x container.
          ScrollTrigger.create({
            trigger: list,
            start: "top top",
            end: "bottom bottom",
            pin: dialRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The arc sweep + star rotation + active step, scrubbed by the
        // steps' transit through the viewport.
        gsap.fromTo(
          arcRef.current,
          { strokeDashoffset: CIRC },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.6,
              onUpdate: (self) => {
                setActive(
                  Math.min(N - 1, Math.max(0, Math.floor(self.progress * N)))
                );
              },
            },
          }
        );

        gsap.fromTo(
          markerRef.current,
          { rotation: 0 },
          {
            rotation: 360,
            ease: "none",
            svgOrigin: `${CX} ${CY}`,
            scrollTrigger: {
              trigger: list,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );

        // Step reveals as each block enters
        const stepsEls = gsap.utils.toArray(".flow-step", section);
        stepsEls.forEach((el) => {
          gsap.from(el.querySelectorAll(".step-reveal"), {
            autoAlpha: 0,
            y: 36,
            duration: 0.8,
            stagger: 0.08,
            ease: EASE.enter,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
        });

        // Magnetic badges — anchor stays stable, GSAP moves the inner badge
        const cleanups = [];
        section.querySelectorAll(".step-badge-anchor").forEach((anchor) => {
          const badge = anchor.querySelector(".step-badge");
          if (!badge) return;
          const xTo = gsap.quickTo(badge, "x", { duration: 0.5, ease: EASE.enter });
          const yTo = gsap.quickTo(badge, "y", { duration: 0.5, ease: EASE.enter });
          const onMove = contextSafe((e) => {
            const rect = anchor.getBoundingClientRect();
            xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
            yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
          });
          const onLeave = contextSafe(() => {
            xTo(0);
            yTo(0);
          });
          anchor.addEventListener("mousemove", onMove);
          anchor.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            anchor.removeEventListener("mousemove", onMove);
            anchor.removeEventListener("mouseleave", onLeave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // The loop, already closed: full arc, every node lit, readout settled.
        gsap.set(arcRef.current, { strokeDashoffset: 0 });
        gsap.set(markerRef.current, { rotation: 288, svgOrigin: `${CX} ${CY}` });
        activeRef.current = -1;
        setActive(N - 1);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="relative rounded-t-4xl bg-primary pb-24 pt-6 md:pb-32 md:pt-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(57,54,50,0.07),transparent_50%)]"
        aria-hidden
      />

      <AnimatedHeaderSection
        subTitle={"Agents do the typing, engineers do the thinking"}
        title={"AI-First"}
        text={headerText}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="relative px-10">
        <div className="mb-10 flex flex-col gap-4 border-b-2 border-black/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs font-light uppercase tracking-[0.45em] text-black/55">
            The working loop
          </p>
          <p className="text-right font-amiamie-round text-sm tracking-wide text-black/45">
            <span className="text-[color:var(--color-gold)]">
              {String(N).padStart(2, "0")}
            </span>
            <span className="mx-2 text-black/25">/</span>
            steps between intent and shipped
          </p>
        </div>
      </div>

      <div className="grid gap-8 px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        {/* The dial — pinned beside the steps on large screens, header ornament on small */}
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:h-screen lg:max-w-[520px] lg:flex lg:items-center">
          <div ref={dialRef} className="relative aspect-square w-full">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              aria-hidden
              role="presentation"
            >
              {/* Rail ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="rgba(12,12,11,0.12)"
                strokeWidth="0.6"
              />
              {/* The loop — gold arc, scrubbed by scroll */}
              <circle
                ref={arcRef}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="#cfa355"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                transform={`rotate(-90 ${CX} ${CY})`}
              />
              {/* Nodes + outward numbers */}
              {aiLoop.map((step, i) => {
                const dot = nodePos(i, R);
                const label = nodePos(i, R + 7.5);
                return (
                  <g key={step.id}>
                    <circle
                      ref={(el) => {
                        nodesRef.current[i] = el;
                      }}
                      cx={dot.x}
                      cy={dot.y}
                      r="1.7"
                      fill="#ffffff"
                      stroke="rgba(12,12,11,0.3)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="3.1"
                      fill="rgba(12,12,11,0.45)"
                      letterSpacing="0.06em"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
              {/* Star glyph riding the arc tip */}
              <g ref={markerRef}>
                <path
                  d={`M${CX} ${CY - R - 3.4}l1.35 3.9 3.9 1.35-3.9 1.35-1.35 3.9-1.35-3.9-3.9-1.35 3.9-1.35z`}
                  fill="#cfa355"
                />
              </g>
            </svg>

            {/* Center readout */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="font-amiamie-round text-xs tracking-[0.3em] text-black/40 tabular-nums">
                <span ref={counterRef}>01</span>
                <span className="mx-1.5 text-black/25">/</span>
                {String(N).padStart(2, "0")}
              </p>
              <h3
                ref={nameRef}
                className="mt-2 font-amiamie text-[clamp(1.5rem,2.6vw,2.4rem)] font-light tracking-tight text-black uppercase"
              >
                {aiLoop[0].name}
              </h3>
              <span
                aria-hidden
                className="mt-3 h-px w-10 bg-[color:var(--color-gold)]"
              />
            </div>
          </div>
        </div>

        {/* The steps — one loop transit each */}
        <div ref={listRef} className="flex flex-col">
          {aiLoop.map((step, i) => (
            <div
              key={step.id}
              className="flow-step relative flex min-h-[62vh] flex-col justify-center border-b border-black/10 py-14 last:border-b-0 lg:min-h-[88vh]"
            >
              <span
                aria-hidden
                className="text-outline-ink pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 select-none font-amiamie text-[9rem] leading-none lg:block"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 flex items-center gap-6 sm:gap-10">
                <div className="min-w-0 flex-1">
                  <h3 className="step-reveal font-amiamie text-[clamp(2.1rem,4vw,4.25rem)] font-light leading-[0.95] tracking-tight text-black uppercase">
                    {step.name}
                  </h3>
                  <p className="step-reveal mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/50">
                    <span
                      aria-hidden
                      className="h-px w-8 shrink-0 bg-[color:var(--color-gold)]"
                    />
                    <span>{step.tagline}</span>
                  </p>
                  <p className="step-reveal mt-4 max-w-[42ch] text-sm leading-relaxed font-light text-black/60">
                    {step.detail}
                  </p>
                </div>

                {/* <div className="step-badge-anchor relative z-10 shrink-0 self-start pt-2">
                  <div className="step-badge grid h-16 w-16 place-items-center rounded-full border border-black/10 bg-white/70 lg:h-28 lg:w-28">
                  
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </section>
  );
};

export default AIFlow;
