"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/helpers/utils";
import { Menu, X } from "lucide-react";
import api from "@/helpers/api";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const userData = await api.get("/user/me");
        if (isMounted) {
          setUser(userData.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data in sidebar:", error);
      }
    };
    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, []);

  const baseNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Hackathons", href: "/dashboard/hackathons" },
    { label: "Internships", href: "/dashboard/internships" },
    { label: "Contests", href: "/dashboard/contests" },
  ];

  const adminNavItems = [
    { label: "Add Event", href: "/dashboard/addEvent" },
    { label: "Approving List", href: "/dashboard/approve" },
  ];
  const navItems = [
    ...baseNavItems,
    ...(user?.role?.trim() === "admin" ? adminNavItems : []),
  ];

  return (
    <>
      {/* Mobile Hamburger Button - Always visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 z-30 p-4 bg-[#1b1b1e] border-b border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Panel - Hidden on mobile by default */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-[#1b1b1e] border-r border-white/10 p-6",
          "transform transition-transform duration-300 ease-in-out",
          "md:static md:translate-x-0 md:h-auto", // Desktop styles
          isOpen ? "translate-x-0" : "-translate-x-full" // Mobile toggle
        )}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-8 hidden md:block">
          Opportunity<span className="text-[#00ED64]">Hub</span>
        </h2>

        {/* Navigation Links */}
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded hover:bg-[#4ade80]/10",
                pathname === item.href && "bg-[#f02e65]/20 text-[#f02e65]"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay - Only visible when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
