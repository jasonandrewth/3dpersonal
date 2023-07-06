import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

import { TextureLoader, VideoTexture, LinearEncoding } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Model(props: { tex: VideoTexture | undefined; scale: number }) {
  //@ts-ignore
  const { nodes, materials } = useGLTF("./logoUnite.glb");
  const teexture = useLoader(TextureLoader, "/images/ditto.png");
  const [texture, setTexture] = useState<VideoTexture | undefined>();
  const envMap = useLoader(TextureLoader, "./images/ditto.png");

  useFrame(() => {
    if (props.tex) {
      props.tex.needsUpdate = true;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Main.geometry}
        // material={materials["Material.001"]}
      >
        <meshStandardMaterial
          color={0xef4444}
          //   clearcoat={ballMaterial.clearcoat}
          //   clearcoatRoughness={ballMaterial.cleacoatRoughness}
          roughness={0.2}
          metalness={0.0}
          side={THREE.DoubleSide}
          //reflectivity={1}
          envMap={props.tex ?? envMap}
          envMapIntensity={0}
          //   map={props.tex ?? envMap}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./logoUnite.glb");
