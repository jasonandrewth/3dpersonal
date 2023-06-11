"use client";
import * as THREE from "three";

import { useUI } from "@/app/Context/store";
import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, PropsWithChildren, Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";

//Hooks
import useMedia from "@/app/utils/hooks/useMedia";

//Model
import { Model } from "./Object";
import Placeholder from "./Placeholder";

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Canvas
        className="h-screen w-screen"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 3, 6],
        }}
      >
        {children}
      </Canvas>
    </div>
  );
};

const Experience = () => {
  const cubeRef = useRef<MutableRefObject<THREE.Mesh>>();
  const modelRef = useRef<any>();
  const { displayModal, modalState, closeModal } = useUI();
  const isDesktop = useMedia();

  let rotation = 0;

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;

    rotation = modelRef.current!.rotation.y;
    rotation += delta * 0.25;

    if (!displayModal) {
      //@ts-ignore
      modelRef.current!.rotation.y = rotation;
    }

    //@ts-ignore
    state.camera.lookAt(modelRef.current!.position);

    // cubeRef.current.rotation.x += delta;
    // groupRef.current.rotation.y += delta * 0.125
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />

      <motion.group
        ref={modelRef}
        animate={{
          // rotateY: displayModal ? Math.PI * 0.25 : 0,
          z: displayModal ? 2 : 0,
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 50,
            stiffness: 500,
          },
        }}
      >
        <Suspense
          fallback={
            <Placeholder
              scale={new THREE.Vector3(3)}
              position={new THREE.Vector3(0)}
            />
          }
        >
          <Model scale={isDesktop ? 3 : 2} />
        </Suspense>
      </motion.group>
    </>
  );
};

export default Experience;
