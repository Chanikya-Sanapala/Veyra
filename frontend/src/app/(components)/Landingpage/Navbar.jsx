"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Solutions", href: "#solutions" },
    { name: "For Recruiters", href: "#recruiters" },
    { name: "For Candidates", href: "#candidates" },
    { name: "Jobs", href: "#jobs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="VEYRA" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#667085] hover:text-[#2161FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/Login"
            className="text-sm font-semibold text-[#101828] hover:text-[#2161FF] transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/Signup"
            className="text-sm font-semibold bg-[#2161FF] text-white px-5 py-2.5 rounded-xl hover:bg-[#194ed4] transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#101828] focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-[#101828] hover:text-[#2161FF] transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/Login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-semibold text-[#101828] border border-gray-200 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              href="/Signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-semibold bg-[#2161FF] text-white rounded-xl shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
