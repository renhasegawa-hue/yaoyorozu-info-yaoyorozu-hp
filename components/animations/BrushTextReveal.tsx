"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface BrushTextRevealProps {
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical'; // vertical is top-to-bottom, horizontal is left-to-right
    delay?: number;
    duration?: number;
    className?: string;
    kasure?: boolean; // Whether to apply the dynamic brush texture (かすれ) effect
    scrollReset?: boolean; // If true, reset state when scrolling back up (disable once:true effect)
}

export default function BrushTextReveal({
    children,
    direction = 'vertical',
    delay = 0,
    duration = 1.5,
    className,
    kasure = false,
    scrollReset = false
}: BrushTextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        if (!container || !textElement) return;

        const ctx = gsap.context(() => {
            if (kasure) {
                // High-impact kasure (brush texture) effect using mask-image
                // We use a linear gradient with sharp stops to create a "wipe" effect,
                // but we add slight CSS blurring or just rely on the fast animation curve
                // to simulate a forceful brush stroke.

                // Simplified but impactful kasure simulation
                // We use standard clip-path for the sweep, but add a slight scale and opacity delay
                // to simulate ink sinking into the paper.
                const initialClipPath = direction === 'vertical'
                    ? 'inset(0 0 100% 0)'
                    : 'inset(0 100% 0 0)';
                const finalClipPath = 'inset(0 0 0% 0)';

                gsap.set(container, { clipPath: initialClipPath });
                gsap.set(textElement, { opacity: 0, scale: 0.98, filter: 'blur(2px)' });

                gsap.to(container, {
                    clipPath: finalClipPath,
                    duration: duration,
                    delay: delay,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                gsap.to(textElement, {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: duration * 0.8,
                    delay: delay + (duration * 0.2), // Sink in slightly after stroke starts
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

            } else {
                // Standard clean reveal using clip-path
                const initialClipPath = direction === 'vertical'
                    ? 'inset(0 0 100% 0)'
                    : 'inset(0 100% 0 0)';
                const finalClipPath = 'inset(0 0 0% 0)';

                gsap.set(container, { clipPath: initialClipPath });

                gsap.to(container, {
                    clipPath: finalClipPath,
                    duration: duration,
                    delay: delay,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [direction, delay, duration, kasure]);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden inline-block", className)}>
            <div ref={textRef}>
                {children}
            </div>
        </div>
    );
}
