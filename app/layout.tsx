import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WashiTexture from "@/components/graphics/WashiTexture";
import MouseRipple from "@/components/animations/MouseRipple";

export const metadata: Metadata = {
  title: "株式会社ヤオヨロズ | 宿泊業界を、AIで再定義する。",
  description: "おもてなしと、決断以外はAIに。最新のAI-BPOサービスを通じて、宿泊施設の皆様が抱える膨大な定型業務を自動化・効率化します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Klee+One:wght@400;600&family=Noto+Sans+JP:wght@300;400;500&family=Yuji+Syuku&family=Zen+Kaku+Gothic+New:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative w-full overflow-x-hidden selection:bg-accent-indigo selection:text-base-white">
        <WashiTexture />
        <MouseRipple />
        <Header />
        <main className="flex-grow w-full relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
