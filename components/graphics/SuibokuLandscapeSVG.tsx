import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export default function SuibokuLandscapeSVG({ className, ...props }: SVGProps<SVGSVGElement>) {
    // Abstract mountain/mist landscape using SVG paths.
    // Very lightweight compared to WebGL, but provides a massive sense of scale.
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMax slice"
            className={cn("w-full h-full fill-current opacity-5 pointer-events-none", className)}
            {...props}
        >
            <defs>
                <linearGradient id="mistGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                </linearGradient>
            </defs>
            {/* Background Mist */}
            <path d="M0,800 L1440,800 L1440,400 Q1080,500 720,300 Q360,100 0,350 Z" fill="url(#mistGradient)" />

            {/* Distant Mountains */}
            <path d="M-100,800 L1540,800 L1540,500 Q1200,350 900,550 Q600,750 300,450 Q100,250 -100,400 Z" fill="currentColor" fillOpacity="0.4" />

            {/* Midground Mountains */}
            <path d="M-50,800 L1490,800 L1490,650 Q1100,500 850,700 Q550,900 250,600 Q50,450 -50,600 Z" fill="currentColor" fillOpacity="0.7" />

            {/* Foreground Silhouette (Abstract pine tree / cliff edge hint) */}
            <path d="M1100,800 L1440,800 L1440,550 Q1300,530 1250,580 Q1200,630 1150,600 Q1120,580 1100,800 Z" fill="currentColor" />
            <path d="M0,800 L300,800 L300,650 Q200,600 150,650 Q100,700 50,650 Q20,630 0,680 Z" fill="currentColor" />
        </svg>
    );
}
