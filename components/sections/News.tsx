"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import BrushTextReveal from '@/components/animations/BrushTextReveal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import { newsData } from '@/lib/news';

export default function News() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // News items fade in sequentially with high-end feel
        const items = gsap.utils.toArray('.news-item');

        gsap.fromTo(items,
            {
                opacity: 0,
                y: 40,
                filter: 'blur(10px)',
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            }
        );

        // Heading reveal
        gsap.fromTo('.news-heading',
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="w-full bg-base-white py-32 md:py-48 px-6 md:px-12 border-t border-accent-gold/10 relative overflow-hidden"
        >
            {/* Minimalist background mark */}
            <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none translate-x-1/4 -translate-y-1/4">
                <span className="font-action text-[30vw] leading-none text-base-black">NEWS</span>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 md:gap-32 relative z-10">

                {/* Left Side: Heading */}
                <div className="md:w-1/4 flex-shrink-0 news-heading">
                    <div className="sticky top-40">
                        <BrushTextReveal direction="horizontal" delay={0.2} duration={1.5}>
                            <h2 className="flex flex-col gap-4">
                                <span className="font-action text-6xl md:text-7xl tracking-widest text-base-black leading-none">
                                    NEWS
                                </span>
                                <span className="font-yuji text-[13px] md:text-[15px] tracking-[0.5em] text-accent-gold mt-2 uppercase font-medium">
                                    お知らせ
                                </span>
                            </h2>
                        </BrushTextReveal>
                        <div className="w-12 h-[1px] bg-accent-gold mt-12 hidden md:block opacity-40"></div>
                    </div>
                </div>

                {/* Right Side: News List */}
                <div className="md:w-3/4 flex-grow flex flex-col pt-4">
                    {newsData.map((item) => (
                        <Link
                            href={`/news/${item.id}`}
                            key={item.id}
                            className="news-item group block border-b border-accent-gold/10 py-10 md:py-12 hover:bg-base-black/[0.01] transition-all duration-700 relative"
                        >
                            {/* Hover accent line (Premium ink bleed style) */}
                            <div className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-accent-gold group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>

                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-2">
                                {/* Meta info */}
                                <div className="flex items-center gap-8 md:w-56 flex-shrink-0">
                                    <span className="font-cinzel text-[14px] md:text-[15px] tracking-widest text-base-black/40 font-medium whitespace-nowrap">
                                        {item.date}
                                    </span>
                                    <span className="font-noto-sans-jp text-[10px] tracking-[0.2em] border border-accent-gold/30 px-3 py-1 text-accent-gold/60 group-hover:bg-accent-gold group-hover:text-base-white transition-all duration-500 rounded-[1px] uppercase">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-noto-sans-jp text-[16px] md:text-[18px] tracking-[0.1em] leading-relaxed text-base-black/80 group-hover:text-base-black transition-colors duration-500 pr-12 flex-grow font-light">
                                    {item.title}
                                </h3>

                                {/* Arrow icon (Premium subtle entrance) */}
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-6 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-700">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-gold">
                                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}

                    <div className="mt-20 flex justify-end">
                        <Link href="/news" className="group flex items-center gap-6 text-base-black/40 hover:text-accent-gold transition-all duration-500">
                            <span className="font-cinzel text-[13px] tracking-[0.4em] uppercase">View All Insights</span>
                            <div className="relative w-12 h-[1px] bg-current overflow-hidden">
                                <div className="absolute inset-0 bg-accent-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700"></div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
