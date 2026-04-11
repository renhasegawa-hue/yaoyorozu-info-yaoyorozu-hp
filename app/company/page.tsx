"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BrushTextReveal from '@/components/animations/BrushTextReveal';
import LogoMark from '@/components/ui/LogoMark';

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const members = [
    {
        id: "m1",
        name: "松林 太一",
        role: "代表取締役",
        image: "/images/members/松林太一ver2.png",
        bio: "京都大学工学部工業化学科卒。合同会社tempの代表。在学中に合同会社tempを創業し、オンライン英語塾やAIマッチングアプリを立ち上げ。法人向け生成AIカスタマイズ研修を提供。京都光華女子大学生成AI勉強会特別講師を兼任。"
    },
    {
        id: "m2",
        name: "三浦 康平",
        role: "営業統括",
        image: "/images/members/三浦康平.jpg",
        bio: "(株)OPTでWEBマーケティング及びツール制作、大手金融企業でマーケティング戦略担当。JHTAのデジタル人材育成専門委員会・AI利活用部会 委員長。"
    },
    {
        id: "m3",
        name: "中村 真也",
        role: "事業開発責任者",
        image: "/images/members/中村真也ver2.png",
        bio: "京都大学法学部卒。新卒で外資系コンサルファームに入社し、その後国内系コンサルファームにて、官公庁向けの戦略コンサルティングに従事。合同会社tempへCOOとして参画。生成AIを利用したペットイラストサービス「Pet is your...」をリリース。"
    },
    {
        id: "m4",
        name: "津本 海",
        role: "AI・技術責任者",
        image: "/images/members/津本海.webp",
        bio: "東京大学大学院数理科学研究科専攻卒業。スタートアップ支援、ベンチャー企業で新規事業立ち上げを経験。株式会社スニフアウトCEOとして30社以上に生成AIを導入。"
    },
    {
        id: "m5",
        name: "迫 裕太",
        role: "CPO",
        image: "/images/members/迫裕太.jpg",
        bio: "京都大学総合人間学部卒。株式会社LITALICOにて最年少部長として、教育・人材・医療・福祉等の複数プロダクト責任者を歴任。その後、株式会社ASPIAの事業責任者を務める。"
    }
];

export default function CompanyPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        if (!mounted) return;

        // 1. Initial Page Header Animation
        gsap.fromTo('.header-fade',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );

        // 2. Scroll Animation for matching sections
        const contentSections = gsap.utils.toArray('.company-section');
        contentSections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50, filter: 'blur(10px)' },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        });

        // 3. Member card staggered entrance
        gsap.fromTo('.member-card',
            { opacity: 0, scale: 0.9, y: 30 },
            {
                scrollTrigger: {
                    trigger: '.member-grid',
                    start: "top 80%",
                },
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            }
        );

    }, { scope: containerRef, dependencies: [mounted] });

    // Premium Interaction: Smooth zoom and ripple
    const handleMouseEnter = (index: number) => {
        gsap.to(`.member-img-${index}`, { scale: 1.15, duration: 1.2, ease: "power2.out" });
        gsap.fromTo(`.member-ripple-${index}`, 
            { scale: 0, opacity: 0.6 },
            { scale: 2, opacity: 0, duration: 1.5, ease: "power3.out" }
        );
    };

    const handleMouseLeave = (index: number) => {
        gsap.to(`.member-img-${index}`, { scale: 1.0, duration: 1.2, ease: "power2.inOut" });
    };

    if (!mounted) {
        return <div className="min-h-screen bg-base-white" />;
    }

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen overflow-x-hidden font-noto-sans-jp">
            {/* Page Header */}
            <div className="flex flex-col items-center justify-center mb-32 relative w-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-5 pointer-events-none z-0">
                    <LogoMark variant="stacked-hero" className="aspect-square w-[120vw] md:w-[70vw] max-w-none" />
                </div>
                <div className="relative z-10 w-full flex flex-col items-center justify-center">
                    <BrushTextReveal direction="horizontal" delay={0.2} duration={2}>
                        <h1 className="font-action text-[3.5rem] md:text-[6rem] tracking-[0.3em] text-base-black drop-shadow-sm text-center word-break-keep-all">
                            COMPANY
                        </h1>
                    </BrushTextReveal>
                    <div className="w-16 h-[1px] bg-accent-gold mt-12 mb-8 header-fade opacity-0 translate-y-8"></div>
                    <p className="font-cinzel text-[13px] md:text-[15px] tracking-[0.5em] text-accent-gold header-fade opacity-0 translate-y-8 uppercase">
                        Technology meets Tradition
                    </p>
                </div>
            </div>

            {/* Section: COMPANY PROFILE */}
            <div className="company-section mb-48 flex flex-col items-start lg:items-center text-left lg:text-center w-full">
                <div className="w-full max-w-5xl mx-auto">
                    <h2 className="font-yuji text-[2rem] md:text-[3.2rem] text-base-black tracking-[0.05em] leading-[1.6] mb-12 word-break-keep-all">
                        日本の「おもてなし」を、<br className="hidden sm:block" />
                        AIでより良く。
                    </h2>
                    <p className="font-noto-sans-jp text-[16px] md:text-[18px] leading-[2.6] tracking-[0.1em] text-base-black/70 font-light word-break-keep-all max-w-3xl mx-auto">
                        私たちは、最高峰の伝統と最先端の知性を融合させ、宿泊業界の新たなスタンダードを築きます。
                    </p>
                </div>

                <div className="w-full lg:w-full mt-24 bg-base-black/[0.01] border border-accent-gold/10 p-8 md:p-12 relative overflow-hidden backdrop-blur-[2px] max-w-6xl mx-auto">
                    {/* Background Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
                    
                    <dl className="relative z-10 space-y-0 text-[15px] md:text-[16px]">
                        {[
                            { label: "会社名", value: "株式会社ヤオヨロズ (YAOYOROZU Inc.)" },
                            { label: "代表者", value: "代表取締役 松林 太一" },
                            { label: "設立年月日", value: "2026年 3月" },
                            { label: "本社", value: "〒151-0063 東京都渋谷区富ヶ谷2-26-16-202" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-accent-gold/10 last:border-0 word-break-keep-all">
                                <dt className="w-full md:w-1/4 font-medium text-accent-gold tracking-[0.2em]">{item.label}</dt>
                                <dd className="w-full md:w-3/4 text-base-black/80 tracking-widest leading-relaxed">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Section: MEMBER */}
            <div className="company-section flex flex-col items-center">
                <div className="w-full mb-24 flex flex-col md:flex-row items-end justify-between border-b border-accent-gold/20 pb-12 gap-8">
                    <div className="flex flex-col gap-4">
                        <span className="font-cinzel text-accent-gold tracking-[0.4em] text-sm font-semibold uppercase">Leadership</span>
                        <h2 className="font-yuji text-[2.5rem] md:text-[3.2rem] text-base-black tracking-[0.05em] leading-[1.1]">
                            MEMBER
                        </h2>
                    </div>
                </div>

                <div className="member-grid flex flex-wrap justify-center gap-x-12 gap-y-24 w-full">
                    {members.map((member, index) => (
                        <div
                            key={member.id}
                            className="member-card flex flex-col items-center group cursor-default w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[380px]"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {/* Marumado (Circular Window) Photo Design */}
                            <div className="relative w-full aspect-square mb-12 flex items-center justify-center">
                                {/* Outer Ripple Frame */}
                                <div className="absolute inset-0 border border-accent-gold/10 rounded-full scale-[1.05] pointer-events-none group-hover:border-accent-gold/30 transition-colors duration-700"></div>
                                
                                <div className="relative w-full h-full rounded-full overflow-hidden border-[0.5px] border-accent-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className={`member-img-${index} absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[1.5s]`}
                                    />
                                    {/* M5 Pro Ripple Effect Layer */}
                                    <div className={`member-ripple-${index} absolute inset-0 bg-accent-gold rounded-full opacity-0 pointer-events-none z-10 filter blur-xl`}></div>
                                    
                                    {/* Soft blurring at edges to blend with Washi */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.4)] pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Member Description */}
                            <div className="w-full flex flex-col items-center text-center px-4">
                                <span className="font-cinzel text-[12px] md:text-[13px] text-accent-gold/70 tracking-[0.3em] font-semibold mb-3 uppercase">
                                    {member.role}
                                </span>
                                <h3 className="font-klee text-[1.6rem] md:text-[1.8rem] tracking-[0.2em] text-base-black mb-6 font-medium word-break-keep-all">
                                    {member.name}
                                </h3>
                                <div className="w-10 h-[1px] bg-accent-gold/30 mb-8 transition-all duration-700 group-hover:w-20 group-hover:bg-accent-gold"></div>
                                <p className="font-noto-sans-jp text-[14px] md:text-[15px] leading-[2.2] tracking-[0.1em] text-base-black/60 font-light text-left md:text-justify line-clamp-6 group-hover:line-clamp-none transition-all duration-700">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
