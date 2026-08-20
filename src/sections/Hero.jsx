import { Suspense, lazy, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Magnet from "../components/Animations/Magnet/Magnet";
import { Link } from "react-scroll";
import ModelSpinner from "../components/ModelSpinner";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [modelReady, setModelReady] = useState(false);
  const text = `Frontend engineer at RICOH Europe.
   Product UIs, marketplace systems,
    and agentic workflows in TypeScript.`;

  return (
    <div className="">
      <section id="home" className="relative flex flex-col justify-end min-h-screen">
        <div className="relative z-10 flex flex-col justify-end min-h-screen ">
          <AnimatedHeaderSection
            subTitle={"Building with craft and joy"}
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
        {!modelReady && (
          <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
            <ModelSpinner />
          </div>
        )}
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Suspense fallback={null}>
            <HeroCanvas
              isMobile={isMobile}
              onLoadComplete={() => setModelReady(true)}
            />
          </Suspense>
        </figure>
      </section>
    </div>
  );
};

export default Hero;
