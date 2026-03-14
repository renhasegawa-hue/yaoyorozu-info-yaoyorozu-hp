import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    className?: string;
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', className, asChild = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative group overflow-hidden px-12 py-6 transition-all duration-700 ease-out",
                    "font-zen-kaku tracking-[0.2em] text-sm md:text-base",
                    variant === 'primary' && "bg-accent-indigo text-base-white hover:text-accent-gold",
                    variant === 'outline' && "border border-base-black text-base-black hover:border-accent-gold hover:text-accent-gold",
                    variant === 'ghost' && "text-base-black hover:bg-sub-gray/20",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 transition-colors duration-500">{children}</span>

                {/* 落款（判子）モチーフのホバーエフェクト（アンチグラビティ、重力排除、和の静寂） */}
                {variant !== 'ghost' && (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out pointer-events-none">
                        <span className="w-24 h-24 bg-accent-vermilion rounded-sm opacity-20 transform scale-50 group-hover:scale-110 blur-[2px] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-multiply"></span>
                    </span>
                )}
            </button>
        );
    }
);
Button.displayName = "Button";
