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
  uniform float uScroll;
  varying vec2 vUv;

  // Simple pseudo-random function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) + 0.5;
    
    // Background color: Static Light Gray (F5F5F5)
    vec3 bgColor = vec3(0.96, 0.96, 0.96);
    
    // Ripple calculation (Samon)
    // We use a combination of distance from mouse and global flow
    float distToMouse = distance(aspectUv, uMouse);
    
    // Procedural Ripple Lines (Extremely thin)
    // Base flow lines
    float baseFlow = sin(aspectUv.y * 120.0 + uScroll * 2.0) * 0.5 + 0.5;
    
    // Concentric ripples around mouse
    float mouseRipples = sin(distToMouse * 100.0 - uTime * 2.0) * 0.5 + 0.5;
    
    // Blend ripples based on proximity to mouse
    float rippleStrength = smoothstep(0.4, 0.0, distToMouse);
    float finalRipples = mix(baseFlow, mouseRipples, rippleStrength);
    
    // Create sharp, thin lines (0.5px aesthetic)
    float lineThickness = 0.001; // Scale factor for "thin" lines
    float line = smoothstep(0.5 - lineThickness, 0.5, finalRipples) - smoothstep(0.5, 0.5 + lineThickness, finalRipples);
    
    // Line color: Keshikin Gold (#B8960C)
    vec3 goldColor = vec3(0.72, 0.59, 0.05); // #B8960C approx
    
    // Final color mix
    vec3 color = mix(bgColor, goldColor, line * 0.35); // Subtle opacity for lines
    
    // Subtle paper noise
    color -= hash(uv * 1000.0) * 0.015;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function KaresansuiShader() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const scrollY = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uScroll: { value: 0 }
  }), [size]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    
    const handleScroll = () => {
        scrollY.current = window.scrollY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(mouse.current, 0.08); // Smooth lerp
    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, scrollY.current, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function KaresansuiBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <KaresansuiShader />
      </Canvas>
    </div>
  );
}
