import { Suspense, lazy } from "react";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Magnet from "../components/Animations/Magnet/Magnet";
import { Link } from "react-scroll";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const HeroCanvasFallback = () => (
  <div
    className="h-full w-full bg-primary bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(57,54,50,0.06),transparent_65%)]"
    aria-hidden
  />
);

const Hero = ({ onHeroProgress }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I craft scalable and efficient solutions
   that empower businesses to thrive
    in the digital landscape.`;
  return (
    <div className="">
      <section id="home" className="flex flex-col justify-end min-h-screen">
        <div className="flex flex-col justify-end min-h-screen ">
          <AnimatedHeaderSection
            subTitle={"404 No Bugs Found"}
            title={"ZAHRAN"}
            text={text}
            textColor={"text-black"}
          />
          <div className="self-end p-10 -mt-15">
            <Magnet padding={100} disabled={false} magnetStrength={5}>
              <Link
                to="work"
                spy={true}
                smooth={true}
                offset={-100}
                className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg font-semibold transition-transform hover:scale-105"
              >
                View My Work
              </Link>
            </Magnet>
          </div>
        </div>
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Suspense fallback={<HeroCanvasFallback />}>
            <HeroCanvas isMobile={isMobile} onLoadProgress={onHeroProgress} />
          </Suspense>
        </figure>
      </section>
    </div>
  );
};

export default Hero;
