import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { testimonials } from "../constants";
import { gsap, useGSAP } from "../lib/gsap";
import TextZoo from "../components/TextZoo";

const QuoteBand = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const lines = gsap.utils.toArray(".quote-line", section);

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
          small: "(max-width: 767px)",
        },
        (ctx) => {
          const { motion, small } = ctx.conditions;

          if (motion) {
            lines.forEach((line, i) => {
              const dir = i % 2 === 0 ? 1 : -1;
              const distance = small
                ? 4 + ((i * 5) % 6)
                : 10 + ((i * 7) % 22);
              gsap.fromTo(
                line,
                { xPercent: dir * distance, autoAlpha: 0.2 },
                {
                  xPercent: dir * -distance,
                  autoAlpha: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: line,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            });
          }
          // reduced motion: lines stay static and fully visible
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden rounded-t-4xl bg-primary px-10 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_115%,rgba(207,163,85,0.07),transparent_50%)]"
        aria-hidden
      />

      {/* Kicker */}
      <div className="mb-8 flex flex-col gap-4 border-b border-black/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="flex items-center gap-3 text-xs font-light uppercase tracking-[0.45em] text-black/55">
          <Icon
            icon="mdi:star-four-points"
            className="h-4 w-4 text-[color:var(--color-gold)]"
            aria-hidden
          />
          Trust, earned in production
        </p>
        <p className="font-amiamie-round text-sm tracking-wide text-black/45 sm:text-right">
          <span className="text-[color:var(--color-gold)]">
            {String(testimonials.length).padStart(2, "0")}
          </span>
          <span className="mx-2 text-black/25">/</span>
          quotes from real builds
        </p>
      </div>

      {/* Quote wall */}
      <div className="relative">
        {testimonials.map((t, i) => (
          <figure
            key={t.id}
            className={`quote-line py-5 md:py-6 ${
              i > 0 ? "border-t border-black/5" : ""
            }`}
          >
            <blockquote className="flex items-baseline justify-center gap-3 md:gap-5">
              <Icon
                icon="lucide:quote"
                aria-hidden
                className="h-4 w-4 shrink-0 translate-y-1 text-[color:var(--color-gold)] md:h-5 md:w-5"
              />
              <p className="font-amiamie text-[clamp(1.35rem,3.2vw,2.6rem)] font-light leading-snug text-black/90">
                {t.quote}
              </p>
            </blockquote>
            <figcaption className="mt-2.5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-black/45">
              <span aria-hidden className="h-px w-6 bg-[color:var(--color-gold)]/80" />
              <span>
                {t.author}
                <span className="mx-2 text-black/20">·</span>
                {t.href ? (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/55 transition-colors duration-300 hover:text-black"
                  >
                    <TextZoo text={t.project} />
                  </a>
                ) : (
                  t.project
                )}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Hand-off to contact */}
      <div className="mt-14 flex justify-center">
        <a
          href="#contact"
          className="group flex items-center gap-3 rounded-full border border-black/25 px-7 py-3 text-[11px] uppercase tracking-[0.3em] text-black/70 transition-all duration-300 hover:border-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        >
          Your project could be next
          <Icon
            icon="lucide:arrow-down"
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
};

export default QuoteBand;
