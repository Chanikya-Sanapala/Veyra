"use client";

import React from "react";

export default function AIMatchingSection() {
  return (
    <section id="solutions" className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2161FF] bg-[#EEF4FF] px-3.5 py-1.5 rounded-full">
            Responsible AI & Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
            AI evaluates. Humans decide.
          </h2>
          <p className="text-base sm:text-lg text-[#667085]">
            VEYRA generates transparent evidence and multi-factor match ratings to empower recruiter decision-making—never automating hiring rejections.
          </p>
        </div>

        {/* 4 Multi-Factor Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
            <div className="text-[#2161FF] font-bold text-2xl mb-1">96%</div>
            <h4 className="text-base font-bold text-[#101828] mb-2">Skills Alignment</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Compares required technical skills against candidate resume keywords and verified project tags.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
            <div className="text-[#059669] font-bold text-2xl mb-1">91%</div>
            <h4 className="text-base font-bold text-[#101828] mb-2">Experience Depth</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Evaluates tenure, domain history, and seniority alignment against job requirements.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
            <div className="text-[#2161FF] font-bold text-2xl mb-1">94%</div>
            <h4 className="text-base font-bold text-[#101828] mb-2">Project Relevance</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Analyzes portfolio projects, repository links, and practical stack overlap.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
            <div className="text-[#7C3AED] font-bold text-2xl mb-1">91%</div>
            <h4 className="text-base font-bold text-[#101828] mb-2">AI Interview Score</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Evaluates audio response transcripts for technical logic, problem solving, and communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
