"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/helpers/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Hackathons", href: "/dashboard/hackathons" },
  { label: "Internships", href: "/dashboard/internships" },
  { label: "Contests", href: "/dashboard/contests" },
  { label: "Add Event", href: "/dashboard/addEvent" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Top-Left Hamburger Only (Mobile) */}
      <div className="md:hidden p-4 bg-[#1b1b1e] border-b border-white/10">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Sidebar Panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40  w-64 bg-[#1b1b1e] border-r border-white/10 p-6 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:block",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Show Logo only on desktop */}
        <h2 className="text-2xl font-bold  mb-8 hidden md:block">
          Opportunity<span className="text-[#00ED64]">Hub</span>
        </h2>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded hover:bg-[#4ade80]/10", // Changed from [#f02e65]/10 to [#4ade80]/10
                pathname === item.href && "bg-[#f02e65]/20 text-[#f02e65]"
              )}
              onClick={() => setIsOpen(false)} // close sidebar after click
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ✅ Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
