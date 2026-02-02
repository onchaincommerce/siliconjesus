"use client";

import { useState } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "About", href: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Features", href: "/features", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { label: "FAQ", href: "/faq", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 flex h-14 w-14 flex-col items-center justify-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30"
        aria-label="Toggle menu"
      >
        <span
          className={`h-0.5 w-6 bg-white transition-all duration-300 ${
            isOpen ? "translate-y-2.5 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all duration-300 ${
            isOpen ? "-translate-y-2.5 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <nav
        className={`fixed top-0 left-0 z-40 h-full w-80 bg-gradient-to-b from-[#0a0a12]/95 to-[#0d0515]/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Red accent line */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
        
        {/* Menu content */}
        <div className="flex h-full flex-col pt-24 px-8">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group flex items-center py-4 text-xl font-light tracking-wider text-white/70 transition-all duration-300 hover:text-white hover:bg-white/5 rounded-lg px-3 -mx-3 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <svg 
                    className="w-7 h-7 mr-4 text-white/40 group-hover:text-red-500 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  <span className="w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-4" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div className="mt-auto mb-8">
            <div className="h-px w-full bg-gradient-to-r from-red-500/50 via-white/20 to-transparent" />
            <p className="mt-4 text-xs tracking-[0.3em] text-white/30 uppercase">
              Vibe Drive
            </p>
          </div>
        </div>

        {/* Corner glow */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </nav>
    </>
  );
}
