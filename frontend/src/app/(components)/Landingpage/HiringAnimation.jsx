"use client";

import React, { useEffect, useState } from "react";

export default function HiringAnimation() {
  const [stage, setStage] = useState(0);
  // Stage states:
  // 0: Initial entry (candidates appear)
  // 1: Candidates moving toward AI Engine & AI Scanning active
  // 2: Match scoring in progress (counters incrementing)
  // 3: Scores revealed & Top Candidate Shortlisted highlight
  // 4: Pause before loop reset

  const [scores, setScores] = useState({ sofia: 0, marcus: 0, aisha: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setScores({ sofia: 94, marcus: 89, aisha: 76 });
      return;
    }

    let intervalId;
    let scoreAnimationId;

    const runSequence = () => {
      // Stage 0: Reset
      setStage(0);
      setScores({ sofia: 0, marcus: 0, aisha: 0 });

      // Stage 1: AI Activation & Scan (at 1.5s)
      const t1 = setTimeout(() => {
        setStage(1);
      }, 1500);

      // Stage 2: Scoring starts (at 3.5s)
      const t2 = setTimeout(() => {
        setStage(2);
        let start = Date.now();
        const duration = 2000; // 2 seconds to count up

        scoreAnimationId = setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out quad function for smooth counter
          const easeProgress = 1 - Math.pow(1 - progress, 2);

          setScores({
            sofia: Math.round(easeProgress * 94),
            marcus: Math.round(easeProgress * 89),
            aisha: Math.round(easeProgress * 76),
          });

          if (progress >= 1) {
            clearInterval(scoreAnimationId);
          }
        }, 30);
      }, 3500);

      // Stage 3: Top candidate Shortlisted highlight (at 6.0s)
      const t3 = setTimeout(() => {
        setStage(3);
      }, 6000);

      // Stage 4: Hold & Reset trigger (at 9.5s)
      const t4 = setTimeout(() => {
        setStage(4);
      }, 9500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        if (scoreAnimationId) clearInterval(scoreAnimationId);
      };
    };

    const cleanupSequence = runSequence();

    // Main 10.5 second loop
    intervalId = setInterval(() => {
      runSequence();
    }, 10500);

    return () => {
      clearInterval(intervalId);
      if (cleanupSequence) cleanupSequence();
    };
  }, []);

  if (isReducedMotion) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2161FF]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">VEYRA AI Talent Intelligence</span>
          </div>
          <span className="text-xs font-medium bg-[#EEF4FF] text-[#2161FF] px-2.5 py-1 rounded-full">Static View</span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Candidates Column */}
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm font-semibold text-[#101828]">Sofia R.</p>
              <p className="text-xs text-[#667085]">Frontend Engineer</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm font-semibold text-[#101828]">Marcus C.</p>
              <p className="text-xs text-[#667085]">Backend Engineer</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm font-semibold text-[#101828]">Aisha J.</p>
              <p className="text-xs text-[#667085]">Full Stack Developer</p>
            </div>
          </div>

          {/* AI Node */}
          <div className="flex justify-center my-4 md:my-0">
            <div className="w-24 h-24 rounded-2xl bg-[#2161FF] text-white flex flex-col items-center justify-center font-bold shadow-lg shadow-blue-500/20">
              <span className="text-xs tracking-widest text-blue-200 uppercase">VEYRA</span>
              <span className="text-lg">AI</span>
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-3">
            <div className="p-3 bg-blue-50/80 rounded-xl border border-[#2161FF]/30 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#101828]">Sofia R.</p>
                <span className="inline-block text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">✓ Shortlisted</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#2161FF]">94%</span>
                <p className="text-[10px] text-gray-500">Strong Match</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#101828]">Marcus C.</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-gray-800">89%</span>
                <p className="text-[10px] text-gray-500">Good Match</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#101828]">Aisha J.</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-gray-700">76%</span>
                <p className="text-[10px] text-gray-500">Potential</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/80 shadow-2xl p-5 sm:p-7 relative overflow-hidden group">
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#2161FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2161FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2161FF]"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Live AI Hiring Pipeline
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-[#2161FF] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-[#2161FF]/10">
          <span>
            {stage === 0 && "Receiving Applications..."}
            {stage === 1 && "AI Analyzing Skills & Fit..."}
            {stage === 2 && "Computing Match Scores..."}
            {stage >= 3 && "Top Candidate Shortlisted"}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-11 gap-4 items-center relative z-10 min-h-[320px]">
        {/* LEFT COLUMN: Candidate Cards Input (cols 1-4) */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Incoming Applicants
          </p>

          {/* Sofia Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 ${
              stage >= 0
                ? "opacity-100 translate-x-0 bg-white border-gray-200 shadow-sm"
                : "opacity-0 -translate-x-6"
            } ${stage >= 3 ? "border-[#2161FF]/40 bg-blue-50/30" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                SR
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">Sofia R.</p>
                <p className="text-xs text-[#667085]">Frontend Engineer</p>
              </div>
            </div>
          </div>

          {/* Marcus Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 delay-150 ${
              stage >= 0
                ? "opacity-100 translate-x-0 bg-white border-gray-200 shadow-sm"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                MC
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">Marcus C.</p>
                <p className="text-xs text-[#667085]">Backend Engineer</p>
              </div>
            </div>
          </div>

          {/* Aisha Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 delay-300 ${
              stage >= 0
                ? "opacity-100 translate-x-0 bg-white border-gray-200 shadow-sm"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                AJ
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">Aisha J.</p>
                <p className="text-xs text-[#667085]">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: VEYRA AI Engine Node (cols 5-7) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center my-6 md:my-0 relative">
          {/* Processing Connecting Rays / Dots */}
          <div className="hidden md:block absolute -left-12 top-1/2 w-12 h-0.5 bg-gradient-to-r from-gray-200 to-[#2161FF]">
            {stage >= 1 && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2161FF] animate-ping" />
            )}
          </div>
          <div className="hidden md:block absolute -right-12 top-1/2 w-12 h-0.5 bg-gradient-to-r from-[#2161FF] to-gray-200">
            {stage >= 2 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>

          {/* Core AI Orb Node */}
          <div
            className={`w-28 h-28 rounded-3xl bg-gradient-to-br from-[#2161FF] to-[#1047CD] text-white flex flex-col items-center justify-center font-bold shadow-xl shadow-blue-500/25 transition-all duration-700 relative overflow-hidden ${
              stage >= 1 ? "animate-ai-pulse scale-105" : ""
            }`}
          >
            {/* Scan Beam Effect */}
            {stage === 1 && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-line" />
            )}

            <div className="relative z-10 text-center">
              <span className="text-[10px] font-black tracking-widest text-blue-200 uppercase block">
                VEYRA
              </span>
              <span className="text-2xl font-extrabold tracking-tight">AI</span>
              <span className="text-[9px] font-medium text-blue-100 block mt-0.5">
                MATCH ENGINE
              </span>
            </div>
          </div>

          <p className="text-[11px] font-medium text-gray-500 mt-3 text-center">
            {stage === 0 && "Waiting for input..."}
            {stage === 1 && "Analyzing skills & projects..."}
            {stage === 2 && "Scoring suitability vector..."}
            {stage >= 3 && "Candidate ranked!"}
          </p>
        </div>

        {/* RIGHT COLUMN: AI Match Results & Shortlist Output (cols 8-11) */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Intelligence Results
          </p>

          {/* Sofia Result Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 ${
              stage >= 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6"
            } ${
              stage >= 3
                ? "bg-blue-50/80 border-[#2161FF]/40 shadow-md ring-2 ring-[#2161FF]/20"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#101828]">Sofia R.</p>
                {stage >= 3 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full mt-1 animate-shortlist-pop">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Shortlisted
                  </span>
                ) : (
                  <p className="text-xs text-[#667085]">Analyzing...</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-[#2161FF]">
                  {scores.sofia}%
                </span>
                <p className="text-[10px] font-medium text-gray-500">Strong Match</p>
              </div>
            </div>
          </div>

          {/* Marcus Result Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 delay-150 ${
              stage >= 2
                ? "opacity-100 translate-x-0 bg-white border-gray-200"
                : "opacity-0 translate-x-6"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#101828]">Marcus C.</p>
                <p className="text-xs text-[#667085]">Backend Fit</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-800">
                  {scores.marcus}%
                </span>
                <p className="text-[10px] font-medium text-gray-500">Good Match</p>
              </div>
            </div>
          </div>

          {/* Aisha Result Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-500 delay-300 ${
              stage >= 2
                ? "opacity-100 translate-x-0 bg-white border-gray-200"
                : "opacity-0 translate-x-6"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#101828]">Aisha J.</p>
                <p className="text-xs text-[#667085]">Full Stack Fit</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-700">
                  {scores.aisha}%
                </span>
                <p className="text-[10px] font-medium text-gray-500">Potential</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Progress Indicator Footer */}
      <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>Continuous AI Matching Cycle</span>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${stage === 0 ? 'bg-[#2161FF]' : 'bg-gray-200'}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${stage === 1 ? 'bg-[#2161FF]' : 'bg-gray-200'}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${stage === 2 ? 'bg-[#2161FF]' : 'bg-gray-200'}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${stage >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
}
