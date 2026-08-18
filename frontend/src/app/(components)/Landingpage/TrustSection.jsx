"use client";

import React from "react";

export default function TrustSection() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="pt-4 md:pt-0">
            <p className="text-4xl font-extrabold text-[#2161FF] tracking-tight">50%</p>
            <p className="text-sm font-semibold text-[#101828] mt-2">Reduction in Screening Time</p>
            <p className="text-xs text-[#667085] mt-1">Accelerate hiring velocity from weeks to days.</p>
          </div>

          <div className="pt-4 md:pt-0">
            <p className="text-4xl font-extrabold text-[#101828] tracking-tight">100k+</p>
            <p className="text-sm font-semibold text-[#101828] mt-2">Resumes & Skills Analyzed</p>
            <p className="text-xs text-[#667085] mt-1">Powered by TF-IDF & NLP term matching.</p>
          </div>

          <div className="pt-4 md:pt-0">
            <p className="text-4xl font-extrabold text-emerald-600 tracking-tight">94%</p>
            <p className="text-sm font-semibold text-[#101828] mt-2">Candidate Match Precision</p>
            <p className="text-xs text-[#667085] mt-1">High fit pass rate in final recruiter interviews.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
