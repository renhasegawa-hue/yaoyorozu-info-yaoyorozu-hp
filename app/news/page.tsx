import { newsData } from "@/lib/news";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="pt-32 pb-48 md:pt-48 bg-base-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <h1 className="flex flex-col gap-4">
            <span className="font-cinzel text-5xl md:text-7xl tracking-[0.2em] text-base-black leading-tight">
              NEWS
            </span>
            <span className="font-yuji text-sm md:text-base tracking-[0.6em] text-accent-gold uppercase font-medium">
              お知らせ
            </span>
          </h1>
          <div className="w-16 h-[1px] bg-accent-gold mt-10 opacity-30"></div>
        </div>

        {/* News List */}
        <div className="flex flex-col">
          {newsData.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group block border-b border-accent-gold/10 py-8 md:py-12 transition-all duration-500 relative hover:bg-base-black/[0.01]"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 px-2">
                {/* Meta info */}
                <div className="flex items-center gap-6 md:w-64 flex-shrink-0">
                  <span className="font-cinzel text-sm md:text-base tracking-widest text-base-black/40 font-medium whitespace-nowrap">
                    {item.date}
                  </span>
                  <span className="font-noto-sans-jp text-[10px] tracking-[0.2em] px-3 py-1 border border-accent-gold/30 text-accent-gold/80 group-hover:bg-accent-gold group-hover:text-base-white transition-all duration-500 rounded-sm uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-noto-sans-jp text-lg md:text-xl tracking-wide leading-relaxed text-base-black/80 group-hover:text-base-black transition-colors duration-500 flex-grow font-light">
                  {item.title}
                </h2>

                {/* Subtle Arrow */}
                <div className="hidden md:block opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent-gold"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Line Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-700 ease-out"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
