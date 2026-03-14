"use client";

import React, { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Vector from mouse to current pixel
  vec2 dir = uv - uMouse;
  float dist = length(dir);
  
  // Create a gentle wave originating from the mouse, dampened by distance
  float strength = smoothstep(0.6, 0.0, dist) * uHover;
  
  // Sine wave distortion
  float wave = sin(dist * 40.0 - uTime * 3.0) * 0.015 * strength;
  
  // Apply distortion
  vec2 distortedUv = uv + dir * wave;
  
  // Sample texture
  vec4 color = texture2D(uTexture, distortedUv);
  
  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface RipplePlaneProps {
  imageUrl: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
}

function RipplePlane({ imageUrl, isHovered, mousePos }: RipplePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load texture with crossOrigin set to anonymous
  const texture = useLoader(THREE.TextureLoader, imageUrl, (loader) => {
    loader.crossOrigin = 'anonymous';
  });

  // Configure texture options
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0.0 },
    uTime: { value: 0.0 }
  }), [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uHover.value = THREE.MathUtils.lerp(
      material.uniforms.uHover.value,
      isHovered ? 1.0 : 0.0,
      0.05
    );
    material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, mousePos.x, 0.1);
    material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, mousePos.y, 0.1);
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

// Minimalist Error Boundary for R3F
class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface RippleImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function RippleImage({ src, alt = "Image", className = "" }: RippleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [useWebGLFallback, setUseWebGLFallback] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - ((e.clientY - rect.top) / rect.height);
    setMousePos({ x, y });
  };

  // Standard Image component for fallback
  const StandardImage = (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onLoad={() => console.log(`Fallback image loaded correctly: ${src}`)}
      onError={() => {
        console.error(`CRITICAL: Even the fallback image failed to load: ${src}`);
        setUseWebGLFallback(true);
      }}
    />
  );

  return (
    <div
      ref={containerRef}
      className={"relative overflow-hidden " + className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {useWebGLFallback ? (
        <div className="absolute inset-0 bg-base-black/10 flex items-center justify-center text-[10px] text-base-black/40">
          Image Load Error
        </div>
      ) : (
        <>
          {/* Base image layer to guarantee visibility always */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.5s ease' }}
          />
          <ErrorBoundary fallback={StandardImage}>
            <Suspense fallback={StandardImage}>
              <Canvas
                camera={{ position: [0, 0, 1] }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0,
                  zIndex: isHovered ? 1 : -1,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
                gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
              >
                {src ? <RipplePlane imageUrl={src} isHovered={isHovered} mousePos={mousePos} /> : null}
              </Canvas>
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
