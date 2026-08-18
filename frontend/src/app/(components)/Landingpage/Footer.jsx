"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#101828] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2161FF] text-white flex items-center justify-center font-black text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" strokeWidth="2.5" />
                  <polyline points="2 17 12 22 22 17" strokeWidth="2.5" />
                  <polyline points="2 12 12 17 22 12" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">VEYRA</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              AI-powered talent intelligence that helps teams discover stronger candidates, understand fit, and make confident hiring decisions.
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} VEYRA Talent Intelligence. All rights reserved.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Product</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#product" className="hover:text-white transition-colors">Resume Intelligence</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Talent Matching</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">AI Interviews</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Candidate Intelligence</a></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Solutions</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#recruiters" className="hover:text-white transition-colors">For Recruiters</a></li>
              <li><a href="#candidates" className="hover:text-white transition-colors">For Candidates</a></li>
              <li><a href="#jobs" className="hover:text-white transition-colors">Job Discovery</a></li>
              <li><Link href="/Login" className="hover:text-white transition-colors">Recruiter Workspace</Link></li>
            </ul>
          </div>

          {/* Column 4: Account & Auth */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Account</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/Login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/Signup" className="hover:text-white transition-colors">Get Started</Link></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>See potential. Hire with confidence.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-gray-400 transition-colors">Responsible AI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
