"use client";

import React from "react";
import Link from "next/link";

export default function RecruiterSection() {
  const recruiterFeatures = [
    {
      title: "5-Second Command Center",
      desc: "Instantly evaluate total applicants, monthly trends, pipeline bottlenecks, and upcoming interviews.",
      icon: (
        <svg className="w-5 h-5 text-[#2161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Transparent Resume Match Scores",
      desc: "Every candidate score breakdown reveals skills alignment, experience depth, and project relevance.",
      icon: (
        <svg className="w-5 h-5 text-[#2161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Automated AI Interview Evaluations",
      desc: "Conduct structured technical screening with AI-generated audio questions and transcript evaluations.",
      icon: (
        <svg className="w-5 h-5 text-[#2161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="recruiters" className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2161FF] bg-[#EEF4FF] px-3.5 py-1.5 rounded-full">
              For Recruiters & Hiring Managers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
              Screen 100s of resumes in minutes. Hire with total confidence.
            </h2>
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
              VEYRA equips talent teams with an explainable decision-support workspace. Filter top matches instantly while keeping full human control over shortlisting.
            </p>

            <div className="space-y-4 pt-2">
              {recruiterFeatures.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#101828] mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/Signup"
                className="inline-flex items-center gap-2 bg-[#2161FF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#194ed4] transition-all shadow-md shadow-blue-500/20"
              >
                <span>Start Recruiter Trial</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Product Mockup Column */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 relative">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#101828]">Recruiter Workspace Preview</h3>
                  <p className="text-xs text-[#667085]">Requisition: Senior Full Stack Engineer</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  184 Applicants
                </span>
              </div>

              {/* Mock Roster */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      SM
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#101828]">Sofia R.</p>
                      <p className="text-xs text-[#667085]">Applied 2h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">Interview</span>
                    <span className="text-sm font-extrabold text-[#2161FF]">94% Match</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      MC
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#101828]">Marcus C.</p>
                      <p className="text-xs text-[#667085]">Applied 4h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Shortlisted</span>
                    <span className="text-sm font-bold text-gray-800">89% Match</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      AJ
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#101828]">Aisha J.</p>
                      <p className="text-xs text-[#667085]">Applied 1d ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">Applied</span>
                    <span className="text-sm font-bold text-gray-700">76% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
