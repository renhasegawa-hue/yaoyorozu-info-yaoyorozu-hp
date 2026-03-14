"use client";

import { useEffect, useState } from 'react';

export default function WashiTexture() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.35] mix-blend-multiply">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <filter id="washi-noise" x="0" y="0" width="100%" height="100%">
                    {/* 
                      feTurbulence creates the base cloud/noise pattern.
                      baseFrequency controls how fine/coarse the fibers look.
                      numOctaves adds detail (more is heavier on CPU, 3 is a good balance for Washi).
                    */}
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04"
                        numOctaves="3"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    {/* 
                      feColorMatrix converts the colorful noise into a black/white alpha mask,
                      softening it to look like gentle paper fibers rather than harsh static.
                    */}
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0
                                1 0 0 0 0
                                1 0 0 0 0
                                0 0 0 0.15 0"
                        in="noise"
                        result="coloredNoise"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#washi-noise)" />
            </svg>
        </div>
    );
}
