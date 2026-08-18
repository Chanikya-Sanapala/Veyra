"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Job Seeker",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("🔄 Registration form state updated:", formData);
  }, [formData]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password should be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"
      )
        .trim()
        .replace(/\/$/, "");

      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("Registration successful! Redirecting to login...");

        setTimeout(() => {
          window.location.href = "/Login";
        }, 1200);
      } else {
        setMessage(data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      setMessage(
        "Could not connect to server. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-between items-center bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased px-4 py-3 selection:bg-[#0071E3] selection:text-white">
      {/* Top Apple Header */}
      <header className="w-full max-w-5xl flex items-center justify-between py-1 px-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#0071E3] text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="text-base font-semibold tracking-tight text-[#1D1D1F]">
            VEYRA
          </span>
        </Link>

        <div className="text-xs text-[#86868B]">
          <span>Already have an account? </span>
          <Link href="/Login" className="text-[#0071E3] hover:underline font-medium">
            Sign in →
          </Link>
        </div>
      </header>

      {/* APPLE ID CENTERED CARD (Fits exact screen height without scrolling) */}
      <main className="my-auto w-full max-w-[410px]">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[24px] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.05]">
          {/* Card Header */}
          <div className="text-center space-y-1.5 mb-4">
            <div className="mx-auto w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0071E3] to-[#2161FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg
                className="w-5.5 h-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                Create Your VEYRA ID
              </h1>
              <p className="text-[11px] text-[#86868B] mt-0.5">
                One account for talent matching & recruitment
              </p>
            </div>
          </div>

          {/* Segmented Role Switcher */}
          <div className="bg-[#E8E8ED]/70 p-0.5 rounded-full border border-black/[0.04] mb-3 flex relative">
            <button
              onClick={() => setFormData({ ...formData, userType: "Job Seeker" })}
              type="button"
              className={`flex-1 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-200 ${
                formData.userType === "Job Seeker"
                  ? "bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              Candidate
            </button>
            <button
              onClick={() => setFormData({ ...formData, userType: "Recruiter" })}
              type="button"
              className={`flex-1 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-200 ${
                formData.userType === "Recruiter"
                  ? "bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* Google OAuth Signup */}
          <div className="w-full flex justify-center mb-3">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                setIsLoading(true);
                try {
                  const { credential } = credentialResponse;
                  const baseUrl = (
                    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"
                  )
                    .trim()
                    .replace(/\/$/, "");

                  const res = await fetch(`${baseUrl}/api/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: credential,
                      userType: formData.userType,
                    }),
                  });
                  const data = await res.json().catch(() => ({}));

                  if (res.ok && data.success) {
                    setMessage("Google registration successful!");
                    if (data.data && data.data.token) {
                      localStorage.setItem("token", data.data.token);
                      localStorage.setItem("user", JSON.stringify(data.data.user));
                    }
                    setTimeout(() => {
                      window.location.href =
                        data.data?.user?.userType === "Recruiter"
                          ? "/recruiter-dashboard"
                          : "/jobseeker-dashboard";
                    }, 1000);
                  } else {
                    setMessage(data?.message || "Google signup failed.");
                  }
                } catch (err) {
                  console.error("Google signup error", err);
                  setMessage("Could not connect to authentication server.");
                } finally {
                  setIsLoading(false);
                }
              }}
              onError={() => {
                setMessage("Google signup cancelled.");
              }}
              theme="outline"
              shape="pill"
              width="100%"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 my-2.5">
            <div className="h-px flex-1 bg-black/[0.08]" />
            <span className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider">
              or register with email
            </span>
            <div className="h-px flex-1 bg-black/[0.08]" />
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSignup} className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="username"
                  className="block text-[10px] font-semibold text-[#1D1D1F] mb-0.5 pl-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Unique ID"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3 py-2 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] font-semibold text-[#1D1D1F] mb-0.5 pl-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3 py-2 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] font-semibold text-[#1D1D1F] mb-0.5 pl-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 chars"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3 py-2 pr-8 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] p-0.5"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={14} />
                    ) : (
                      <AiOutlineEye size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[10px] font-semibold text-[#1D1D1F] mb-0.5 pl-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3 py-2 pr-8 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label="Toggle confirm password visibility"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] p-0.5"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={14} />
                    ) : (
                      <AiOutlineEye size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Banner */}
            {message && (
              <div
                className={`p-2 rounded-xl text-[10px] font-medium border text-center transition-all ${
                  message.includes("successful") || message.includes("Redirecting")
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Apple Primary Blue Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-medium text-xs py-2.5 px-5 rounded-xl shadow-[0_4px_12px_rgba(0,113,227,0.25)] transition-all duration-200 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating VEYRA ID...</span>
                </div>
              ) : (
                "Create VEYRA ID"
              )}
            </button>
          </form>

          {/* Apple Redirect Footer */}
          <div className="text-center pt-3 text-[11px] text-[#86868B]">
            <span>Already have a VEYRA ID? </span>
            <Link
              href="/Login"
              className="text-[#0071E3] font-semibold hover:underline"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="w-full max-w-5xl py-2 px-2 text-center text-[11px] text-[#86868B] flex items-center justify-between border-t border-black/[0.05]">
        <div>© 2026 VEYRA Inc.</div>
        <div className="flex items-center gap-3">
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <span>·</span>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
