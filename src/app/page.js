'use client'
import { AllInOneFeature } from "@/components/AllInOne/AllInOne";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowWorks/HowWorks";
import Navbar from "@/components/Navbar/Navbar";
import { RealTime } from "@/components/Real-Time/Real-Time";
import { SuccessStories } from "@/components/Story/Story";


export default function Home() {
 return (
   <div>
     <Navbar />
     <Hero />
     <AllInOneFeature />
     <RealTime />
     <HowItWorks />
     <SuccessStories />
     <Footer />
   </div>
 )
}
