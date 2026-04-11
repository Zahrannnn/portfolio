import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onIntroComplete }) => {
  const comp = useRef(null);
  const markRef = useRef(null);
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const progressObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onIntroComplete?.();
        },
      });

      tl.fromTo(
        ".preloader-base-wash",
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "power2.out" }
      )
        .fromTo(
          ".preloader-vignette",
          { opacity: 0 },
          { opacity: 1, duration: 1.15, ease: "power2.out" },
          "<0.2"
        )
        .fromTo(
          ".preloader-grain",
          { opacity: 0 },
          { opacity: 0.38, duration: 0.9, ease: "none" },
          "<0.25"
        )
        .fromTo(
          ".preloader-inset",
          { opacity: 0, scale: 0.992 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
          "-=0.85"
        )
        .fromTo(
          ".preloader-stamp",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(
          ".preloader-bracket",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.75"
        )
        .fromTo(
          markRef.current,
          { scale: 0.5, rotate: -8, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 1.25, ease: "back.out(1.25)" },
          "-=0.7"
        )
        .fromTo(
          "#preloader-kicker",
          { opacity: 0, letterSpacing: "0.72em", filter: "blur(6px)" },
          {
            opacity: 1,
            letterSpacing: "0.38em",
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".preloader-rule",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.65"
        )
        .fromTo(
          "#preloader-title",
          { opacity: 0, yPercent: 28 },
          { opacity: 1, yPercent: 0, duration: 1.1, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(
          "#preloader-subtitle",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" },
          "-=0.45"
        )
        .to(
          progressObj,
          {
            value: 100,
            duration: 2.85,
            ease: "power1.inOut",
            onUpdate: () => setProgress(Math.round(progressObj.value)),
          },
          "-=0.55"
        )
        .fromTo(
          railRef.current,
          { scaleX: 0.06, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.95, ease: "power2.out" },
          "-=2.05"
        );
    }, comp);

    return () => ctx.revert();
  }, [onIntroComplete]);

  return (
    <div
      ref={comp}
      className="preloader-container fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {/* Base: warm near-black with vertical depth */}
      <div
        className="absolute inset-0 bg-[linear-gradient(165deg,#0a0908_0%,#060504_42%,#100e0c_100%)]"
        aria-hidden
      />
      <div
        className="preloader-base-wash pointer-events-none absolute inset-0 opacity-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(207,163,85,0.06) 0%, transparent 55%)",
        }}
      />

      <div
        className="preloader-vignette pointer-events-none absolute inset-0 opacity-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 78% 58% at 50% 38%, rgba(207,163,85,0.11) 0%, transparent 50%), radial-gradient(ellipse 100% 72% at 50% 108%, rgba(0,0,0,0.55) 0%, transparent 42%)",
        }}
      />

      <div
        className="preloader-grain pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E")`,
          backgroundSize: "112px 112px",
        }}
      />

      {/* Inset mat */}
      

      

      {/* Center column */}
      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,26rem)] flex-1 flex-col items-center justify-center px-8 md:max-w-[30rem] md:px-10">
        <p
          id="preloader-kicker"
          className="mb-6 text-center text-[10px] font-light uppercase tracking-[0.38em] text-white/[0.42] opacity-0 md:mb-7 md:text-[11px]"
        >
          Calibrating scene
        </p>

        <div
          ref={markRef}
          className="relative mb-9 flex h-[5.5rem] w-[5.5rem] items-center justify-center opacity-0 md:mb-10 md:h-[6.25rem] md:w-[6.25rem]"
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(207,163,85,0.07),transparent_62%)]"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--color-gold)]/[0.22]"
            style={{ animation: "preloader-orbit 10s linear infinite" }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-[5px] rounded-full border border-white/[0.05]"
            aria-hidden
          />
          <span
            className="relative select-none text-[2.35rem] font-light leading-none tracking-[-0.02em] text-white md:text-[2.75rem]"
            style={{
              textShadow:
                "0 0 40px rgba(207,163,85,0.12), 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            Z
          </span>
        </div>

        <div
          className="preloader-rule mx-auto mb-7 h-px w-[min(12rem,55vw)] origin-center bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/35 to-transparent opacity-0 md:mb-8"
          aria-hidden
        />

        <h1
          id="preloader-title"
          className="text-center text-[clamp(1.85rem,5.8vw,3.35rem)] font-light leading-[1.02] tracking-[-0.02em] text-white opacity-0 text-balance"
        >
          <span className="text-white/[0.92]">Full Stack</span>
          <span className="mt-1.5 block font-normal text-[color:var(--color-gold)]/[0.92]">
            Developer
          </span>
        </h1>

        <p
          id="preloader-subtitle"
          className="mt-5 max-w-[26ch] text-center text-[13px] font-light leading-[1.65] tracking-[0.02em] text-white/[0.42] opacity-0 text-pretty md:mt-6 md:text-[15px] md:leading-relaxed"
        >
          Orbit, shaders, and shipping — hold tight.
        </p>

        <div className="mt-12 flex w-full flex-col items-center md:mt-14">
          <div
            className="mb-4 flex w-full items-center gap-4 opacity-[0.9]"
            aria-hidden
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.08]" />
            <span className="font-amiamie-round text-[9px] uppercase tracking-[0.35em] text-white/25">
              Load
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.08]" />
          </div>
          <span className="font-amiamie-round text-[clamp(3.25rem,12vw,6.25rem)] font-light tabular-nums leading-none tracking-[-0.03em] text-white/[0.94]">
            {String(progress).padStart(2, "0")}
            <span className="align-top text-[0.38em] font-light text-[color:var(--color-gold)]/[0.88]">
              %
            </span>
          </span>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="relative z-10 mx-auto w-full max-w-md px-8 pb-9 md:max-w-lg md:px-12 md:pb-11">
        <div
          ref={railRef}
          className="origin-left opacity-0 will-change-transform"
          style={{ transform: "scaleX(0.06)" }}
        >
          <div className="mb-2.5 flex justify-between text-[9px] font-light uppercase tracking-[0.32em] text-white/[0.28] md:text-[10px] md:tracking-[0.38em]">
            <span>Signal</span>
            <span>Surface</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06] p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]">
            <div
              className="h-full min-h-[2px] rounded-full bg-gradient-to-r from-[#6b4822]/90 via-[color:var(--color-gold)] to-[#f0e6cc]"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 20px rgba(207,163,85,0.25)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes preloader-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
