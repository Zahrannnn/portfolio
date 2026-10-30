import { useRef } from "react";
import { useLenis } from "lenis/react";

/*
  Gold hairline pinned to the top of the viewport; scaleX tracks Lenis
  scroll progress. Pure transform — no layout work per scroll event, and
  it moves only when the user moves, so it stays under reduced motion.
*/
const ScrollProgress = () => {
  const barRef = useRef(null);

  useLenis((lenis) => {
    if (!barRef.current || !lenis) return;
    const progress =
      typeof lenis.progress === "number"
        ? lenis.progress
        : lenis.limit > 0
          ? lenis.scroll / lenis.limit
          : 0;
    barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left scale-x-0 bg-[color:var(--color-gold)]"
    />
  );
};

export default ScrollProgress;
