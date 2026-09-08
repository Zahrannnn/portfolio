import { useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { gsap, useGSAP } from "../lib/gsap";
import PdfWindow from "./PdfWindow";

const RING_C = 50.27; // circumference of r=8 circle

const ResumeCard = () => {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const iconDefaultRef = useRef(null);
  const ringWrapRef = useRef(null);
  const ringRef = useRef(null);
  const checkRef = useRef(null);
  const labelIdleRef = useRef(null);
  const labelSavedRef = useRef(null);
  const stateRef = useRef("idle");
  const motionOkRef = useRef(true);
  const [viewerOpen, setViewerOpen] = useState(false);

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      const tiltZone = tiltRef.current;
      const card = cardRef.current;
      if (!root || !tiltZone || !card) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          tilt: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { tilt, reduced } = ctx.conditions;
          motionOkRef.current = !reduced;

          if (tilt) {
            gsap.set(card, { transformPerspective: 800 });

            // Gentle idle float
            const floatTween = gsap.to(card, {
              y: -8,
              duration: 2.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });

            const rotXTo = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3" });
            const rotYTo = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3" });
            const sheenTo = gsap.quickTo(sheenRef.current, "xPercent", { duration: 0.6, ease: "power3" });
            const clampTilt = gsap.utils.clamp(-10, 10);

            const onMove = contextSafe((e) => {
              const r = card.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              rotYTo(clampTilt(px * 18));
              rotXTo(clampTilt(-py * 18));
              sheenTo(-150 + (px + 0.5) * 400);
            });
            const onLeave = contextSafe(() => {
              rotXTo(0);
              rotYTo(0);
              sheenTo(-150);
            });

            tiltZone.addEventListener("mousemove", onMove);
            tiltZone.addEventListener("mouseleave", onLeave);
            return () => {
              tiltZone.removeEventListener("mousemove", onMove);
              tiltZone.removeEventListener("mouseleave", onLeave);
              floatTween.kill();
            };
          }

          if (reduced) {
            gsap.set(card, { clearProps: "transform" });
          }
        }
      );
    },
    { scope: rootRef }
  );

  const handleClick = () => {
    if (stateRef.current !== "idle") return;
    stateRef.current = "downloading";

    const pill = rootRef.current?.querySelector(".resume-pill");

    if (!motionOkRef.current) {
      // Reduced motion: swap states instantly, revert later
      gsap.set([iconDefaultRef.current, labelIdleRef.current], { autoAlpha: 0 });
      gsap.set([ringWrapRef.current, labelSavedRef.current], { autoAlpha: 1 });
      gsap.set(checkRef.current, { scale: 1 });
      gsap.delayedCall(2.2, () => {
        gsap.set([iconDefaultRef.current, labelIdleRef.current], { autoAlpha: 1 });
        gsap.set([ringWrapRef.current, labelSavedRef.current], { autoAlpha: 0 });
        gsap.set(checkRef.current, { scale: 0 });
        stateRef.current = "idle";
      });
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          stateRef.current = "idle";
        },
      })
      .to(pill, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" })
      .to(iconDefaultRef.current, { autoAlpha: 0, scale: 0.4, duration: 0.2 }, "<")
      .to(labelIdleRef.current, { autoAlpha: 0, y: -8, duration: 0.2 }, "<")
      .to(ringWrapRef.current, { autoAlpha: 1, duration: 0.15 })
      .fromTo(
        ringRef.current,
        { strokeDashoffset: RING_C },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }
      )
      .to(checkRef.current, { scale: 1, duration: 0.35, ease: "back.out(2.5)" })
      .to(labelSavedRef.current, { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.1")
      .to({}, { duration: 2 }) // hold the "saved" state
      .to(checkRef.current, { scale: 0, duration: 0.2, ease: "power2.in" })
      .to(ringWrapRef.current, { autoAlpha: 0, duration: 0.2 }, "<")
      .to(iconDefaultRef.current, { autoAlpha: 1, scale: 1, duration: 0.25 }, "<0.05")
      .to(labelSavedRef.current, { autoAlpha: 0, y: 8, duration: 0.2 }, "<")
      .to(labelIdleRef.current, { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.05")
      .set(ringRef.current, { strokeDashoffset: RING_C });
  };

  return (
    <div ref={rootRef} className="flex w-[260px] flex-col items-center gap-7 sm:w-[300px]">
      {/* Tilt zone — click to open the preview window */}
      <div
        ref={tiltRef}
        role="button"
        tabIndex={0}
        aria-label="Preview resume PDF"
        onClick={() => setViewerOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setViewerOpen(true);
          }
        }}
        className="w-full cursor-pointer [perspective:900px] focus-visible:outline-none [&:focus-visible_.resume-card]:ring-2 [&:focus-visible_.resume-card]:ring-[color:var(--color-gold)]"
      >
        <div className="resume-card group relative w-full will-change-transform">
          {/* Preview hint */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-white/80 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
          >
            click to preview
          </span>
          <div
            ref={cardRef}
            className="relative aspect-[210/297] w-full rounded-xl bg-[#f7f7f2] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-white/10 [transform-style:preserve-3d]"
          >
            {/* Sheen layer */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div
                ref={sheenRef}
                aria-hidden
                className="absolute inset-y-[-20%] left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60"
              />
            </div>

            {/* Gold pin */}
            <div
              aria-hidden
              className="absolute -top-4 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-[color:var(--color-gold)] shadow-lg [transform:translateZ(30px)]"
            >
              <Icon icon="mdi:star-four-points" className="h-5 w-5 text-black" />
            </div>

            {/* Paper content */}
            <div className="flex h-full flex-col p-5 [transform:translateZ(18px)]">
              <h3 className="font-amiamie text-xl leading-tight text-black">
                M. ZAHRAN
              </h3>
              <p className="mt-1 text-[9px] uppercase tracking-[0.32em] text-black/50">
                Frontend Engineer
              </p>
              <div className="mt-3 h-px w-full bg-black/15" />

              {/* Skeleton text */}
              <div className="mt-4 flex flex-1 flex-col gap-2.5" aria-hidden>
                <div className="h-1.5 w-3/4 rounded-full bg-black/15" />
                <div className="h-1.5 w-full rounded-full bg-black/10" />
                <div className="h-1.5 w-5/6 rounded-full bg-black/10" />
                <div className="mt-4 h-1.5 w-1/2 rounded-full bg-[color:var(--color-gold)]/70" />
                <div className="h-1.5 w-full rounded-full bg-black/10" />
                <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
                <div className="mt-4 h-1.5 w-2/5 rounded-full bg-black/15" />
                <div className="h-1.5 w-4/5 rounded-full bg-black/10" />
              </div>

              {/* Footer strip */}
              <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
                <span className="text-[9px] uppercase tracking-[0.3em] text-black/50">
                  PDF · 1 page
                </span>
                <Icon icon="lucide:file-text" className="h-4 w-4 text-black/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ink-fill download button */}
      <a
        href="/resume.pdf"
        download="Mohamed-Zahran-Resume.pdf"
        onClick={handleClick}
        className="resume-pill group relative block w-full overflow-hidden rounded-full border border-white/25 px-6 py-3.5 text-center uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        aria-label="Download resume PDF"
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        />
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[11px] font-medium tracking-[0.28em] text-white transition-colors duration-300 group-hover:text-black motion-reduce:transition-none">
          <span className="relative grid h-4 w-4 place-items-center">
            <span ref={iconDefaultRef} className="absolute inset-0">
              <Icon icon="lucide:download" className="h-4 w-4" />
            </span>
            <span
              ref={ringWrapRef}
              aria-hidden
              className="absolute inset-0 grid place-items-center opacity-0"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  strokeWidth="2"
                  className="stroke-black/20"
                />
                <circle
                  ref={ringRef}
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C}
                  className="stroke-current"
                />
              </svg>
            </span>
            <span ref={checkRef} className="absolute inset-0 scale-0">
              <Icon icon="lucide:check" className="h-4 w-4" />
            </span>
          </span>
          <span className="relative inline-block">
            <span ref={labelIdleRef} className="block">
              Download CV
            </span>
            <span
              ref={labelSavedRef}
              aria-hidden
              className="absolute inset-0 translate-y-2 opacity-0"
            >
              Saved
            </span>
          </span>
        </span>
      </a>

      {/* macOS-style PDF viewer */}
      {viewerOpen && (
        <PdfWindow open onClose={() => setViewerOpen(false)} originRef={cardRef} />
      )}
    </div>
  );
};

export default ResumeCard;
