import { newsData } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = newsData.find((item) => item.id === id);

  if (!news) {
    notFound();
  }

  return (
    <div className="pt-32 pb-48 md:pt-48 bg-base-white min-h-screen">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex gap-4 items-center mb-16 font-cinzel text-xs tracking-widest text-base-black/40">
          <Link href="/" className="hover:text-accent-gold transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-accent-gold transition-colors">NEWS</Link>
          <span>/</span>
          <span className="text-base-black truncate max-w-[100px] md:max-w-none hover:text-base-black transition-none cursor-default">
            {news.id.toUpperCase()}
          </span>
        </div>

        {/* Content Header */}
        <header className="mb-20 md:mb-32">
          <div className="flex items-center gap-6 mb-12">
            <span className="font-cinzel text-sm md:text-base tracking-widest text-base-black/40 font-medium whitespace-nowrap">
              {news.date}
            </span>
            <span className="font-noto-sans-jp text-[10px] tracking-[0.2em] px-3 py-1 border border-accent-gold/30 text-accent-gold/80 rounded-sm uppercase">
              {news.category}
            </span>
          </div>
          <h1 className="font-noto-sans-jp text-3xl md:text-4xl tracking-wide leading-[1.6] text-base-black font-light">
            {news.title}
          </h1>
          <div className="w-16 h-[1.5px] bg-accent-gold mt-16 opacity-40"></div>
        </header>

        {/* Content Body Placeholder */}
        <div className="prose prose-lg max-w-none font-noto-sans-jp text-base-black/70 leading-relaxed font-light tracking-wide">
          <p className="mb-8">
            本文は現在準備中です。弊社の最新の取り組みにつきましては、順次詳細を公開してまいります。
          </p>
          <div className="h-40 md:h-64 bg-sub-gray/5 border border-base-black/5 rounded-sm flex items-center justify-center italic text-base-black/20 text-sm">
            Content Placeholder
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-32 pt-16 border-t border-accent-gold/10 flex justify-between items-center">
          <Link href="/news" className="group flex items-center gap-4 text-base-black/40 hover:text-accent-gold transition-all duration-500">
            <div className="relative w-10 h-[1px] bg-current overflow-hidden">
               <div className="absolute inset-0 bg-accent-gold translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
            <span className="font-cinzel text-[11px] tracking-[0.4em] uppercase">Return to News Room</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return newsData.map((item) => ({
    id: item.id,
  }));
}
