"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    
    // Dynamic ink bleed simulation
    float ink = 0.0;
    for(float i = 0.0; i < 3.0; i++) {
      float t = uTime * (0.1 + i * 0.05);
      vec2 p = uv + vec2(sin(t + uv.y * 10.0), cos(t + uv.x * 10.0)) * 0.02;
      ink += smoothstep(0.4, 0.39, distance(p, uMouse) + sin(uTime * 0.5) * 0.05);
    }

    ink = clamp(ink, 0.0, 1.0);
    
    // Suiboku (Ink) color
    vec3 color = mix(vec3(1.0), vec3(0.05, 0.05, 0.05), ink * 0.15);
    
    // Add subtle paper texture noise
    color -= noise(uv * 1000.0) * 0.02;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function InkShader() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), [size]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(mouse.current, 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function InkBleedBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <InkShader />
      </Canvas>
    </div>
  );
}
