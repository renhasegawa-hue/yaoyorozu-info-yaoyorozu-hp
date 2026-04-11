"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import BrushTextReveal from '@/components/animations/BrushTextReveal';
import InkSplashSVG from '@/components/graphics/InkSplashSVG';
import { Button } from '@/components/ui/Button';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Slow down the background video for a more serene, painting-like feel
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4;
        }

        const ctx = gsap.context(() => {
            // 1. Initial Massive Brush Splash Animation (The Impact)
            // A giant ink splash explodes in the center and fades to reveal the scene
            gsap.fromTo('.impact-splash',
                { scale: 0, opacity: 1, rotation: -20 },
                {
                    scale: 25, // Massive scale to cover the screen
                    opacity: 0,
                    rotation: 0,
                    duration: 2.5,
                    ease: "expo.out",
                    delay: 0.1
                }
            );

            // 2. Ambient Ink Splatters (Extremely subtle, 10-15% opacity, moving ink painting)
            gsap.fromTo('.ambient-ink',
                { scale: 1, opacity: 0, rotation: () => gsap.utils.random(-10, 10) },
                {
                    scale: () => gsap.utils.random(1.2, 2.0),
                    opacity: () => gsap.utils.random(0.05, 0.15), // Reduced further to prevent sinking
                    rotation: '+=5',
                    duration: 5,
                    ease: "power2.out",
                    stagger: 0.5,
                    delay: 1.5 // Start after initial slash
                }
            );

            // Parallax effect for the hero text
            const handleScroll = () => {
                const scrollY = window.scrollY;
                gsap.to('.hero-parallax', {
                    y: scrollY * 0.3,
                    duration: 0.5,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
                // Parallax for video to give it depth
                gsap.to('.landscape-parallax', {
                    y: scrollY * 0.15,
                    duration: 0.5,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-base-white"
        >
            {/* INITIAL IMPACT OVERLAY (The massive brush slash) */}
            <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none overflow-hidden">
                <InkSplashSVG variant={1} className="impact-splash w-full max-w-[800px] h-auto text-base-black" />
            </div>

            {/* Background Texture: Cinematic Video (Moving Ink Painting) */}
            <div className="absolute inset-0 z-0 landscape-parallax flex items-center justify-center pointer-events-none overflow-hidden">
                {/* 
                    This video acts as the "moving ink painting". 
                    Grayscale, high contrast, multiplied over white, and dialed down in opacity.
                */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-[0.25] mix-blend-multiply grayscale contrast-[1.5] brightness-125"
                    src="https://cdn.pixabay.com/video/2020/05/25/40149-425102713_tiny.mp4" // Placeholder for nature/bamboo/steam
                />
                <div className="absolute inset-0 bg-base-white/20 mix-blend-overlay"></div>
            </div>

            {/* Dynamic Ambient Ink Splatters (Moving Ink Painting feeling) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
                <InkSplashSVG variant={1} className="ambient-ink absolute top-[-5%] left-[5%] w-[800px] h-[800px] text-accent-indigo origin-center" />
                <InkSplashSVG variant={2} className="ambient-ink absolute bottom-[10%] right-[-10%] w-[1000px] h-[1000px] text-base-black origin-center" style={{ transform: 'scaleX(-1)' }} />
            </div>

            {/* TEXT PROTECTION MASK: Ensure legibility by heavily fading out the video/ink on the right side */}
            <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
                {/* Extremely Strong white gradient covering the right side (where vertical text is) */}
                <div className="w-[80%] md:w-[60%] h-full bg-gradient-to-l from-base-white via-base-white/80 to-transparent"></div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row-reverse items-center justify-center gap-16 md:gap-32 h-full pt-72 pb-48 md:py-0 hero-parallax">

                {/* Main Copy (Right side on PC, Top on Mobile) */}
                <div className="flex justify-center flex-shrink-0 relative">
                    <BrushTextReveal direction="vertical" delay={2.0} duration={2.5} kasure scrollReset>
                        {/* Text is rendered over the strong white gradient mask for perfect legibility */}
                        <h1 className="font-yuji text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] tracking-[0.2em] flex flex-row-reverse gap-6 md:gap-12 min-h-[50vh] items-start word-break-keep-all">
                            <span style={{ writingMode: 'vertical-rl' }} className="drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">おもてなしと</span>
                            <span style={{ writingMode: 'vertical-rl' }} className="pt-[5vh] md:pt-[10vh] drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                                決断以外を<span style={{ textOrientation: 'upright' }} className="text-accent-gold drop-shadow-[0_2px_15px_rgba(184,143,12,0.4)]">AI</span>で。
                            </span>
                        </h1>
                    </BrushTextReveal>
                </div>

                {/* Sub Copy and CTA (Left side on PC, Bottom on Mobile) */}
                <div className="flex flex-col items-center md:items-start md:mt-auto md:mb-32 gap-12 mt-16 md:mt-0 relative z-10">
                    <BrushTextReveal direction="horizontal" delay={2.5} duration={1.5} kasure scrollReset>
                        <p className="font-klee text-lg md:text-2xl tracking-[0.25em] text-base-black/90 font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] word-break-keep-all">
                            旅館・ホテルの現場を、AIでより良く。
                        </p>
                    </BrushTextReveal>

                    <div className="opacity-0 mb-8 md:mb-0" style={{ animation: 'fadeIn 1s ease-out 3.0s forwards' }}>
                        <Button variant="outline" className="bg-base-white/80 backdrop-blur-sm">
                            VIEW PROJECT
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-70">
                <span className="font-cinzel text-xs tracking-widest text-base-black opacity-40" style={{ writingMode: 'vertical-rl' }}>
                    SCROLL
                </span>
                <div className="w-[1px] h-16 bg-base-black/20 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-base-black animate-[scrolldown_2s_ease-in-out_infinite]" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
