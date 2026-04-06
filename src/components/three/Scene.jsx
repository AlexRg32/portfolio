import { Canvas } from '@react-three/fiber';
import HeroGeometry from './HeroGeometry';

export default function Scene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.15} color="#c8d7ff" />
        <directionalLight position={[8, 10, 6]} intensity={0.65} color="#cddcff" />
        <directionalLight position={[-8, -8, -6]} intensity={0.2} color="#5e7bb3" />
        <pointLight position={[0, 0, 6]} intensity={0.28} color="#7fb2ff" />

        <HeroGeometry />
      </Canvas>
    </div>
  );
}
