"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowRight as ArrowRight, LuMenu as Menu, LuX as X } from "react-icons/lu";

export default function CinematicHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Solutions", href: "#solutions" },
    { name: "For Recruiters", href: "#recruiters" },
    { name: "For Candidates", href: "#candidates" },
    { name: "Jobs", href: "#jobs" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist antialiased">
      {/* Video Background (sits behind all content, no z-index) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Navbar (z-30) */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left Side: Logo & Desktop Links */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-black text-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span>VEYRA</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Desktop: CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/Signup"
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform inline-block"
          >
            Get Started
          </Link>
        </div>

        {/* Right Side Mobile: Hamburger Button (z-50) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white active:scale-90 transition-transform md:hidden"
          aria-label="Toggle menu"
        >
          <div className="relative h-6 w-6">
            <Menu
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-90 opacity-0 scale-50"
                  : "rotate-0 opacity-100 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-0 opacity-100 scale-100"
                  : "-rotate-90 opacity-0 scale-50"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay (z-20) */}
      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div>
              <Link
                href="/Signup"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content (z-10) */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-10 sm:pb-12 sm:pt-14 md:px-12 md:pb-16 md:pt-16 lg:px-16">
        {/* Top Section */}
        <div className="max-w-3xl">
          {/* Animated VEYRA Logo Emblem */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-3 animate-[fadeSlideUp_0.8s_ease_0.1s_both]">
            <img src="/logo.png" alt="VEYRA" className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(33,97,255,0.4)]" />
          </div>

          <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-white/90 font-medium tracking-wide uppercase animate-[fadeSlideUp_0.8s_ease_0.3s_both]">
            AI-Powered Talent Intelligence
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.5s_both]">
            See potential, <br />
            hire with confidence.
          </h1>
        </div>

        {/* Bottom Section */}
        <div>
          <p className="mb-5 sm:mb-6 max-w-sm sm:max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/60 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            AI-powered talent intelligence that helps teams discover stronger candidates, understand fit, and make confident hiring decisions.
          </p>
          <Link
            href="/Signup"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform animate-[fadeSlideUp_0.8s_ease_0.9s_both]"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
