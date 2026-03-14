"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BrushTextReveal from '@/components/animations/BrushTextReveal';

interface PageHeaderProps {
    titleEn: string;
    titleJa: string;
}

export default function PageHeader({ titleEn, titleJa }: PageHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Simple line animation to accompany the text reveal
        if (lineRef.current) {
            gsap.fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, delay: 0.5, ease: 'power3.inOut', transformOrigin: 'left center' }
            );
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[50vh] bg-base-white pt-48 pb-24 px-8 md:px-12 flex flex-col justify-end items-center relative overflow-hidden"
        >
            <div className="max-w-7xl w-full flex flex-col items-center gap-6">
                <BrushTextReveal direction="horizontal" duration={1.5}>
                    <h1 className="font-cinzel text-5xl md:text-7xl tracking-[0.2em] text-base-black text-center">
                        {titleEn}
                    </h1>
                </BrushTextReveal>

                <div className="flex items-center gap-6 w-full max-w-md">
                    <div ref={lineRef} className="h-[1px] flex-grow bg-base-black/20"></div>
                    <BrushTextReveal direction="horizontal" delay={0.6} duration={1}>
                        <span className="font-yuji text-lg md:text-xl tracking-[0.4em] text-base-black/60 whitespace-nowrap px-4">
                            {titleJa}
                        </span>
                    </BrushTextReveal>
                    <div className="h-[1px] flex-grow bg-base-black/20" style={{ transform: 'scaleX(1)' }}></div>
                </div>
            </div>
        </section>
    );
}
