"use client";
import * as THREE from "three";
import { MathUtils } from "three";

import { useUI } from "@/app/Context/store";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, VideoTexture, LinearEncoding } from "three";
import {
  MutableRefObject,
  PropsWithChildren,
  Suspense,
  useRef,
  useState,
  useEffect,
} from "react";
// import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";

//Hooks
import useMedia from "@/app/utils/hooks/useMedia";

//Model
// import { Model as Object } from "./Object";
import { Model } from "./Logo";
import Placeholder from "./Placeholder";

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [texture, setTexture] = useState<VideoTexture | undefined>();

  // useEffect(() => {
  //   if (!videoRef.current) return;

  //   const initWebcam = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: false,
  //       });
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();

  //         const videoTexture = new VideoTexture(videoRef.current);
  //         videoTexture.encoding = LinearEncoding;
  //         setTexture(videoTexture);
  //       }
  //     } catch (error) {
  //       console.error("Error accessing webcam:", error);
  //     }
  //   };

  //   initWebcam();

  //   return () => {
  //     if (videoRef.current) {
  //       const stream = videoRef.current.srcObject as MediaStream;
  //       if (stream) {
  //         const tracks = stream.getTracks();
  //         tracks.forEach((track) => track.stop());
  //       }
  //     }
  //   };
  // }, []);

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
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <Experience tex={texture} />
      </Canvas>
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
};

const Experience = ({ tex }: { tex: VideoTexture | undefined }) => {
  const cubeRef = useRef<MutableRefObject<THREE.Mesh>>();
  const modelRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
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

    if (tex) {
      tex.needsUpdate = true;
    }

    modelRef.current.rotation.x = hovered
      ? MathUtils.lerp(modelRef.current.rotation.x, -Math.PI * 0.25, 0.025)
      : MathUtils.lerp(modelRef.current.rotation.x, 0, 0.025);

    //@ts-ignore
    state.camera.lookAt(modelRef.current!.position);

    // cubeRef.current.rotation.x += delta;
    // groupRef.current.rotation.y += delta * 0.125
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <directionalLight
        color={0xffcccc}
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.7} color={0xffffff} />

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
        onPointerDown={() => setHovered(true)}
        onPointerUp={() => setHovered(false)}
      >
        <Suspense
          fallback={
            <Placeholder
              scale={new THREE.Vector3(2)}
              position={new THREE.Vector3(0)}
            />
          }
        >
          <Model scale={isDesktop ? 1.5 : 0.9} tex={tex} />
        </Suspense>
      </motion.group>
    </>
  );
};

export default Experience;
