"use client";

import React from "react";
import Link from "next/link";
import HiringAnimation from "./HiringAnimation";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white bg-dot-grid overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EEF4FF] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTAs (Cols 1-6) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#2161FF]/20 text-[#2161FF] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2161FF] animate-pulse" />
              <span>AI-Powered Hiring Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-[#101828] leading-[1.08] tracking-tight">
              See potential. <br />
              <span className="text-[#2161FF]">Hire with confidence.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#667085] leading-relaxed max-w-xl">
              AI-powered talent intelligence that helps teams discover stronger candidates, understand fit, and make confident hiring decisions.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/Signup"
                className="inline-flex items-center justify-center gap-2 bg-[#2161FF] text-white text-base font-semibold px-7 py-3.5 rounded-xl hover:bg-[#194ed4] transition-all shadow-lg shadow-blue-500/25 active:scale-95 text-center"
              >
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <a
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#101828] border border-gray-200 text-base font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
              >
                <span>Explore Jobs</span>
              </a>
            </div>

            {/* Trust Messaging */}
            <div className="pt-6 border-t border-gray-100 flex items-center gap-3 text-xs text-[#667085]">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center font-bold text-[10px] text-blue-700">TC</span>
                <span className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-bold text-[10px] text-emerald-700">DS</span>
                <span className="w-7 h-7 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center font-bold text-[10px] text-purple-700">AI</span>
              </div>
              <span className="font-medium text-[#101828]">Built for modern hiring teams</span>
              <span className="text-gray-300">•</span>
              <span>100% Bias-free screening</span>
            </div>
          </div>

          {/* Right Column: Animated Visual Story (Cols 7-12) */}
          <div className="lg:col-span-6 w-full">
            <HiringAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
