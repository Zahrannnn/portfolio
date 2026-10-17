/*
	Installed from https://reactbits.dev/ts/tailwind/
	Perf-tuned: GSAP quickTo writes transforms directly (zero React re-renders
	per mousemove) and the anchor rect is cached instead of read every event.
*/

import { useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { gsap } from "../../../lib/gsap";
import { EASE } from "../../../lib/motion";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magnetRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    if (disabled) {
      gsap.to(inner, { x: 0, y: 0, duration: 0.5, ease: EASE.enter });
      return;
    }

    // The anchor never transforms, so its rect only goes stale on scroll/resize.
    let rect: DOMRect | null = null;
    const invalidateRect = () => {
      rect = null;
    };

    const xTo = gsap.quickTo(inner, "x", { duration: 0.4, ease: EASE.enter });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.4, ease: EASE.enter });

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const { left, top, width, height } = rect;
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        xTo((e.clientX - centerX) / magnetStrength);
        yTo((e.clientY - centerY) / magnetStrength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", invalidateRect, { passive: true });
    window.addEventListener("resize", invalidateRect);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", invalidateRect);
      window.removeEventListener("resize", invalidateRect);
    };
  }, [padding, disabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
