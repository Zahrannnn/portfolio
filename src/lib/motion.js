import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "./gsap";

/*
  The site's motion vocabulary — named once, referenced everywhere.
  GSAP tokens + their CSS counterparts (--ease-enter / --ease-hover in
  src/index.css) must stay perceptually identical.
*/
export const EASE = {
  enter: "expo.out", // entrances, reveals, quickTo settles
  hover: "power2.inOut", // back-and-forth hover rolls (TextZoo, burger)
  accent: "back.out(1.6)", // the one deliberate overshoot (Tools badge pop)
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Deck handoff: as a rounded sheet scrolls over a section, the covered section
  recedes — scales back toward its top edge and dims, like a card sinking
  under the next one. Scroll-locked (scrub) and fully reversible; transform +
  opacity only. Only safe on sections without pinned descendants or
  position:fixed children (transformed ancestors break both).
*/
export function createSectionRecede(
  coveredSelector,
  coveringSelector,
  { scale = 0.96, dim = 0.45, end = "top 15%" } = {}
) {
  if (prefersReducedMotion()) return;
  return gsap.fromTo(
    coveredSelector,
    { scale: 1, autoAlpha: 1 },
    {
      scale,
      autoAlpha: dim,
      transformOrigin: "50% 0%",
      ease: "none",
      scrollTrigger: {
        trigger: coveringSelector,
        start: "top bottom",
        end,
        scrub: true,
      },
    }
  );
}

/*
  Scroll-velocity reflex: shear an element by Lenis velocity (clamped) and
  let it settle back once scrolling stops. The page answers *how* you scroll,
  not just where you are. Transform-only; disabled under reduced motion.
*/
export function useVelocitySkew(ref, { max = 3, factor = 0.05 } = {}) {
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el || !lenis || prefersReducedMotion()) return;

    const skewTo = gsap.quickTo(el, "skewY", {
      duration: 0.6,
      ease: EASE.enter,
    });
    // Lenis stops emitting scroll events once settled — schedule the return
    // to zero so the shear never sticks on the last nonzero velocity.
    const settle = gsap.delayedCall(0.15, () => skewTo(0)).pause();

    const onScroll = () => {
      skewTo(gsap.utils.clamp(-max, max, lenis.velocity * factor));
      settle.restart(true);
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      settle.kill();
      gsap.set(el, { skewY: 0 });
    };
  }, [ref, lenis, max, factor]);
}
