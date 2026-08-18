"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.userType === 'recruiter') {
          router.replace('/recruiter-dashboard');
          return;
        }
      }
      router.replace('/jobseeker-dashboard');
    } catch (_) {
      router.replace('/jobseeker-dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#2161FF] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold text-gray-500">Redirecting to VEYRA Workspace...</p>
      </div>
    </div>
  );
}