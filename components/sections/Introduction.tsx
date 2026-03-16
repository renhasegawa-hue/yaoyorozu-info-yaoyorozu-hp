"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrushTextReveal from '@/components/animations/BrushTextReveal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Introduction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        gsap.fromTo(textRef.current,
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen py-32 px-8 flex flex-col justify-center items-center overflow-hidden"
        >
            {/* Background Video: Morning mist/steam (very subtle transparency) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-[0.1] mix-blend-multiply grayscale contrast-[1.2] brightness-110"
                    src="https://cdn.pixabay.com/video/2020/05/25/40149-425102713_tiny.mp4"
                />
                <div className="absolute inset-0 bg-sub-gray/80 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row-reverse items-center md:items-start justify-center gap-16 md:gap-32">

                {/* Main Heading (Vertical) */}
                <div className="flex-shrink-0 pt-16 md:pt-0">
                    <BrushTextReveal direction="vertical" delay={0.2} duration={1.5}>
                        <h2 className="font-yuji text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] tracking-[0.25em] leading-[2.5] flex flex-row-reverse gap-6 md:gap-12 min-h-[40vh] items-start word-break-keep-all">
                            <span style={{ writingMode: 'vertical-rl' }}>
                                <span className="text-accent-gold drop-shadow-sm" style={{ textOrientation: 'upright', letterSpacing: '0.2em' }}>
                                    A
                                </span>
                                <span className="text-accent-gold drop-shadow-sm" style={{ textOrientation: 'upright', letterSpacing: '0.2em' }}>
                                    I
                                </span>
                                <span className="pt-2">だけど、</span>
                            </span>
                            <span style={{ writingMode: 'vertical-rl' }} className="pt-[5vh] md:pt-[10vh]">
                                徹底した現場主義。
                            </span>
                        </h2>
                    </BrushTextReveal>
                </div>

                {/* Body Text (Horizontal) */}
                <div className="pt-8 md:pt-16 max-w-xl">
                    <p
                        ref={textRef}
                        className="font-noto-sans-jp text-base md:text-lg leading-loose tracking-wider text-base-black/80 font-light word-break-keep-all"
                    >
                        テクノロジーが進化しても、人の「心」に寄り添うホスピタリティは、AIには代替できません。
                        <br />
                        <br />
                        ヤオヨロズは、最新のAIソリューション・AI-BPOサービスで定型業務を自動化・効率化しながら、旅館やホテルの現場に泥臭く入り込み、事業にとことん寄り添う伴走型支援を提供します。経営者の目線と現場の目線、両方で課題を捉え、施設ごとにフィットした改善策を一気通貫でご提案します。
                        <br />
                        スタッフの方々が、本来の「おもてなし」に集中できる空間づくりを、共に実現します。
                    </p>
                </div>

            </div>
        </section>
    );
}
