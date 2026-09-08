import { useRef } from "react";
import { toolsData } from "../constants";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Tools = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const ghostRef = useRef(null);
  const counterRef = useRef(null);
  const progressFillRef = useRef(null);

  const tools = toolsData;

  const headerText = `The same instruments used on production-grade
    builds — design, version control, motion,
    and intelligent assistance.`;

  useGSAP(
    (context, contextSafe) => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const track = trackRef.current;
      const ghost = ghostRef.current;
      if (!section || !stage || !track) return;

      const panels = gsap.utils.toArray(".tool-panel", section);
      const mm = gsap.matchMedia();

      mm.add(
        {
          voyage: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          list: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { voyage, list } = ctx.conditions;
          const cleanups = [];

          if (voyage) {
            const travel = () => track.scrollWidth - window.innerWidth;
            const total = tools.length;

            // Live counter + progress rail
            const setProgress = gsap.quickSetter(progressFillRef.current, "scaleX");

            // Velocity skew — the track flexes with scroll speed (canonical proxy pattern)
            const proxy = { skew: 0 };
            const skewSetter = gsap.quickSetter(track, "skewX", "deg");
            const clampSkew = gsap.utils.clamp(-5, 5);

            const scrollTween = gsap.to(track, {
              x: () => -travel(),
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: () => "+=" + travel(),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  setProgress(self.progress);
                  if (counterRef.current) {
                    const index = Math.min(
                      total,
                      Math.max(1, Math.ceil(self.progress * total))
                    );
                    counterRef.current.textContent = String(index).padStart(2, "0");
                  }
                  const skew = clampSkew(self.getVelocity() / -400);
                  if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                      skew: 0,
                      duration: 0.8,
                      ease: "power3",
                      overwrite: true,
                      onUpdate: () => skewSetter(proxy.skew),
                    });
                  }
                },
              },
            });

            // Ghost word parallax — drifts slower than the track for depth
            gsap.fromTo(
              ghost,
              { xPercent: 0 },
              {
                xPercent: -35,
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top top",
                  end: () => "+=" + travel(),
                  scrub: 1,
                },
              }
            );

            panels.forEach((panel) => {
              // Name — masked char rise as the panel slides in
              const name = panel.querySelector(".tool-name");
              if (name) {
                SplitText.create(name, {
                  type: "chars",
                  mask: "chars",
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.chars, {
                      yPercent: 120,
                      duration: 0.55,
                      stagger: 0.035,
                      ease: "power3.out",
                      scrollTrigger: {
                        containerAnimation: scrollTween,
                        trigger: panel,
                        start: "left 85%",
                        once: true,
                      },
                    }),
                });
              }

              // Tagline
              const tagline = panel.querySelector(".tool-tagline");
              if (tagline) {
                gsap.from(tagline, {
                  autoAlpha: 0,
                  y: 24,
                  duration: 0.6,
                  ease: "power2.out",
                  scrollTrigger: {
                    containerAnimation: scrollTween,
                    trigger: panel,
                    start: "left 70%",
                    once: true,
                  },
                });
              }

              // Badge — elastic pop
              const badge = panel.querySelector(".tool-badge");
              if (badge) {
                gsap.from(badge, {
                  autoAlpha: 0,
                  scale: 0.6,
                  rotation: -30,
                  duration: 0.8,
                  ease: "back.out(1.6)",
                  scrollTrigger: {
                    containerAnimation: scrollTween,
                    trigger: panel,
                    start: "left 75%",
                    once: true,
                  },
                });
              }

              // Magnetic badge — anchor stays stable, GSAP moves the inner badge
              const anchor = panel.querySelector(".tool-badge-anchor");
              if (badge && anchor) {
                const xTo = gsap.quickTo(badge, "x", { duration: 0.5, ease: "power3" });
                const yTo = gsap.quickTo(badge, "y", { duration: 0.5, ease: "power3" });

                const onMove = contextSafe((e) => {
                  const rect = anchor.getBoundingClientRect();
                  const relX = e.clientX - (rect.left + rect.width / 2);
                  const relY = e.clientY - (rect.top + rect.height / 2);
                  xTo(relX * 0.35);
                  yTo(relY * 0.35);
                });
                const onEnter = contextSafe(() => {
                  gsap.to(badge, { scale: 1.06, duration: 0.3, ease: "power2.out" });
                });
                const onLeave = contextSafe(() => {
                  xTo(0);
                  yTo(0);
                  gsap.to(badge, { scale: 1, duration: 0.4, ease: "power2.out" });
                });

                panel.addEventListener("mousemove", onMove);
                panel.addEventListener("mouseenter", onEnter);
                panel.addEventListener("mouseleave", onLeave);
                cleanups.push(() => {
                  panel.removeEventListener("mousemove", onMove);
                  panel.removeEventListener("mouseenter", onEnter);
                  panel.removeEventListener("mouseleave", onLeave);
                });
              }
            });
          }

          if (list) {
            // Mobile — compact vertical list with batched reveals
            gsap.set(panels, { y: 48, autoAlpha: 0 });
            ScrollTrigger.batch(panels, {
              start: "top 88%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "power3.out",
                  overwrite: true,
                }),
            });
          }

          return () => cleanups.forEach((fn) => fn());
        }
      );

      // Split + pin measurements depend on final font metrics
      document.fonts?.ready.then(
        contextSafe(() => ScrollTrigger.refresh())
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="relative overflow-hidden rounded-t-4xl bg-primary pb-24 pt-6 md:pb-32 md:pt-10"
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
      </div>

      {/* Voyage stage — pinned on desktop, static/swipeable otherwise */}
      <div
        ref={stageRef}
        className="relative md:motion-safe:h-[100svh] md:motion-safe:overflow-hidden md:motion-reduce:overflow-x-auto"
      >
        <div
          ref={ghostRef}
          aria-hidden
          className="text-outline-ink pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap font-amiamie text-[24vw] uppercase leading-none opacity-70 md:block"
        >
          Stack
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden border-t border-dashed border-black/10 md:block"
        />

        <div
          ref={trackRef}
          className="flex w-full flex-col px-5 will-change-transform md:h-full md:w-max md:flex-row md:items-center md:px-0"
        >
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="tool-panel group relative flex w-full items-center gap-6 border-b border-black/10 py-7 md:h-full md:w-[clamp(30rem,42vw,46rem)] md:shrink-0 md:gap-10 md:border-b-0 md:py-0 md:pl-[4vw] md:pr-[3vw]"
            >
              <span
                aria-hidden
                className="text-outline-ink pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none font-amiamie text-[10rem] leading-none md:block lg:text-[12rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="shrink-0 font-amiamie-round text-xs tabular-nums tracking-[0.25em] text-black/35 md:hidden">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="tool-body relative z-10 min-w-0 flex-1">
                <h3 className="tool-name break-words font-amiamie text-[clamp(2rem,3.4vw,4.25rem)] font-light uppercase leading-[0.95] tracking-tight text-black">
                  {tool.name}
                </h3>
                <p className="tool-tagline mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/50">
                  <span
                    aria-hidden
                    className="h-px w-8 shrink-0 bg-[color:var(--color-gold)]"
                  />
                  <span>{tool.tagline}</span>
                </p>
              </div>

              <div className="tool-badge-anchor relative z-10 shrink-0">
                <div className="tool-badge grid h-16 w-16 place-items-center rounded-full border border-black/10 bg-white/70 md:h-32 md:w-32 lg:h-36 lg:w-36">
                  {tool.iconify ? (
                    <Icon
                      icon={tool.iconify}
                      aria-hidden
                      className="h-8 w-8 text-black/85 md:h-12 md:w-12 lg:h-14 lg:w-14"
                    />
                  ) : (
                    <img
                      src={tool.icon}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="h-8 w-8 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Outro — the fundamentals */}
          <div className="tool-panel relative flex w-full items-center border-b border-black/10 py-7 last:border-b-0 md:h-full md:w-[clamp(20rem,26vw,34rem)] md:shrink-0 md:border-b-0 md:py-0 md:pl-[4vw] md:pr-[5vw]">
            <div className="relative z-10 min-w-0 flex-1">
              <Icon
                icon="mdi:star-four-points"
                aria-hidden
                className="mb-6 h-8 w-8 text-[color:var(--color-gold)] md:mb-8"
              />
              <h3 className="tool-name break-words font-amiamie text-[clamp(1.75rem,3.2vw,3.5rem)] font-light uppercase leading-[0.95] tracking-tight text-black">
                HTML · CSS · JS
              </h3>
              <p className="tool-tagline mt-4 text-[11px] uppercase tracking-[0.28em] text-black/50">
                the fundamentals — always in rotation
              </p>
            </div>
          </div>
        </div>

        {/* Progress UI — desktop voyage only */}
        <div
          aria-hidden
          className="absolute inset-x-10 bottom-10 hidden items-center gap-5 md:flex"
        >
          <span
            ref={counterRef}
            className="font-amiamie-round text-sm tabular-nums tracking-[0.25em] text-black/70"
          >
            01
          </span>
          <span className="font-amiamie-round text-xs tracking-[0.25em] text-black/35">
            / {String(tools.length).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 bg-black/15">
            <div
              ref={progressFillRef}
              className="absolute inset-0 origin-left scale-x-0 bg-black/80"
            />
          </div>
          <Icon
            icon="mdi:star-four-points"
            className="h-4 w-4 text-[color:var(--color-gold)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Tools;
