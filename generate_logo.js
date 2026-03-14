const fs = require('fs');

const svgContent = fs.readFileSync('/Users/fujitakazuya/Downloads/logo_c.svg', 'utf-8');

// Extract viewBox
const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 366.1 85.29";

// Extract inner parts
let innerHtml = svgContent
    .replace(/^.*?<svg[^>]*>/, '')
    .replace(/<\/svg>$/, '')
    .replace(/<defs>.*?<\/defs>/, '')
    .replace(/class="[^"]+"/g, '')
    .replace(/id="[^"]+"/g, '');

// React-ify the inner HTML
innerHtml = innerHtml
    .replace(/points="/g, 'points="')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-path/g, 'clipPath');

const tsxContent = `import React from 'react';
import { cn } from '@/lib/utils';

export default function LogoMark({ className }: { className?: string }) {
    return (
        <svg 
            className={cn("h-full w-auto", className)}
            viewBox="${viewBox}" 
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${innerHtml}
        </svg>
    );
}
`;

fs.writeFileSync('/Users/fujitakazuya/Downloads/ヤオヨロズ_HP_ver4/components/ui/LogoMark.tsx', tsxContent);
console.log("LogoMark.tsx generated successfully.");
