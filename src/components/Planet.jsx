/*
  Low-poly hero planet: keep materials/textures from the GLB,
  but render with cheap Sphere/Torus geometry instead of ~500k verts.
*/
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PLANET_URL = "/models/Planet.glb";

export function Planet({ lowDetail = false, ...props }) {
  const shapeContainer = useRef(null);
  const spheresContainer = useRef(null);
  const ringContainer = useRef(null);
  const { materials, nodes } = useGLTF(PLANET_URL);

  const mainSeg = lowDetail ? 24 : 48;
  const moonSeg = lowDetail ? 12 : 24;
  const ringSeg = lowDetail ? 48 : 96;

  // Drop unused high-poly buffers from the loaded GLTF so they never sit on the GPU.
  useEffect(() => {
    Object.values(nodes).forEach((node) => {
      if (node?.geometry) {
        node.geometry.dispose();
      }
    });
  }, [nodes]);

  useGSAP(
    () => {
      if (!shapeContainer.current) return;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline();
      tl.from(shapeContainer.current.position, {
        y: 5,
        duration: 2.4,
        ease: "power3.out",
      });
      tl.from(
        spheresContainer.current.rotation,
        {
          y: Math.PI,
          z: -Math.PI,
          duration: lowDetail ? 8 : 10,
          ease: "power1.inOut",
        },
        "-=40%"
      );
      tl.from(
        ringContainer.current.rotation,
        {
          x: 0.8,
          duration: lowDetail ? 8 : 10,
          ease: "power1.inOut",
        },
        "<"
      );
    },
    { dependencies: [lowDetail] }
  );

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={spheresContainer}>
        <mesh
          castShadow={!lowDetail}
          receiveShadow={!lowDetail}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        >
          <sphereGeometry args={[1, mainSeg, mainSeg]} />
        </mesh>
        <mesh
          castShadow={!lowDetail}
          receiveShadow={!lowDetail}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        >
          <sphereGeometry args={[1, moonSeg, moonSeg]} />
        </mesh>
      </group>
      <mesh
        ref={ringContainer}
        castShadow={!lowDetail}
        receiveShadow={!lowDetail}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      >
        <torusGeometry args={[0.95, 0.035, lowDetail ? 6 : 10, ringSeg]} />
      </mesh>
    </group>
  );
}

useGLTF.preload(PLANET_URL);
