"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface InkBleedConnectorProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    stepsCount: number;
}

export default function InkBleedConnector({ containerRef, stepsCount }: InkBleedConnectorProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const steps = containerRef.current.querySelectorAll('.flow-step');
        if (steps.length === 0) return;

        const path = svgRef.current.querySelector('.connector-path') as SVGPathElement;
        const brushTexture = svgRef.current.querySelector('.brush-texture') as SVGPathElement;
        
        if (!path || !brushTexture) return;

        // Create a custom path that follows the dots
        let d = "";
        const points: { x: number, y: number }[] = [];

        const updatePath = () => {
            const svgRect = svgRef.current!.getBoundingClientRect();
            d = "";
            points.length = 0;

            steps.forEach((step, i) => {
                const dot = step.querySelector('.step-dot');
                if (dot) {
                    const rect = dot.getBoundingClientRect();
                    const x = rect.left + rect.width / 2 - svgRect.left;
                    const y = rect.top + rect.height / 2 - svgRect.top;
                    points.push({ x, y });
                    
                    if (i === 0) d += `M ${x} ${y}`;
                    else {
                        // Add some organic "wobble" to the line
                        const prev = points[i-1];
                        const cp1y = prev.y + (y - prev.y) * 0.5;
                        d += ` C ${prev.x + (Math.random() * 4 - 2)} ${cp1y}, ${x + (Math.random() * 4 - 2)} ${cp1y}, ${x} ${y}`;
                    }
                }
            });

            path.setAttribute('d', d);
            brushTexture.setAttribute('d', d);

            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            brushTexture.style.strokeDasharray = `${length}`;
            brushTexture.style.strokeDashoffset = `${length}`;

            gsap.to([path, brushTexture], {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 1.5,
                }
            });
        };

        // Initial update and resize listener
        setTimeout(updatePath, 100);
        window.addEventListener('resize', updatePath);
        return () => window.removeEventListener('resize', updatePath);

    }, [containerRef, stepsCount]);

    return (
        <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ filter: 'url(#ink-blur)' }}
        >
            <defs>
                <filter id="ink-blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="ink" />
                    <feComposite in="SourceGraphic" in2="ink" operator="atop" />
                </filter>
            </defs>
            {/* The main solid line */}
            <path
                className="connector-path"
                fill="none"
                stroke="#B8960C"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeLinecap="round"
            />
            {/* The brush texture line (wider and more transparent) */}
            <path
                className="brush-texture"
                fill="none"
                stroke="#B8960C"
                strokeWidth="6"
                strokeOpacity="0.1"
                strokeLinecap="round"
                strokeDasharray="4,8"
            />
        </svg>
    );
}
