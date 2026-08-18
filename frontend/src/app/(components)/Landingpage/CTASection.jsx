"use client";

import React from "react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#2161FF] to-[#1047CD] rounded-3xl p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          {/* Subtle Glow & Pattern Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              Transform Your Hiring Pipeline
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to see potential and hire with confidence?
            </h2>

            <p className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join modern hiring teams using VEYRA's AI talent intelligence to discover, score, and interview top-tier candidates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/Signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#2161FF] font-bold text-base px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95"
              >
                <span>Get Started Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/Login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/20 border border-white/20 transition-all"
              >
                <span>Sign In to Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
