import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { EASE, prefersReducedMotion } from "../lib/motion";

export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (lineRefs.current.length > 0) {
        // House reveal: each line rises into view from its own overflow mask.
        gsap.from(lineRefs.current, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: EASE.enter,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <span
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className="block leading-relaxed tracking-wide text-pretty"
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
};
