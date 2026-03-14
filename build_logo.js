const fs = require('fs');

const svgCode = fs.readFileSync('/Users/fujitakazuya/Downloads/logo_c.svg', 'utf8');

// The original logo has these bounds roughly:
// Triangle: 0 0 100 86
// Kanji: 152 59 182 17
// TSUKASA text: 117 14 236 34
// But wait, the Kanji paths have rects and paths. Let's just group them by extracting based on exact matches or we can just extract everything before cls-1, etc.
// Wait, the easiest way is to use SVG with `preserveAspectRatio="xMidYMid meet"` and specific viewBoxes!

const fullSvgInner = svgCode
    .replace('<?xml version="1.0" encoding="UTF-8"?>', '')
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .replace(/<defs>.*?<\/defs>/s, '')
    .replace(/id="_レイヤー_1"/, '')
    // Change all class fills to currentColor except maybe the red one
    .replace(/class="cls-1"/g, 'fill="currentColor"')
    .replace(/class="cls-2"/g, 'fill="currentColor"')
    .replace(/class="cls-3"/g, 'fill="#c64532"');

// Using the single logo_c.svg content and wrapping it in viewBoxes
const componentCode = `import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

interface LogoMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stacked" | "stacked-hero" | "horizontal" | "icon";
  iconClassName?: string;
  textClassName?: string;
}

export function LogoMark({ className, variant = "stacked", iconClassName, textClassName, ...props }: LogoMarkProps) {
  
  // The raw SVG content from logo_c.svg with classes removed and fills set
  const SvgContent = () => (
    <>
      ${fullSvgInner}
    </>
  );

  const Triangle = () => (
    <svg viewBox="-5 -5 110 96" className={cn("w-full h-auto", iconClassName)} fill="currentColor">
      <SvgContent />
    </svg>
  );
  
  const TsukasaText = () => (
    <svg viewBox="110 8 250 46" className={cn("w-full h-auto", textClassName)} fill="currentColor">
      <SvgContent />
    </svg>
  );

  const KanjiText = () => (
    <svg viewBox="146 54 194 28" className={cn("w-full h-auto", textClassName)} fill="currentColor">
      <SvgContent />
    </svg>
  );

  if (variant === "horizontal") {
    // Like the original logo_c.svg
    return (
      <div className={cn("inline-flex items-center", className)} {...props}>
        <svg viewBox="0 0 367 86" className="w-full h-full" fill="currentColor">
           <SvgContent />
        </svg>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex items-center justify-center", className)} {...props}>
        <Triangle />
      </div>
    );
  }

  if (variant === "stacked-hero") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-2", className)} {...props}>
        <div className="w-full"><Triangle /></div>
        <div className="w-[85%] mt-1"><TsukasaText /></div>
      </div>
    );
  }

  // Default: stacked with Kanji (For Header and Footer)
  return (
    <div className={cn("flex flex-col items-center justify-center gap-1", className)} {...props}>
      <div className="w-[100%]"><Triangle /></div>
      <div className="w-[85%] mt-[2px]"><TsukasaText /></div>
      <div className="w-[65%] mt-[1px]"><KanjiText /></div>
    </div>
  );
}
`;

fs.writeFileSync('/Users/fujitakazuya/Downloads/ヤオヨロズ_HP_ver4/components/ui/LogoMark.tsx', componentCode);
console.log('Successfully wrote LogoMark.tsx!');
