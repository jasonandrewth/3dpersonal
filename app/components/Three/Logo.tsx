import React, { useRef, useEffect, useState } from "react";
import { TextureLoader, VideoTexture, LinearEncoding } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Model(props: { tex: VideoTexture | undefined; scale: number }) {
  //@ts-ignore
  const { nodes, materials } = useGLTF("./logo.glb");
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
      {/* position={[0.182, 0, 0.029]} */}
      <group position={[0.182, 0, 0.029]}>
        <mesh
          castShadow
          geometry={nodes.Cylinder.geometry}
          //   material={materials["Material.001"]}
          position={[-0.277, 0, 0.035]}
          scale={[0.882, 0.099, 0.888]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Cylinder001.geometry}
          //   material={materials["Material.001"]}
          position={[0.345, 0, 0.844]}
          rotation={[0, -0.969, -Math.PI / 2]}
          scale={[-0.079, -0.164, -0.164]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Cylinder002.geometry}
          //   material={materials["Material.001"]}
          position={[0.248, 0, -0.824]}
          rotation={[0, 0.985, -Math.PI / 2]}
          scale={[-0.079, -0.164, -0.164]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Cylinder003.geometry}
          //   material={materials["Material.001"]}
          position={[-1.449, 0, -0.071]}
          rotation={[0, -0.03, -Math.PI / 2]}
          scale={[-0.079, -0.164, -0.164]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Sphere.geometry}
          //   material={materials["Material.001"]}
          position={[-2.06, 0, -0.029]}
          scale={[0.545, 0.331, 1]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Sphere001.geometry}
          //   material={materials["Material.001"]}
          position={[0.893, 0, 1.515]}
          rotation={[0, -0.985, 0]}
          scale={[0.545, 0.331, 1]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Sphere002.geometry}
          //   material={materials["Material.001"]}
          position={[0.852, 0, -1.541]}
          rotation={[Math.PI, -1.078, Math.PI]}
          scale={[0.617, 0.312, 1.13]}
        >
          <meshStandardMaterial
            // color={ballMaterial.color}
            // clearcoat={ballMaterial.clearcoat}
            // clearcoatRoughness={ballMaterial.cleacoatRoughness}
            roughness={0.1}
            metalness={0.8}
            //reflectivity={1}
            envMap={props.tex ?? envMap}
            map={props.tex ?? envMap}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/logo.glb");
