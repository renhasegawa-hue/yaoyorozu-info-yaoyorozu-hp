"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------------------------------
// Fragment Shader for Ink Bleed (墨のにじみエフェクト)
// - Uses noise to simulate the spreading of ink on washi paper.
// - Tuned for obvious, exaggerated gray spread based on user feedback.
// ----------------------------------------------------------------------------
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Classic Perlin 2D Noise 
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  vec2 uv = vUv;
  
  // Center coordinates [-1, 1]
  vec2 p = 2.0 * uv - 1.0;
  p.x *= uResolution.x / uResolution.y;

  // Animate the spread over time: faster and larger spread
  float spread = min(pow(uTime * 0.3, 0.8), 4.0);
  
  // Create an irregular circle using noise for bleeding edges - stronger noise
  float noiseVal = cnoise(p * 2.0 + uTime * 0.1);
  float radius = length(p) + noiseVal * 0.8;
  
  // Ink spreading logic: bolder edges
  float inkAlpha = smoothstep(spread, spread - 2.0, radius);
  
  // Apply "Washi paper" texture subtle noise
  float paperNoise = cnoise(uv * 100.0) * 0.02;
  
  // Colors
  vec3 baseWhite = vec3(1.0, 1.0, 1.0);
  vec3 inkColor = vec3(0.4, 0.4, 0.4); // Much darker gray for obvious visual impact
  
  // Mix paper base and ink
  vec3 finalColor = mix(baseWhite, inkColor, inkAlpha);
  finalColor -= paperNoise; // add slight paper texture
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function InkShaderMaterial() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const geometryRef = useRef<THREE.PlaneGeometry>(null);
    const { gl } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: {
                value: new THREE.Vector2(
                    typeof window !== 'undefined' ? window.innerWidth : 1,
                    typeof window !== 'undefined' ? window.innerHeight : 1
                )
            },
        }),
        []
    );

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Speed up the animation slightly
            materialRef.current.uniforms.uTime.value += delta * 2.5;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (uniforms.uResolution) {
                uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Explicit Cleanup to prevent memory leaks in tight environments
        return () => {
            window.removeEventListener('resize', handleResize);
            if (geometryRef.current) geometryRef.current.dispose();
            if (materialRef.current) materialRef.current.dispose();
            // Clear Three.js WebGL context to free memory aggressively if needed
            gl.dispose();
        };
    }, [uniforms, gl]);

    return (
        <mesh ref={meshRef}>
            <planeGeometry ref={geometryRef} args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
}

export default function InkBleedEffect() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
            <Canvas
                orthographic
                camera={{ position: [0, 0, 1], zoom: 1 }}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Limit device pixel ratio to save GPU memory
            >
                <InkShaderMaterial />
            </Canvas>
        </div>
    );
}
