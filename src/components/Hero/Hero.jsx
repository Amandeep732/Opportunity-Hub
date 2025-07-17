
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from 'next/image';

export function Hero() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/signup");
  };

  return (
    <section className="bg-gradient-to-r from-[#1a1a1a] to-[#3b0112] py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Your <span className="text-[#f02e65]">Opportunity Hub</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover and track <span className="text-white font-semibold">hackathons, internships, coding contests</span> 
            — all in one place. Get personalized recommendations, stay ahead of deadlines, 
            and never miss an opportunity again.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleClick}
              className="bg-[#f02e65] cursor-pointer hover:bg-[#d82555] text-white px-8 py-6 text-lg"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <Image
            src="/opportunity-dashboard-preview.svg"
            alt="Opportunity Hub Dashboard Preview"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl border border-white/10"
          />
          <div className="absolute inset-0 bg-[#f02e65]/10 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
