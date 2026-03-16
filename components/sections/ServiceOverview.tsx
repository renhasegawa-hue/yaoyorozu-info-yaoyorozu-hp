"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrushTextReveal from '@/components/animations/BrushTextReveal';
import RippleImage from '@/components/animations/RippleImage';
import InkBleedConnector from '@/components/graphics/InkBleedConnector';
import InkSplashSVG from '@/components/graphics/InkSplashSVG';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const dataElements = [
    "予約管理", "集客・広告", "問い合わせ対応", "レビュー管理",
    "清掃・客室管理", "バックオフィス", "スタッフ採用・育成", "リピーター施策"
];

const flowSteps = [
    { id: "01", title: "現場ヒアリング", desc: "経営者・スタッフ双方へのヒアリングを通じ、業務の実態と本質的な課題を特定します。" },
    { id: "02", title: "改善策の設計", desc: "課題をもとに、収益性・実現性を踏まえた具体的な改善プランをご提案します。" },
    { id: "03", title: "試験導入", desc: "小さく試して効果を確認。現場の声を反映しながら、システムの精度と信頼性を高めます。" },
    { id: "04", title: "導入・調整", desc: "旅館やホテルの規模・フローに合わせAIを最適化。現場の文化に馴染むまで徹底的に仕上げます。" },
    { id: "05", title: "定着・継続改善", desc: "導入後も現場に寄り寄り添い、状況の変化に合わせてシステムを自律的にアップデートします。" }
];

const saasProducts = [
    {
        id: "a",
        title: "忘れ物管理DX",
        desc: "日々発生する膨大な忘れ物をAI画像認識で自動登録。BPOと連携し、フロントの心理的・物理的負担を劇的に削減します。",
        image: "/images/services/image_forgotten.png"
    },
    {
        id: "b",
        title: "AIプランナー",
        desc: "データから宿泊プランを自動造成。OTAへの自動入稿までAIがサポートし、属人性を排除した安定経営を実現します。",
        image: "/images/services/image_planner.png"
    }
];

export default function ServiceOverview() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial Ink Burst
        gsap.fromTo('.ink-splash-main',
            { scale: 0, opacity: 0, rotation: -45 },
            { 
                scale: 1, 
                opacity: 0.08, 
                rotation: 0, 
                duration: 2.5, 
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.ink-splash-main',
                    start: 'top 80%',
                }
            }
        );

        // Parallax for ink splatters
        gsap.to('.ink-parallax', {
            y: (i, target) => -100 * (i + 1),
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.utils.toArray('.fade-up').forEach((el: any) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });
        
        gsap.fromTo('.circle-item',
            { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
            {
                opacity: 1, scale: 1, filter: 'blur(0px)',
                stagger: { each: 0.1, from: "random" },
                duration: 1.5, ease: 'power4.out',
                scrollTrigger: { trigger: '.circle-container', start: 'top 75%' }
            }
        );

        // Core data center entrance
        gsap.fromTo('.core-data',
            { opacity: 0, scale: 0 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 1.5, 
                ease: 'elastic.out(1, 0.75)',
                delay: 0.5,
                scrollTrigger: { trigger: '.circle-container', start: 'top 75%' }
            }
        );

        // Circular movement on mouse
        const container = containerRef.current;
        if (container) {
            const circleWrapper = container.querySelector('.circle-container');
            const handleMouseMove = (e: MouseEvent) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                gsap.to(circleWrapper, {
                    rotationY: x * 15,
                    rotationX: -y * 15,
                    duration: 1,
                    ease: 'power2.out'
                });
            };
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, { scope: containerRef });

    return (
        <section
            id="service"
            ref={containerRef}
            className="relative w-full min-h-screen bg-base-white py-32 md:py-48 overflow-hidden z-10 font-noto-sans-jp"
        >
            {/* Ink Splatter Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <InkSplashSVG 
                    variant={1} 
                    className="ink-splash-main absolute top-[10%] -left-[10%] w-[60%] h-auto text-base-black opacity-0" 
                />
                <InkSplashSVG 
                    variant={2} 
                    className="ink-parallax absolute top-[40%] -right-[5%] w-[40%] h-auto text-base-black opacity-[0.03]" 
                />
                <InkSplashSVG 
                    variant={1} 
                    className="ink-parallax absolute top-[70%] left-[5%] w-[30%] h-auto text-base-black opacity-[0.02]" 
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-20 flex flex-col items-center px-8 md:px-12">

                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-12 fade-up mb-16 md:mb-40">
                    <div className="w-full lg:w-5/12 flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-start pt-10 relative">
                        {/* Decorative Circle for Mobile/Desktop */}
                        <div className="absolute top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-4 w-12 h-12 rounded-full border border-accent-gold/20 flex items-center justify-center pointer-events-none mb-8 md:mb-0">
                            <div className="w-2 h-2 rounded-full bg-accent-gold/30"></div>
                        </div>
                        <BrushTextReveal direction="vertical" delay={0} scrollReset>
                            <h2 className="font-yuji text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] tracking-[0.2em] text-base-black/90 leading-[2.5] word-break-keep-all" style={{ writingMode: 'vertical-rl' }}>
                                旅行者データを核に、<br />AIが宿を変える。
                            </h2>
                        </BrushTextReveal>
                        <p className="font-noto-sans-jp text-[15px] md:text-[16px] leading-[2.8] tracking-[0.1em] text-base-black/80 font-light mt-0 md:mt-12 text-left w-full max-w-sm shrink-0 word-break-keep-all">
                            ヤオヨロズは旅行者体験に関するあらゆるデータ基盤を構築し、旅館やホテル、各施設の課題に対して精度の高いAIソリューションを設計・提供します。<br /><br />
                            現場に根ざしたデータこそが、私たちの価値の源泉です。
                        </p>
                    </div>

                    <div className="w-full lg:w-7/12 flex justify-center items-center relative py-10 lg:py-0">
                        <div className="circle-container-wrapper relative perspective-[2000px] w-full max-w-[500px] aspect-square flex items-center justify-center">
                            <div className="circle-container relative w-full h-full rounded-full flex items-center justify-center border-[0.5px] border-accent-gold/20 bg-base-white/30 backdrop-blur-[4px] preserve-3d">
                                <div className="core-data absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] bg-[#0d0d0d] text-[#FFFFFF] rounded-full flex flex-col items-center justify-center text-center z-30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/20 transform translate-z-[60px] px-4">
                                    <span className="font-cinzel text-[14px] md:text-[18px] tracking-[0.4em] mb-3 font-bold">YAOYOROZU</span>
                                    <div className="h-[1px] w-12 bg-white/20 mb-4"></div>
                                    <span className="font-klee text-[18px] md:text-[24px] tracking-[0.3em] leading-relaxed font-medium mb-2">コアデータ</span>
                                    <span className="font-noto-sans-jp text-[10px] md:text-[12px] tracking-[0.2em] font-light opacity-90 leading-relaxed max-w-[80%]">多様な旅行者インサイト</span>
                                </div>
                                {dataElements.map((item, idx) => {
                                    const angle = (idx / dataElements.length) * 2 * Math.PI - Math.PI / 2;
                                    return (
                                        <div key={idx} className="circle-item absolute w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center z-20" style={{ left: `${Math.cos(angle) * 45 + 50}%`, top: `${Math.sin(angle) * 45 + 50}%`, transform: 'translate(-50%, -50%) translateZ(40px)' }}>
                                            <div className="w-full h-full bg-base-white/95 rounded-full flex items-center justify-center text-center text-[12px] md:text-[15px] font-klee tracking-widest text-base-black/90 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-base-black/5 hover:border-accent-gold/50 hover:text-accent-gold group cursor-default transition-all duration-700">
                                                <span className="word-break-keep-all px-3">{item}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-32 fade-up text-center md:text-left border-b border-accent-gold/10 pb-12 relative flex flex-col md:flex-row items-baseline justify-between gap-8">
                    <div>
                        <span className="font-cinzel text-[1.1rem] tracking-[0.5em] text-accent-gold/60 mb-6 block uppercase">01. DX Solution</span>
                        <h3 className="font-yuji text-[2.5rem] md:text-[3.5rem] text-base-black tracking-[0.05em] leading-[1.3] word-break-keep-all">1. DXソリューション</h3>
                    </div>
                </div>

                <div className="w-full mb-48 fade-up flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-11/12">
                        <p className="font-noto-sans-jp text-[16px] md:text-[19px] leading-[3.0] tracking-[0.12em] text-base-black/80 font-light word-break-keep-all max-w-5xl">
                            「AIを活用したBPO（ビジネス・プロセス・アウトソーシング）サービス」を中心に、旅館やホテルの現場の定型業務をAIが肩代わりし、人が付加価値の高い業務に専念できる環境を構築します。<br /><br />
                            私たちは、テクノロジーを単なるツールとしてではなく、組織の在り方を根本から変革するパートナーとして提供します。
                        </p>
                    </div>
                    <div className="w-full lg:w-1/12 flex flex-col justify-center h-full self-stretch">
                         <div className="w-full h-[1px] bg-accent-gold/10 my-auto hidden lg:block"></div>
                    </div>
                </div>

                <div className="w-full mb-32 fade-up text-center relative">
                    <span className="font-cinzel text-accent-gold tracking-[0.5em] text-sm md:text-base mb-6 block uppercase">Flow / Step</span>
                    <h3 className="font-yuji text-[2rem] md:text-[3rem] text-base-black/60 tracking-[0.05em] leading-[1.3] word-break-keep-all">導入までの流れ</h3>
                </div>

                <div className="w-full flex justify-center mb-64 fade-up">
                    <div className="w-full max-w-4xl flex flex-col gap-12 relative">
                        <InkBleedConnector containerRef={containerRef} stepsCount={flowSteps.length} />
                        {flowSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-12 group transition-all duration-700 hover:translate-x-4">
                                <div className="mt-2 w-4 h-4 rounded-full bg-accent-gold shadow-[0_0_15px_rgba(184,143,12,0.4)] z-10"></div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-baseline gap-6">
                                        <span className="font-cinzel text-[1.4rem] text-accent-gold/40 italic">{step.id}</span>
                                        <h5 className="font-klee text-[1.4rem] md:text-[1.8rem] text-base-black tracking-widest font-medium word-break-keep-all">{step.title}</h5>
                                    </div>
                                    <p className="font-noto-sans-jp text-[15px] md:text-[16px] leading-[2.4] tracking-widest text-base-black/60 font-light max-w-2xl word-break-keep-all">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full mb-24 fade-up text-center md:text-left border-b border-accent-gold/10 pb-12 relative flex flex-col md:flex-row items-baseline justify-between gap-8">
                    <div>
                        <span className="font-cinzel text-[1.1rem] tracking-[0.5em] text-accent-gold/60 mb-6 block uppercase">AI SaaS Business</span>
                        <h3 className="font-yuji text-[2.5rem] md:text-[3.5rem] text-base-black tracking-[0.05em] leading-[1.3] word-break-keep-all">AI SaaS 事業</h3>
                    </div>
                </div>

                <div className="w-full grid md:grid-cols-2 gap-24 fade-up">
                    {saasProducts.map((product, idx) => (
                        <div key={idx} className="group flex flex-col gap-12 text-left">
                            <div className="relative aspect-square w-full max-w-[440px] mx-auto overflow-hidden rounded-full border border-accent-gold/10 shadow-2xl transition-all duration-1000 group-hover:scale-105 bg-base-white">
                                <RippleImage src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s]" />
                                <div className="absolute inset-0 bg-base-black/[0.1] group-hover:opacity-0 transition-opacity duration-1000"></div>
                                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-full"></div>
                                {/* Marumado Blur Edge Effect - Significantly softened for clarity */}
                                <div className="absolute inset-0 rounded-full shadow-[0_0_10px_5px_rgba(255,255,255,0.6)] z-10 pointer-events-none"></div>
                            </div>
                            <div className="flex flex-col gap-6 px-4">
                                <h4 className="font-klee text-[1.8rem] md:text-[2.2rem] tracking-widest text-base-black font-medium word-break-keep-all">{product.title}</h4>
                                <p className="font-noto-sans-jp text-[16px] md:text-[17px] leading-[2.6] tracking-widest text-base-black/75 font-light word-break-keep-all">{product.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
