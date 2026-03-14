"use client";

import Link from 'next/link';
import LogoMark from '@/components/ui/LogoMark';
import FooterParticles from '@/components/graphics/FooterParticles';

const Footer = () => {
  return (
    <footer className="relative bg-[#0D0D0D] text-base-white py-24 md:py-32 overflow-hidden border-t border-accent-gold/10 group">
      {/* M5 Pro Optimized Interactive Particles */}
      <FooterParticles />

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-16 md:gap-8">
          
          {/* Left: LOGO and Catchphrase */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="w-48 md:w-64">
                <LogoMark variant="stacked-hero" isDarkText={false} />
            </div>
            <p className="font-klee text-[1rem] md:text-[1.2rem] tracking-[0.3em] text-accent-gold/80 word-break-keep-all text-center md:text-left">
                おもてなしと、決断以外はAIに。
            </p>
          </div>

          {/* Right: Company Name and Legal */}
          <div className="flex flex-col items-center md:items-end gap-10">
            <h2 className="font-yuji text-[1.8rem] md:text-[2.5rem] tracking-[0.1em] leading-none word-break-keep-all text-center md:text-right">
                株式会社ヤオヨロズ
            </h2>
            
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 font-cinzel text-xs tracking-[0.3em] text-base-white/40">
                <Link href="/vision" className="hover:text-accent-gold transition-colors duration-500">VISION</Link>
                <Link href="/#service" className="hover:text-accent-gold transition-colors duration-500">SERVICE</Link>
                <Link href="/company" className="hover:text-accent-gold transition-colors duration-500">COMPANY</Link>
                <Link href="/contact" className="hover:text-accent-gold transition-colors duration-500">CONTACT</Link>
            </nav>

            <div className="flex flex-col items-center md:items-end gap-2 mt-4">
                <p className="font-cinzel text-[10px] tracking-[0.2em] text-base-white/20 uppercase">
                    © 2026 YAOYOROZU Inc. All rights reserved.
                </p>
                <div className="w-12 h-[1px] bg-accent-gold/20"></div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
