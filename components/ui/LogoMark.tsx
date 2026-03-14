import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface LogoMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stacked" | "stacked-hero" | "horizontal" | "icon";
  isDarkText?: boolean;
}

export default function LogoMark({ className, variant = "horizontal", isDarkText = true, ...props }: LogoMarkProps) {

  if (variant === "horizontal") {
    return (
      <div className={cn("relative w-full h-full", className)} {...props}>
        <Image
          src={isDarkText ? "/images/logo/yao_line_bl.png" : "/images/logo/yao_line_wh.png"}
          alt="YAOYOROZU"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    );
  }

  // The square lockup (A mark over Yaoyorozu or just the mark)
  // We only have logo_bl.png for this
  const imageSrc = variant === "stacked-hero" || !isDarkText
    ? (isDarkText ? "/images/logo/logo_bl.png" : "/images/logo/yaoyorozu_wh.png")
    : "/images/logo/logo_bl.png";

  return (
    <div className={cn("relative w-full h-full min-h-[40px]", className)} {...props}>
      <Image
        src={imageSrc}
        alt="YAOYOROZU Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
