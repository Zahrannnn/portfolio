import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `A collection of carefully crafted projects
    showcasing innovative solutions and
    creative excellence.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  // Scrolling without moving the mouse leaves a stale preview hanging — fade it out
  useEffect(() => {
    const hidePreview = () => {
      if (previewRef.current) {
        gsap.to(previewRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };
    window.addEventListener("scroll", hidePreview, { passive: true });
    return () => window.removeEventListener("scroll", hidePreview);
  }, []);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".work-project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#work-list",
        start: "top 85%",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    if (!projects[index]?.image) return; // nothing to preview
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section
      id="work"
      className="flex flex-col min-h-screen rounded-t-4xl bg-black pb-20"
    >
      <AnimatedHeaderSection
        subTitle={"Crafting Digital Experiences That Matter"}
        title={"Works"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div
        id="work-list"
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => {
          const hasLink = Boolean(project.href);
          const sharedClassName =
            "work-project relative flex flex-col gap-1 py-5 group text-inherit no-underline md:gap-0";
          const interactiveClassName = hasLink
            ? `${sharedClassName} cursor-pointer`
            : `${sharedClassName} cursor-default`;

          const body = (
            <>
              <div
                ref={(el) => {
                  overlayRefs.current[index] = el;
                }}
                className="absolute inset-0 hidden md:block duration-200 bg-white -z-10 clip-path"
              />

              <div className="flex justify-between px-10 text-white transition-all duration-500 md:group-hover:px-12 md:group-hover:text-black">
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  {project.name}
                </h2>
                {hasLink ? (
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="md:size-6 size-5"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="w-full h-0.5 bg-white/25" />
              <div className="flex flex-wrap overflow-hidden px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                {project.frameworks?.map((framework) => (
                  <p
                    key={framework.id}
                    className="text-white/60 transition-colors duration-500 md:group-hover:text-black"
                  >
                    {framework.name}
                  </p>
                ))}
              </div>
              {project.image ? (
                <div className="relative mx-6 mt-5 overflow-hidden rounded-xl border border-white/15 md:hidden">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="block h-auto max-h-[280px] w-full object-cover object-top"
                  />
                </div>
              ) : null}
            </>
          );

          if (hasLink) {
            return (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={interactiveClassName}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {body}
              </a>
            );
          }

          return (
            <div
              key={project.id}
              className={interactiveClassName}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {body}
            </div>
          );
        })}
        {/* desktop Floating preview image — fixed aspect so every preview is uniform */}
        <div
          ref={previewRef}
          id="work-preview"
          className="fixed -top-2/6 left-0 z-50 hidden aspect-[16/10] w-[560px] pointer-events-none overflow-hidden rounded-xl opacity-0 ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:block"
        >
          {currentIndex !== null && projects[currentIndex]?.image && (
            <img
              src={projects[currentIndex].image}
              alt=""
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
