"use client";

import { useUI } from "@/app/Context/store";
import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, PropsWithChildren, Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";

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
  const { displayModal, modalState, closeModal } = useUI();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;

    //@ts-ignore
    state.camera.lookAt(cubeRef.current!.position);

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

      <motion.mesh
        //@ts-ignore
        ref={cubeRef}
        castShadow
        // rotation-y={Math.PI * 0.25}
        whileHover={{ rotateY: Math.PI * 0.25 }}
        animate={{
          rotateY: displayModal ? Math.PI * 0.25 : 0,
          z: displayModal ? 2 : 0,
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 50,
            stiffness: 500,
          },
        }}
      >
        <boxGeometry />
        <motion.meshStandardMaterial
          animate={{
            color: displayModal ? "green" : "red",
            transition: { duration: 4 },
          }}
        />
      </motion.mesh>
    </>
  );
};

export default Experience;
