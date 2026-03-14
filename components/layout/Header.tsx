"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Manage header background/text color state
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // If not home page, header is dark text unconditionally unless menu is open
        if (!isHomePage) {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Always dark text (black ink on white paper), unless mobile menu is open which might be dark.
    const isDarkText = !mobileMenuOpen;

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            scrolled ? "bg-base-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-8",
            isDarkText ? "text-base-black" : "text-base-white"
        )}>
            <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center">

                {/* Brand */}
                <Link href="/" className="group flex items-center gap-3 relative z-50">
                    <div className={cn(
                        "relative w-20 md:w-24 aspect-square transition-all duration-500",
                        isDarkText ? "opacity-100" : "opacity-90"
                    )}>
                        <LogoMark variant="stacked-hero" isDarkText={isDarkText} />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-12 font-cinzel text-sm tracking-[0.2em]">
                    {['VISION', 'SERVICE', 'COMPANY'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'SERVICE' ? '/#service' : `/${item.toLowerCase()}`}
                            className="relative overflow-hidden group word-break-keep-all"
                        >
                            <span className="relative z-10 transition-colors duration-300">
                                {item}
                            </span>
                            <span className={cn(
                                "absolute bottom-0 left-0 w-full h-[1px] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out",
                                isDarkText ? "bg-accent-gold" : "bg-base-white"
                            )}></span>
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={cn(
                            "px-6 py-2 border rounded-sm transition-all duration-300 hover:bg-base-white hover:text-base-black",
                            isDarkText ? "border-base-black hover:border-base-black" : "border-base-white"
                        )}
                    >
                        CONTACT
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        "md:hidden relative z-50 p-2 -mr-2 transition-colors duration-300",
                        mobileMenuOpen ? "text-base-white" : isDarkText ? "text-base-black" : "text-base-white"
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={cn(
                "fixed inset-0 bg-base-black/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col justify-center items-center",
                mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col items-center gap-10 font-cinzel text-xl tracking-widest text-base-white">
                    {['HOME', 'VISION', 'SERVICE', 'COMPANY', 'CONTACT'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className="relative group overflow-hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>

        </header>
    );
}

