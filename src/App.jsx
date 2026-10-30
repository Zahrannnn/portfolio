import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis, { useLenis } from "lenis/react";
import NotFound from "./components/NotFound";
import SEO from "./components/SEO";
import ScrollProgress from "./components/ScrollProgress";
import { gsap, ScrollTrigger } from "./lib/gsap";

const HomeBelowHero = lazy(() => import("./sections/HomeBelowHero"));

const BelowFoldFallback = () => (
  <div className="min-h-[160vh] w-full bg-primary" aria-hidden />
);

// One loop drives all scrolling: gsap.ticker ticks Lenis, Lenis scroll events
// update ScrollTrigger. Without this, Lenis rAF, the GSAP ticker and scrubbed
// ScrollTriggers each wake independently and scroll frames do double work.
const LenisScrollBridge = () => {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);
  return null;
};

const MainContent = () => {
  return (
    <>
      <SEO pageKey="home" />
      <Navbar />
      <Hero />
      <Suspense fallback={<BelowFoldFallback />}>
        <HomeBelowHero />
      </Suspense>
    </>
  );
};

function AppShell() {
  return (
    <ReactLenis
      root
      className="relative w-screen min-h-screen overflow-x-auto"
      options={{
        autoRaf: false,
        lerp: 0.07,
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.7,
        touchMultiplier: 2,
        syncTouch: false,
        syncTouchLerp: 0.075,
        touchInertiaMultiplier: 35,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      <LenisScrollBridge />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ReactLenis>
  );
}

const App = () => (
  <Router>
    <AppShell />
  </Router>
);

export default App;
