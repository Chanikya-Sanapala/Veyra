"use client";

import React from "react";
import Link from "next/link";

export default function CandidateSection() {
  return (
    <section id="candidates" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Mockup Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#F8FAFC] rounded-2xl border border-gray-200 shadow-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-4">
                <span className="text-xs font-bold text-[#2161FF] bg-[#EEF4FF] px-2.5 py-1 rounded-full">
                  Candidate Match Breakdown
                </span>
                <span className="text-xl font-extrabold text-[#2161FF]">94% Match</span>
              </div>

              <div className="space-y-4">
                {/* Verified Strengths */}
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-emerald-900 mb-2">Verified Strengths</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">✓ React.js</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">✓ Node.js</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">✓ MongoDB</span>
                  </div>
                </div>

                {/* Skill Gaps */}
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-amber-900 mb-2">Actionable Skill Gaps</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">△ Kubernetes</span>
                    <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">△ Redis Caching</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    💡 <em>Tip: Add Docker & Redis project highlights to boost match score across 12 active job requisitions.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2161FF] bg-[#EEF4FF] px-3.5 py-1.5 rounded-full">
              For Candidates & Job Seekers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
              No more black-hole applications. Know your fit before you apply.
            </h2>
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
              VEYRA provides candidates with transparent Match Scores, explicit skill gap feedback, and interactive AI interview workouts to boost career growth.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-[#101828] font-semibold">See personalized Match Scores (`94% Match`) on recommended jobs.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-[#101828] font-semibold">Receive clear, actionable feedback on missing skill requirements.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-[#101828] font-semibold">Practice preliminary AI technical and behavioral interview sessions.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/Signup"
                className="inline-flex items-center gap-2 bg-[#101828] text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md"
              >
                <span>Build Candidate Profile</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
