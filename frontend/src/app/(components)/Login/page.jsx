"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("Job Seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("🔄 Form state updated:", formData, userType);
  }, [formData, userType]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const rawUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
      const baseUrl = rawUrl.trim().replace(/\/api\/?$/, "").replace(/\/$/, "");

      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, userType }),
      });

      const data = await res.json();
      const payload = data?.data || {};
      const token = payload.token;
      const user = payload.user;

      if (res.ok && data.success && token && user) {
        setMessage(data.message || "Sign in successful. Redirecting...");

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          const type = (user?.userType || userType || "").toLowerCase();
          let path = "/jobseeker-dashboard";
          if (type === "recruiter") path = "/recruiter-dashboard";
          else if (type === "admin" || type === "administrator")
            path = "/admin-dashboard";

          try {
            const encoded = btoa(
              JSON.stringify({ user, token, userType: user.userType })
            );
            window.location.href = `${path}?u=${encodeURIComponent(encoded)}`;
          } catch (_) {
            window.location.href = path;
          }
        }, 800);
      } else {
        setMessage(data?.message || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage(
        "Could not connect to authentication server. Please check status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-between items-center bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased px-4 py-3 selection:bg-[#0071E3] selection:text-white">
      {/* Top Apple Header (Fixed height) */}
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
          <span>Need help? </span>
          <a href="#support" className="text-[#0071E3] hover:underline font-medium">
            Support
          </a>
        </div>
      </header>

      {/* APPLE ID CENTERED CARD (Fits exact screen height without scrolling) */}
      <main className="my-auto w-full max-w-[400px]">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[24px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.05]">
          {/* Card Header & Icon */}
          <div className="text-center space-y-2 mb-5">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0071E3] to-[#2161FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg
                className="w-6 h-6"
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
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F]">
                Sign in with VEYRA
              </h1>
              <p className="text-xs text-[#86868B] mt-0.5">
                Use your VEYRA ID to access talent intelligence
              </p>
            </div>
          </div>

          {/* Apple Segmented Control Switcher */}
          <div className="bg-[#E8E8ED]/70 p-1 rounded-full border border-black/[0.04] mb-4 flex relative">
            <button
              onClick={() => setUserType("Job Seeker")}
              type="button"
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                userType === "Job Seeker"
                  ? "bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              Candidate
            </button>
            <button
              onClick={() => setUserType("Recruiter")}
              type="button"
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                userType === "Recruiter"
                  ? "bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* Google OAuth Login */}
          <div className="w-full flex justify-center mb-3.5">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  setIsLoading(true);
                  const { credential } = credentialResponse;
                  const rawUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
                  const baseUrl = rawUrl.trim().replace(/\/api\/?$/, "").replace(/\/$/, "");

                  const res = await fetch(`${baseUrl}/api/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: credential,
                      userType,
                    }),
                  });
                  const data = await res.json();

                  if (res.ok && data.success) {
                    setMessage("Google authentication successful!");
                    if (data.data && data.data.token) {
                      localStorage.setItem("token", data.data.token);
                      localStorage.setItem("user", JSON.stringify(data.data.user));
                    }

                    setTimeout(() => {
                      const type = (data.data?.user?.userType || userType).toLowerCase();
                      let path = "/jobseeker-dashboard";
                      if (type === "recruiter") path = "/recruiter-dashboard";
                      else if (type === "admin") path = "/admin-dashboard";
                      window.location.href = path;
                    }, 1000);
                  } else {
                    setMessage(data?.message || "Google login failed.");
                    setIsLoading(false);
                  }
                } catch (err) {
                  console.error("Google login error", err);
                  setMessage("Google login failed.");
                  setIsLoading(false);
                }
              }}
              onError={() => {
                setMessage("Google login cancelled.");
                setIsLoading(false);
              }}
              theme="outline"
              shape="pill"
              width="100%"
            />
          </div>

          {/* Apple Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-black/[0.08]" />
            <span className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider">
              or email
            </span>
            <div className="h-px flex-1 bg-black/[0.08]" />
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-semibold text-[#1D1D1F] mb-1 pl-1"
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
                className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 pl-1">
                <label
                  htmlFor="password"
                  className="text-[11px] font-semibold text-[#1D1D1F]"
                >
                  Password
                </label>
                <Link
                  href="/ForgotPassword"
                  className="text-[11px] font-medium text-[#0071E3] hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF4] focus:bg-white border border-transparent focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/15 rounded-xl px-3.5 py-2.5 pr-10 text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors p-1"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={16} />
                  ) : (
                    <AiOutlineEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Feedback Banner */}
            {message && (
              <div
                className={`p-2.5 rounded-xl text-[11px] font-medium border text-center transition-all ${
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
              className={`w-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-medium text-xs py-3 px-5 rounded-xl shadow-[0_4px_12px_rgba(0,113,227,0.25)] transition-all duration-200 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Apple Redirect Footer */}
          <div className="text-center pt-4 text-xs text-[#86868B]">
            <span>Don't have a VEYRA ID? </span>
            <Link
              href="/Signup"
              className="text-[#0071E3] font-semibold hover:underline"
            >
              Create one now →
            </Link>
          </div>
        </div>
      </main>

      {/* Apple Compact Footer */}
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
