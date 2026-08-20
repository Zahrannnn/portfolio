import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useProgress,
  Environment,
  Float,
  Lightformer,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import { Planet } from "../components/Planet";

function LoadBridge({ onLoadComplete }) {
  const { progress, active } = useProgress();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (!active && progress >= 100) {
      done.current = true;
      onLoadComplete?.();
    } else if (progress >= 99) {
      done.current = true;
      onLoadComplete?.();
    }
  }, [progress, active, onLoadComplete]);

  return null;
}

export default function HeroCanvas({ isMobile, onLoadComplete }) {
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5);
  const canvasProps = useMemo(
    () => ({
      dpr,
      shadows: !isMobile,
      camera: { position: [0, 0, -10], fov: 17.5, near: 1, far: 20 },
      gl: {
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: true,
      },
      performance: { min: 0.5 },
    }),
    [dpr, isMobile]
  );

  return (
    <Canvas {...canvasProps}>
      <LoadBridge onLoadComplete={onLoadComplete} />
      <AdaptiveDpr pixelated={isMobile} />
      <AdaptiveEvents />
      <ambientLight intensity={isMobile ? 0.65 : 0.5} />
      <Float speed={isMobile ? 0.35 : 0.5} floatIntensity={isMobile ? 0.4 : 1}>
        <Planet scale={isMobile ? 0.7 : 1} lowDetail={isMobile} />
      </Float>
      {!isMobile ? (
        <Environment resolution={128}>
          <group rotation={[-Math.PI / 3, 4, 1]}>
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, 5, -9]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, 3, 1]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[-5, -1, -1]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[10, 1, 0]}
              scale={16}
            />
          </group>
        </Environment>
      ) : (
        <directionalLight position={[4, 6, -2]} intensity={1.1} />
      )}
      {!isMobile && (
        <PerformanceMonitor
          onIncline={() => setDpr(1.75)}
          onDecline={() => setDpr(1)}
        />
      )}
    </Canvas>
  );
}
