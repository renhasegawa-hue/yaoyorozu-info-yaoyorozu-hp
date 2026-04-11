"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeader from "@/components/layout/PageHeader";
import BrushTextReveal from '@/components/animations/BrushTextReveal';
import LogoMark from '@/components/ui/LogoMark';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function VisionPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Fade in text elements on scroll
        const fadeElements = gsap.utils.toArray('.fade-in-element');
        fadeElements.forEach((el: any) => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-base-white text-base-black pt-[104px] md:pt-[120px]">
            {/* Note: Padding top accounts for the fixed header height */}
            <PageHeader titleEn="VISION" titleJa="企業理念" />

            {/* Section A: PHILOSOPHY */}
            <section className="py-32 md:py-48 px-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.2em] mb-24 md:mb-32 text-base-black/40 fade-in-element">
                        PHILOSOPHY
                    </h2>

                    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-24 justify-center items-start h-[60vh] md:h-[50vh]">
                        <BrushTextReveal direction="vertical" delay={0.2} duration={2}>
                            <h3 className="font-yuji text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] tracking-[0.3em] leading-[2.5]" style={{ writingMode: 'vertical-rl' }}>
                                日本の誇りである<br />「おもてなし」を、
                            </h3>
                        </BrushTextReveal>
                        <BrushTextReveal direction="vertical" delay={0.8} duration={2}>
                            <h3 className="font-yuji text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] tracking-[0.3em] leading-[2.5] pt-0 md:pt-[10vh]" style={{ writingMode: 'vertical-rl' }}>
                                テクノロジーで<br />次代へ繋ぐ。
                            </h3>
                        </BrushTextReveal>
                    </div>

                    <div className="mt-32 max-w-2xl text-center fade-in-element w-full relative">
                        {/* Decorative background mark (Rakkan style hint) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 border border-accent-vermilion/20 rounded-sm -z-10 rotate-12"></div>

                        <p className="font-noto-sans-jp text-base md:text-lg tracking-widest leading-[2.5] text-base-black/80 font-light">
                            細やかな気配り、空間の設え、そしてゲストを想う心。<br className="hidden md:block" />
                            日本の宿泊業界が培ってきた「おもてなし」は、世界に誇るべき文化です。<br />
                            <br />
                            ヤオヨロズは、その文化を守り育てるため、<br className="hidden md:block" />
                            最先端のテクノロジーと人の力を融合させた現場の業務代行・事務サポートを提供します。<br />
                            ホテルや旅館のスタッフが、本来の「人対人」のサービスに全力を注げるよう、<br className="hidden md:block" />
                            あらゆる後方業務をAIの力で支え、不要な重荷を解き放ちます。
                        </p>
                    </div>
                </div>
            </section>

            {/* Section B: VISION */}
            <section className="py-32 md:py-48 px-8 bg-sub-gray">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.2em] mb-24 md:mb-32 text-base-black/40 fade-in-element">
                        VISION
                    </h2>

                    <div className="text-center mb-24">
                        <BrushTextReveal direction="horizontal" duration={1.5}>
                            <h3 className="font-klee text-[2rem] md:text-[3rem] tracking-[0.2em] text-center inline-block">
                                <span className="text-accent-indigo">「</span> おもてなしと決断以外 AIで <span className="text-accent-indigo">」</span>
                            </h3>
                        </BrushTextReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 fade-in-element">
                        <div className="flex flex-col gap-6 bg-base-white p-12 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-base-black/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                            <span className="font-cinzel text-sm tracking-widest text-base-black/40">PHASE 01</span>
                            <h4 className="font-noto-sans-jp font-medium text-xl tracking-wider">バックオフィス業務のAI化</h4>
                            <p className="font-noto-sans-jp text-sm md:text-base leading-loose tracking-widest text-base-black/70 font-light">
                                予約管理、問い合わせ対応、レベニューマネジメント、発注業務。これまで多大な時間を割かれていた事務作業などの裏方業務を、独自のAIシステムと専門の現場サポートチームによって完全に切り離します。
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 bg-base-white p-12 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-base-black/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                            <span className="font-cinzel text-sm tracking-widest text-base-black/40">PHASE 02</span>
                            <h4 className="font-noto-sans-jp font-medium text-xl tracking-wider">接客・清掃などの現場業務のAI化</h4>
                            <p className="font-noto-sans-jp text-sm md:text-base leading-loose tracking-widest text-base-black/70 font-light">
                                清掃管理、在庫管理、施設メンテナンス手配。お客様と向き合う接客の現場、おもてなしの最前線の業務においても、画像認識AIやIoTデバイスを駆使し、自動化・省力化を推進する仕組みを構築します。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section C: FUTURE */}
            <section className="py-32 md:py-48 px-8 relative overflow-hidden">
                {/* Minimalist background mark using logo outline */}
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-[-1]">
                    <LogoMark variant="stacked-hero" className="aspect-square w-[120vw] md:w-[80vw] max-w-none" />
                </div>

                <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
                    <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.2em] mb-24 md:mb-32 text-base-black/40 fade-in-element">
                        FUTURE
                    </h2>

                    <div className="flex flex-col items-center gap-16">
                        <div className="fade-in-element text-center">
                            <h3 className="font-yuji text-[2rem] md:text-[3.5rem] tracking-[0.2em] mb-8">
                                宿泊業の<span className="text-accent-indigo">「OS」</span>になる
                            </h3>
                            <div className="w-16 h-[1px] bg-base-black/30 mx-auto"></div>
                        </div>

                        <div className="max-w-2xl text-center fade-in-element">
                            <p className="font-noto-sans-jp text-base md:text-lg tracking-widest leading-[2.5] text-base-black/80 font-light">
                                私たちが見据える未来は、単なるサポートの枠を超えます。<br />
                                日本中の宿泊施設が、ヤオヨロズのプラットフォーム（OS）の上で稼働し、<br className="hidden md:block" />
                                データとAIの力で業界全体の生産性が飛躍的に向上する世界。<br />
                                <br />
                                ソフトウェアの領域から始まり、将来的にはフィジカルAI（ロボティクス）までを統合し、<br className="hidden md:block" />
                                宿泊施設のあらゆる「不」を解消するインフラへと進化し続けます。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
