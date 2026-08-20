import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import NotFound from "./components/NotFound";
import SEO from "./components/SEO";

const HomeBelowHero = lazy(() => import("./sections/HomeBelowHero"));

const BelowFoldFallback = () => (
  <div className="min-h-[160vh] w-full bg-primary" aria-hidden />
);

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
