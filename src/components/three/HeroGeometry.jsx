import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1800;

function createSeededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function createParticlePositions(count, seed) {
  const random = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const r = 2 + random() * 2;
    const theta = random() * 2 * Math.PI;
    const phi = Math.acos(random() * 2 - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

const PARTICLE_POSITIONS = createParticlePositions(PARTICLE_COUNT, 42);

export default function HeroGeometry() {
  const pointsRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    const points = pointsRef.current;
    const elapsedTime = state.clock.elapsedTime;
    const breathe = Math.sin(elapsedTime * 0.45);

    const targetRotationX = Math.sin(elapsedTime * 0.22) * 0.04 + target.current.y * 0.08;
    const targetRotationY = elapsedTime * 0.05 + target.current.x * 0.09;
    const targetRotationZ = Math.cos(elapsedTime * 0.18) * 0.03;
    const targetPositionY = Math.sin(elapsedTime * 0.34) * 0.12;
    const targetPositionX = target.current.x * 0.08;
    const targetScale = 0.98 + breathe * 0.02;

    points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, targetRotationX, delta * 1.35);
    points.rotation.y = THREE.MathUtils.lerp(points.rotation.y, targetRotationY, delta * 0.95);
    points.rotation.z = THREE.MathUtils.lerp(points.rotation.z, targetRotationZ, delta * 1.1);
    points.position.x = THREE.MathUtils.lerp(points.position.x, targetPositionX, delta * 1.2);
    points.position.y = THREE.MathUtils.lerp(points.position.y, targetPositionY, delta * 1.15);

    const currentScale = points.scale.x || 1;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 1.25);
    points.scale.setScalar(nextScale);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_POSITIONS.length / 3}
          array={PARTICLE_POSITIONS}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Material premium aditivo: Los puntos se suman al solaparse creando brillo */}
      <pointsMaterial
        size={0.02}
        color="#9fc1ff"
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
