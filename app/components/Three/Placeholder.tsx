import * as THREE from "three";

interface PlaceholderProps {
  position?: THREE.Vector3;
  scale: THREE.Vector3;
}

export default function Placeholder({ position, scale }: PlaceholderProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color="red" />
    </mesh>
  );
}
