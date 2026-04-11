import React, { Suspense, lazy, useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import Preloader from "./components/Preloader";
import NotFound from "./components/NotFound";
import FollowingCursor from "./components/FollowingCursor";
import SEO from "./components/SEO";

const HomeBelowHero = lazy(() => import("./sections/HomeBelowHero"));

const BelowFoldFallback = () => (
  <div
    className="min-h-[160vh] w-full bg-primary"
    aria-hidden
  />
);

const MainContent = ({ onHeroProgress }) => {
  return (
    <>
      <SEO pageKey="home" />
      <Navbar />
      <Hero onHeroProgress={onHeroProgress} />
      <Suspense fallback={<BelowFoldFallback />}>
        <HomeBelowHero />
      </Suspense>
    </>
  );
};

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [heroLoadProgress, setHeroLoadProgress] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);

  const heroReady = !isHome || heroLoadProgress === 100;
  const isReady = heroReady && introComplete;

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

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
      {!isReady && <Preloader onIntroComplete={handleIntroComplete} />}
      <FollowingCursor />
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Routes>
          <Route
            path="/"
            element={<MainContent onHeroProgress={setHeroLoadProgress} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ReactLenis>
  );
}

const App = () => (
  <Router>
    <AppShell />
  </Router>
);

export default App;
