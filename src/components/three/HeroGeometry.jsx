import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 5000;

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
    if (!pointsRef.current) return;
    
    // Rotación lenta constante, como una galaxia o red neuronal viva
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
    
    // Parallax muy sutil interactuando con el ratón
    pointsRef.current.rotation.x += (target.current.y * 0.15 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y += (target.current.x * 0.15 - pointsRef.current.rotation.y) * 0.02;
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
        size={0.015}
        color="#ffffff"
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
