"use client";

import { useEffect, useRef } from 'react';

interface Ripple {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    maxRadius: number;
    speed: number;
}

export default function MouseRipple() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let ripples: Ripple[] = [];
        let animationFrameId: number;

        let mouseX = 0;
        let mouseY = 0;
        let lastRippleTime = 0;
        const RIPPLE_INTERVAL = 100; // ms between dropping new ripples to avoid spam

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createRipple = (x: number, y: number) => {
            ripples.push({
                x,
                y,
                radius: 0,
                alpha: 0.15, // Max opacity of the ripple stroke
                maxRadius: Math.random() * 50 + 50, // 50px to 100px max
                speed: Math.random() * 1.5 + 0.5 // varied expanding speed
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const now = Date.now();
            if (now - lastRippleTime > RIPPLE_INTERVAL) {
                createRipple(mouseX, mouseY);
                lastRippleTime = now;
            }
        };

        const draw = () => {
            // Very slight fade of the canvas background to leave a subtle trail, 
            // but we clear it completely here to keep it clean.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw each ripple
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.alpha -= 0.002 * r.speed; // Fade out based on expansion speed

                if (r.alpha <= 0 || r.radius > r.maxRadius) {
                    // Remove dead ripples
                    ripples.splice(i, 1);
                    continue;
                }

                // Draw ripple stroke
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(184, 150, 12, ${r.alpha})`; // Accent Gold color
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Initialize
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        draw();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
}
