'use client'
import  { Hero }  from "@/components/Hero/Hero";
import Navbar  from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
 return (
   <div>
     <Navbar />
     <Hero />
   </div>
 )
}
