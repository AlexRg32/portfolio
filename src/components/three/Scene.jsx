import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import HeroGeometry from './HeroGeometry';

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Performance: limit pixel ratio on retina
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fafafa" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#555555" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <HeroGeometry />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
