"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BrushTextReveal from '@/components/animations/BrushTextReveal';
import LogoMark from '@/components/ui/LogoMark';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [copied, setCopied] = useState(false);
    const email = "info@yaoyorozu.ltd";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        
        // Trigger mailto after a short delay to ensure copy is complete
        setTimeout(() => {
            window.location.href = `mailto:${email}`;
            setCopied(false);
        }, 1000);
    };

    useGSAP(() => {
        if (!mounted) return;

        // Header animations
        gsap.fromTo('.header-fade',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );

        // Center content entrance
        gsap.fromTo('.contact-content',
            { opacity: 0, y: 40, filter: 'blur(10px)' },
            { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)', 
                duration: 1.5, 
                ease: "power3.out",
                delay: 0.8
            }
        );

    }, { scope: containerRef, dependencies: [mounted] });

    if (!mounted) return <div className="min-h-screen bg-base-white" />;

    return (
        <div ref={containerRef} className="pt-48 pb-48 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col items-center font-noto-sans-jp">
            {/* Page Header */}
            <div className="flex flex-col items-center justify-center mb-24 relative w-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-5 pointer-events-none z-0">
                    <LogoMark variant="stacked-hero" className="aspect-square w-[100vw] md:w-[60vw]" />
                </div>
                <div className="relative z-10 w-full flex flex-col items-center justify-center">
                    <BrushTextReveal direction="horizontal" delay={0.2} duration={2}>
                        <h1 className="font-yuji text-[3rem] md:text-[5rem] tracking-[0.1em] text-base-black text-center">
                            お問い合わせ
                        </h1>
                    </BrushTextReveal>
                    <div className="w-16 h-[1px] bg-accent-gold mt-12 mb-8 header-fade opacity-0 translate-y-8"></div>
                    <p className="font-cinzel text-[13px] md:text-[15px] tracking-[0.5em] text-accent-gold header-fade opacity-0 translate-y-8 uppercase font-medium">
                        Contact
                    </p>
                </div>
            </div>

            <div className="contact-content w-full max-w-3xl flex flex-col items-center text-center">
                <p className="font-noto-sans-jp text-[16px] md:text-[18px] leading-[2.6] tracking-[0.12em] text-base-black/70 font-light mb-20 word-break-keep-all">
                    株式会社ヤオヨロズへのお問い合わせ、ご依頼、提携のご相談などは<br className="hidden md:block" />
                    下記メールアドレスにて承っております。
                </p>

                <div className="w-full flex flex-col items-center gap-12 py-16 border-y border-accent-gold/10">
                    <div className="flex flex-col items-center gap-6">
                        <span className="font-cinzel text-[14px] tracking-[0.4em] text-accent-gold uppercase font-semibold">Email Address</span>
                        <a 
                            href={`mailto:${email}`}
                            className="font-noto-sans-jp text-[1.1rem] md:text-[1.8rem] text-base-black hover:text-accent-gold transition-colors duration-500 tracking-[0.15em] font-light lowercase"
                        >
                            {email}
                        </a>
                    </div>

                    <button 
                        onClick={copyToClipboard}
                        className="group flex items-center gap-4 px-8 py-4 border border-base-black/10 hover:border-accent-gold rounded-full transition-all duration-500"
                    >
                        <span className="font-noto-sans-jp text-[14px] md:text-[15px] tracking-[0.1em] text-base-black group-hover:text-accent-gold">
                            {copied ? "コピーしました" : "メールアドレスをコピーして送信"}
                        </span>
                        {!copied && (
                            <svg className="w-4 h-4 text-base-black/40 group-hover:text-accent-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="mt-24">
                    <p className="font-noto-sans-jp text-[14px] md:text-[15px] leading-[2.8] tracking-[0.12em] text-base-black/40 font-light max-w-xl">
                        内容を確認次第、担当者より折り返しご連絡させていただきます。<br />
                        皆様からの貴重なご意見・ご相談を心よりお待ちしております。
                    </p>
                </div>
            </div>
        </div>
    );
}
