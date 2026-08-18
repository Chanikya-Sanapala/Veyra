"use client";

import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Resume Parsing & Intelligence",
      description:
        "VEYRA extracts structured skills, experience depth, education history, and project evidence from PDF and DOCX files automatically.",
      badge: "Extraction Engine",
    },
    {
      num: "02",
      title: "Multi-Factor Job Matching",
      description:
        "TF-IDF vector similarity and fuzzy term algorithms calculate transparent Resume Match Scores evaluating real candidate potential.",
      badge: "Match Engine",
    },
    {
      num: "03",
      title: "Structured AI Interviews",
      description:
        "Candidates complete interactive technical and behavioral AI interview sessions with automated response evaluation and scoring.",
      badge: "Assessment Engine",
    },
    {
      num: "04",
      title: "Candidate Intelligence & Shortlist",
      description:
        "Recruiters access composite decision cards to rank, compare, and shortlist top talent with 100% human decision authority.",
      badge: "Decision Support",
    },
  ];

  return (
    <section id="product" className="py-12 sm:py-16 bg-white border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2161FF] bg-[#EEF4FF] px-3.5 py-1 rounded-full">
            How VEYRA Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
            From resume data to confident hiring decisions.
          </h2>
          <p className="text-xs sm:text-base text-[#667085]">
            One unified intelligence layer connecting job requirements, candidate skills, and structured evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-[#2161FF]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-black text-[#2161FF]/40 group-hover:text-[#2161FF] transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#2161FF] bg-[#EEF4FF] px-2 py-0.5 rounded-full border border-[#2161FF]/10">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#101828] mb-1.5 group-hover:text-[#2161FF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
