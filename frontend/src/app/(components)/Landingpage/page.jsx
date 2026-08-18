"use client";

import React from "react";
import CinematicHero from "./CinematicHero";
import HowItWorks from "./HowItWorks";
import RecruiterSection from "./RecruiterSection";
import CandidateSection from "./CandidateSection";
import AIMatchingSection from "./AIMatchingSection";
import TrustSection from "./TrustSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#101828] font-sans antialiased selection:bg-[#2161FF] selection:text-white">
      {/* 1. Cinematic Fullscreen Hero Section (with looping video background & responsive nav) */}
      <CinematicHero />

      {/* 2. Main Product Sections */}
      <main>
        {/* Product / How It Works */}
        <HowItWorks />

        {/* Recruiter Value Proposition */}
        <RecruiterSection />

        {/* Candidate Value Proposition */}
        <CandidateSection />

        {/* AI Matching & Transparency Section */}
        <AIMatchingSection />

        {/* Enterprise Trust & Metrics */}
        <TrustSection />

        {/* Conversion Call to Action */}
        <CTASection />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
