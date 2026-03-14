const fs = require('fs');

let content = fs.readFileSync('components/ui/LogoMark.tsx', 'utf8');

const matchStart = content.indexOf('<polygon');
const matchEnd = content.lastIndexOf('</svg>');
if (matchStart !== -1 && matchEnd !== -1) {
    const paths = content.substring(matchStart, matchEnd);

    const newContent = `import React from 'react';
import { cn } from '@/lib/utils';

export default function LogoMark({ className }: { className?: string }) {
    const paths = (
        <g>
            ${paths}
        </g>
    );

    return (
        <svg 
            className={cn("h-full w-auto aspect-[100/120]", className)}
            viewBox="0 0 100 120" 
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* A Shape */}
            <svg x="0" y="0" width="100" height="86" viewBox="0 0 100 86" overflow="hidden">
                {paths}
            </svg>

            {/* Text Shape */}
            <svg x="0" y="92" width="100" height="28" viewBox="115 10 245 75" overflow="hidden">
                {paths}
            </svg>
        </svg>
    );
}
`;
    fs.writeFileSync('components/ui/LogoMark.tsx', newContent);
    console.log("Updated LogoMark.tsx for square lockup.");
} else {
    console.log("Could not find paths");
}
