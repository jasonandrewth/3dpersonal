import React, { useRef, useEffect, useState } from "react";
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
        material={materials["Material.001"]}
      >
        {/* <meshStandardMaterial
          color={0xcccccc}
          //   clearcoat={ballMaterial.clearcoat}
          //   clearcoatRoughness={ballMaterial.cleacoatRoughness}
          roughness={0.1}
          metalness={0.8}
          //reflectivity={1}
          //   envMap={props.tex ?? envMap}
          //   map={props.tex ?? envMap}
        /> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("./logoUnite.glb");
