import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import ServiceOverview from "@/components/sections/ServiceOverview";
import News from "@/components/sections/News";

export default function Home() {
  return (
    <div className="bg-base-white text-base-black">
      <Hero />
      <Introduction />
      <ServiceOverview />
      <News />
    </div>
  );
}
