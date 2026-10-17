import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { gsap, useGSAP } from "../lib/gsap";
import { EASE, prefersReducedMotion } from "../lib/motion";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
  // Above-the-fold usage (Hero): the title is the LCP element, so it must paint
  // in the first committed frame — entrance slides a short visible distance and
  // never hides the text. Below-fold sections get the house masked wipe.
  paintImmediately = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const clipRef = useRef(null);

  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    // Reduced motion: everything stays visible, no entrance.
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
          trigger: contextRef.current,
        }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: paintImmediately ? "10vh" : "12vh",
      duration: 1.1,
      ease: EASE.enter,
    });
    if (!paintImmediately) {
      // House reveal: the header block wipes up from a collapsed bottom edge.
      // The text is clipped, not hidden — no opacity games, DOM stays intact.
      tl.from(
        clipRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: EASE.enter,
        },
        0.1
      );
    }
  }, []);

  return (
    <div ref={contextRef}>
      <div
        ref={clipRef}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
