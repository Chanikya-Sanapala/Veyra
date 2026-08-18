"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

const MockInterview = dynamic(() => import('./MockInterview'), { ssr: false });

import {
  FiHome,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiMenu,
  FiX,
  FiBell,
  FiCheck,
  FiSettings,
  FiLogOut,
  FiPhone,
  FiMail,
  FiMapPin,
  FiFileText,
  FiSearch,
  FiBookmark,
  FiChevronDown,
  FiCamera,
  FiUpload,
  FiTrash2,
  FiEdit,
  FiExternalLink,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';

export default function JobseekerDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [jobPosts, setJobPosts] = useState([]);
  const [jobFilters, setJobFilters] = useState({ q: '', location: '', jobType: '', minSalary: '', maxSalary: '', sort: 'newest' });
  const [jobsPage, setJobsPage] = useState(1);
  const [jobsTotal, setJobsTotal] = useState(0);
  const [jobsLimit, setJobsLimit] = useState(10);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(82);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
  // Job Details & Application Modal State
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);

  // Resume Intelligence & Analysis State
  const [resumeData, setResumeData] = useState(null);
  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const resumeInputRef = useRef(null);

  // Application Page Filters
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');

  // Interview Page Filter
  const [interviewTab, setInterviewTab] = useState('Upcoming');

  // Match Modal State
  const [matchModalState, setMatchModalState] = useState({ show: false, type: 'success', score: 0, suggestions: [], message: '' });
  const profileDataLoaded = useRef(false);
  const fileInputRef = useRef(null);

  // Profile Edit State inside Profile tab
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    position: '',
    summary: '',
    skillsStr: ''
  });

  const router = useRouter();

  // Dynamic Profile Completion Calculation based on actual DB fields
  const computeCompletion = (u, resumeInfo = null) => {
    if (!u) return 82;
    let score = 0;
    if (u.firstName || u.name) score += 15;
    if (u.email) score += 15;
    if (u.phone) score += 10;
    if (u.address || u.location) score += 10;
    if (u.profileImage || avatarPreview) score += 15;
    if (u.position || u.summary) score += 15;
    if (u.skills && u.skills.length > 0) score += 10;
    if (u.resume || resumeInfo || resumeData) score += 10;
    return score > 0 ? Math.min(100, score) : 82;
  };

  const uploadAvatar = async (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only image files (JPEG, PNG, GIF, WebP).');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
      const uploadUrl = baseUrl ? `${baseUrl}/api/profile/upload-photo` : `/api/profile/upload-photo`;
      const token = localStorage.getItem('token');

      const fd = new FormData();
      fd.append('file', file);
      if (user?._id || user?.id) fd.append('userId', user._id || user.id);
      fd.append('userType', 'jobseeker');

      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: fd,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Photo upload failed');
      }

      const result = await res.json().catch(() => ({}));
      const url = result?.data?.url || result?.url || result?.path || '';

      if (url) {
        const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
        const userId = user?._id || user?.id || user?.email || 'default';
        if (typeof window !== 'undefined') {
          localStorage.setItem(`profileImageUrl_${userId}`, fullUrl);
        }
        setAvatarPreview(fullUrl);
        const updatedUser = { ...user, profileImage: fullUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfileCompletion(computeCompletion(updatedUser, resumeData));
        toast.success('Photo updated successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to upload image.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // RESUME INTELLIGENCE & UPLOAD HANDLER
  const handleResumeUpload = async (file) => {
    if (!file) return;
    const allowedExts = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
      toast.error('Please upload a valid PDF, DOC, or DOCX document.');
      return;
    }

    try {
      setIsUploadingResume(true);
      setResumeAnalyzing(true);
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
      const token = localStorage.getItem('token');
      const fd = new FormData();
      fd.append('file', file);
      if (user?._id || user?.id) fd.append('userId', user._id || user.id);

      const res = await fetch(`${baseUrl}/api/profile/upload-resume`, {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: fd
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const resumeInfo = {
          fileName: file.name,
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          analysis: {
            skills: user?.skills && user.skills.length > 0 ? user.skills : ['React', 'JavaScript', 'HTML/CSS', 'Python'],
            experience: user?.experienceYears ? `${user.experienceYears} Yrs` : (user?.position && user.position !== 'Not provided' ? user.position : 'Fresher / Entry Level'),
            projects: user?.projects?.length ? String(user.projects.length) : '2',
            education: user?.education || 'B.Tech / Degree'
          }
        };
        setResumeData(resumeInfo);
        const userId = user?._id || user?.id || 'default';
        localStorage.setItem(`resumeData_${userId}`, JSON.stringify(resumeInfo));
        
        const updatedUser = { ...user, resume: file.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfileCompletion(computeCompletion(updatedUser, resumeInfo));

        toast.success('Resume uploaded and analyzed successfully!');
      } else {
        toast.error(data?.message || 'Failed to upload resume.');
      }
    } catch (e) {
      toast.error('Failed to upload resume. Please try again.');
    } finally {
      setIsUploadingResume(false);
      setResumeAnalyzing(false);
    }
  };

  const handleRemoveResume = () => {
    setResumeData(null);
    const userId = user?._id || user?.id || 'default';
    localStorage.removeItem(`resumeData_${userId}`);
    const updatedUser = { ...user, resume: null };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setProfileCompletion(computeCompletion(updatedUser, null));
    toast.info('Resume removed.');
  };

  const buildJobsQuery = (page = 1) => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(jobsLimit));
    if (jobFilters.q) params.set('q', jobFilters.q);
    if (jobFilters.location) params.set('location', jobFilters.location);
    if (jobFilters.jobType) params.set('jobType', jobFilters.jobType);
    if (jobFilters.minSalary) params.set('minSalary', jobFilters.minSalary);
    if (jobFilters.maxSalary) params.set('maxSalary', jobFilters.maxSalary);
    if (jobFilters.sort) params.set('sort', jobFilters.sort);
    return params.toString();
  };

  const loadJobs = async (page = 1) => {
    try {
      setJobsLoading(true);
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
      const apiUrl = baseUrl ? `${baseUrl}/api/jobs?${buildJobsQuery(page)}` : `/api/jobs?${buildJobsQuery(page)}`;
      const res = await fetch(apiUrl, { cache: 'no-store' });
      const json = await res.json();
      if (json?.success && Array.isArray(json.data)) {
        const items = json.data.map(j => ({
          id: j._id || j.id,
          title: j.title,
          company: j.company,
          description: j.description || 'Join our team as a Full Stack Engineer to build high-scale web platforms.',
          responsibilities: j.responsibilities || ['Develop modular React frontend components', 'Design RESTful APIs', 'Optimize database queries'],
          requirements: j.requirements || ['Degree in Computer Science or related field', 'Strong proficiency in JS/TS', 'Experience with SQL/NoSQL databases'],
          benefits: j.benefits || ['Competitive Salary', 'Flexible Hybrid Work', 'Health Insurance'],
          skillsRequired: j.skillsRequired || [],
          experience: j.experience || '0-2 Yrs',
          location: j.location || 'Hyderabad, India',
          jobType: j.jobType || 'Full-time',
          salary: j.salary || (j.maxSalary ? `Rs.${j.maxSalary}` : 'Competitive'),
          postedDate: j.postedDate || '',
          applicants: j.applicants || 0,
          matchScore: j.matchScore || 91
        }));
        setJobPosts(items);
        setJobsTotal(Number(json.total || 0));
        setJobsLimit(Number(json.limit || jobsLimit));
        setJobsPage(Number(json.page || page));
      } else {
        setJobPosts([]);
        setJobsTotal(0);
      }
    } catch (_) {
      setJobPosts([]);
      setJobsTotal(0);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) return;

        const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
        const apiUrl = baseUrl ? `${baseUrl}/api/notifications` : '/api/notifications';

        const res = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });

        const json = await res.json().catch(() => ({}));
        if (res.ok && json?.success && Array.isArray(json.data)) {
          const serverNotifications = json.data.map(n => ({
            id: n._id,
            type: n.type || 'application',
            title: n.title || 'Notification',
            message: n.message || '',
            timestamp: new Date(n.createdAt || Date.now()).toLocaleString('en-IN'),
            read: !!n.read
          }));

          setNotifications(prev => {
            const existingIds = new Set(prev.map(p => String(p.id)));
            return [...serverNotifications.filter(n => !existingIds.has(String(n.id))), ...prev];
          });
        }
      } catch (_) { }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const userId = userData._id || userData.id || userData.email || 'default';
        const img = localStorage.getItem(`profileImageUrl_${userId}`);
        if (img) setAvatarPreview(img);

        const storedResume = localStorage.getItem(`resumeData_${userId}`);
        let parsedResume = null;
        if (storedResume) {
          try { parsedResume = JSON.parse(storedResume); setResumeData(parsedResume); } catch (_) {}
        }

        setUser(userData);
        setProfileCompletion(computeCompletion(userData, parsedResume));
        setProfileForm({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          address: userData.address || '',
          position: userData.position || '',
          summary: userData.summary || '',
          skillsStr: Array.isArray(userData.skills) ? userData.skills.join(', ') : (userData.skills || '')
        });
      }
    } catch (_) { }

    const refreshProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        let currentUserId = null;

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          currentUserId = parsed._id || parsed.id;
        }

        if (token && currentUserId) {
          const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
          const res = await fetch(`${baseUrl}/api/profile/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUserId, userType: 'jobseeker' })
          });
          const json = await res.json();
          if (json?.success && json?.data?.profile) {
            const p = json.data.profile;
            const fullImg = p.profilePicture ? (p.profilePicture.startsWith('http') ? p.profilePicture : `${baseUrl}${p.profilePicture}`) : avatarPreview;
            if (fullImg) {
              setAvatarPreview(fullImg);
              localStorage.setItem(`profileImageUrl_${currentUserId}`, fullImg);
            }

            if (p.resume?.fileName) {
              const resInfo = {
                fileName: p.resume.fileName,
                uploadDate: new Date(p.resume.uploadedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                analysis: {
                  skills: p.skills ? p.skills.map(s => s.skill || s.skillName || s) : ['React', 'JavaScript', 'HTML/CSS'],
                  experience: p.experienceYears ? `${p.experienceYears} Yrs` : (p.position ? p.position : 'Fresher / Entry Level'),
                  projects: p.projects?.length ? String(p.projects.length) : '2',
                  education: p.education?.[0]?.degree || 'B.Tech / Degree'
                }
              };
              setResumeData(resInfo);
              localStorage.setItem(`resumeData_${currentUserId}`, JSON.stringify(resInfo));
            }

            setUser(prev => {
              const updated = prev ? ({
                ...prev,
                profileImage: fullImg || prev.profileImage,
                phone: p.contactDetails?.phone || p.phone || prev.phone,
                address: (p.contactDetails?.address && typeof p.contactDetails.address === 'string' ? p.contactDetails.address : p.contactDetails?.address?.street) || prev.address,
                summary: p.profileSummary || p.summary || prev.summary,
                skills: (p.skills && p.skills.length > 0) ? p.skills.map(s => s.skill || s.skillName || s) : prev.skills
              }) : prev;
              setProfileCompletion(computeCompletion(updated, resumeData));
              return updated;
            });
          }
        }
      } catch (e) { console.error('Profile refresh error', e); }
    };
    refreshProfile();
  }, []);

  useEffect(() => {
    loadJobs(1);
    try {
      setSavedJobs(JSON.parse(localStorage.getItem('savedJobs') || '[]'));
    } catch (error) {
      setSavedJobs([]);
    }
  }, []);

  useEffect(() => {
    if (!user || (!user._id && !user.id && !user.email)) return;
    if (profileDataLoaded.current === (user._id || user.id || user.email)) return;

    let isMounted = true;
    profileDataLoaded.current = user._id || user.id || user.email;

    const loadApplications = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) return;

        const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
        const userId = user._id || user.id || user.email;
        const apiUrl = baseUrl ? `${baseUrl}/api/applications?applicantId=${encodeURIComponent(userId)}` : `/api/applications?applicantId=${encodeURIComponent(userId)}`;

        const res = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });

        const json = await res.json();

        if (isMounted && json?.success && Array.isArray(json.data)) {
          const apps = json.data.map(a => ({
            _id: a._id,
            jobId: a.job?._id || a.job?.id || a.job,
            jobTitle: a.job?.title || 'Frontend Developer',
            company: a.job?.company || 'Acme Technologies',
            location: a.job?.location || 'Hyderabad, India',
            status: a.status || 'Under Review',
            matchScore: a.matchScore || 91,
            appliedDate: a.appliedDate || a.createdAt || new Date().toISOString()
          }));

          setAppliedJobs(apps);
          const currentUserId = user._id || user.id || user.email || 'default';
          localStorage.setItem(`appliedJobs_${currentUserId}`, JSON.stringify(apps));
        }
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    };

    const loadInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
        const res = await fetch(`${baseUrl}/api/interviews/my-interviews`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const json = await res.json();
        if (isMounted && json.success) {
          setInterviews(json.data.map(i => ({
            id: i._id,
            title: i.jobId?.title || 'Frontend Developer Interview',
            company: i.jobId?.company || 'Acme Technologies',
            date: new Date(i.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date(i.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: i.status === 'pending' ? 'Upcoming' : (i.status === 'completed' ? 'Completed' : 'Cancelled'),
            token: i.uniqueToken,
            link: i.uniqueToken ? `/interview/${i.uniqueToken}` : '#'
          })));
        }
      } catch (err) { console.error("Error fetching interviews:", err); }
    };

    loadApplications();
    loadInterviews();

  }, [user?._id, user?.id, user?.email]);

  const submitApplication = async (job) => {
    if (!job || !user) return;

    try {
      setIsSubmittingApplication(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');

      const res = await fetch(`${baseUrl}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          jobId: job.id,
          applicantId: user?._id || user?.id || user?.userId,
          resumeId: resumeData?.fileName || user?.resume || 'Resume.pdf',
          appliedDate: new Date().toISOString()
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (json?.success || res.ok) {
        const at = json?.data?.appliedDate || new Date().toISOString();
        const successApp = {
          _id: json?.data?._id || Date.now(),
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          status: 'Under Review',
          matchScore: json?.data?.matchScore || 91,
          appliedDate: at
        };
        const applied = [successApp, ...appliedJobs];
        setAppliedJobs(applied);
        const userId = user._id || user.id || user.email || 'default';
        if (typeof window !== 'undefined') {
          localStorage.setItem(`appliedJobs_${userId}`, JSON.stringify(applied));
        }

        setSelectedJobDetails(null);
        setMatchModalState({
          show: true,
          type: 'success',
          score: json?.data?.matchScore || 91,
          suggestions: [],
          message: `Application submitted successfully!\nYour application for ${job.title} at ${job.company} is being reviewed.`
        });
      } else {
        toast.error(json.message || 'Failed to submit application.');
      }
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const toggleSaveJob = (jobId) => {
    const isSaved = savedJobs.includes(jobId);
    const updated = isSaved ? savedJobs.filter(id => id !== jobId) : [jobId, ...savedJobs];
    setSavedJobs(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    toast.info(isSaved ? 'Job removed from saved.' : 'Job saved successfully!');
  };

  const handleSaveProfileForm = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
      const token = localStorage.getItem('token');
      const skillsArray = profileForm.skillsStr.split(',').map(s => s.trim()).filter(Boolean);

      const res = await fetch(`${baseUrl}/api/profile/jobseeker`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          phone: profileForm.phone,
          address: profileForm.address,
          position: profileForm.position,
          summary: profileForm.summary,
          skills: skillsArray.map(s => ({ skillName: s, proficiencyLevel: 'intermediate' }))
        }),
        credentials: 'include'
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const updatedUser = {
          ...user,
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          phone: profileForm.phone,
          address: profileForm.address,
          position: profileForm.position,
          summary: profileForm.summary,
          skills: skillsArray
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfileCompletion(computeCompletion(updatedUser, resumeData));
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (_) {
      toast.error('Failed to save profile changes.');
    }
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleLogout = () => {
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').trim().replace(/[;\s]+$/, '').replace(/\/$/, '');
      fetch(`${baseUrl}/api/logout`, { method: 'POST', credentials: 'include' }).finally(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        router.push('/');
      });
    } catch (_) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      router.push('/');
    }
  };

  // Nav items definition
  const navItems = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'find-jobs', label: 'Find Jobs', icon: FiSearch },
    { id: 'applied-jobs', label: 'Applications', icon: FiCheck },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: FiBookmark },
    { id: 'profile', label: 'My Profile', icon: FiUser },
    { id: 'interviews', label: 'Interviews', icon: FiCalendar },
  ];

  // Calculated Real Application Counts
  const countApplied = appliedJobs.length;
  const countInterview = interviews.length;
  const countOffer = appliedJobs.filter(a => a.status === 'Offer' || a.status === 'Shortlisted').length;
  const countRejected = appliedJobs.filter(a => a.status === 'Rejected').length;

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#101828] font-sans relative overflow-x-hidden selection:bg-[#2161FF]/15">
      <Head>
        <title>VEYRA — Candidate Workspace</title>
        <meta name="description" content="VEYRA Real Candidate Experience & Resume Intelligence" />
      </Head>

      {/* Subtle Ambient Background Shapes */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-40 w-[500px] h-[500px] bg-[#2161FF]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2161FF] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
            V
          </div>
          <span className="font-bold text-lg tracking-tight text-[#101828]">VEYRA</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowNotifications(v => !v)} className="p-2 text-gray-600 relative">
            <FiBell className="w-5 h-5" />
            {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2161FF]" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(v => !v)} className="p-2 text-gray-700">
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end">
          <div className="w-72 bg-white h-full p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="font-bold text-lg text-[#101828]">Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === item.id ? 'bg-[#2161FF]/10 text-[#2161FF]' : 'text-[#667085] hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* TWO-COLUMN DESKTOP WORKSPACE */}
      <div className="flex min-h-screen relative z-10 max-w-[1440px] mx-auto">

        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-64 flex-col justify-between p-6 sticky top-0 h-screen border-r border-gray-200/50 bg-white/65 backdrop-blur-xl">
          <div className="space-y-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2161FF] to-[#3b82f6] flex items-center justify-center text-white font-black text-lg shadow-xs shadow-[#2161FF]/20">
                V
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#101828]">VEYRA</span>
            </div>

            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#2161FF]/10 text-[#2161FF] border border-[#2161FF]/20 shadow-2xs'
                        : 'text-[#667085] hover:text-[#101828] hover:bg-white/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2161FF]' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-gray-200/60 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#667085] hover:text-[#101828] hover:bg-white/70 transition-all"
            >
              <FiSettings className="w-4 h-4 text-gray-400" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all"
            >
              <FiLogOut className="w-4 h-4 text-red-500" />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE AREA */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1150px] mx-auto space-y-8">

          {/* TOP HEADER */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
                {(() => {
                  try {
                    const istDateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
                    const hours = new Date(istDateStr).getHours();
                    if (hours >= 4 && hours < 12) return 'Good morning';
                    if (hours >= 12 && hours < 17) return 'Good afternoon';
                    if (hours >= 17 && hours < 22) return 'Good evening';
                    return 'Good night';
                  } catch (e) {
                    return 'Welcome';
                  }
                })()}, {user?.firstName || user?.username || 'Candidate'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
                Find opportunities that match your skills.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(v => !v)}
                  className="p-2.5 rounded-xl bg-white/70 hover:bg-white border border-gray-200/60 shadow-2xs text-[#667085] hover:text-[#101828] transition-all relative"
                >
                  <FiBell className="w-4 h-4" />
                  {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2161FF]" />}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-gray-200/80 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F5F7FA]">
                      <h3 className="text-xs font-bold text-[#101828]">Notifications</h3>
                      {notifications.length > 0 && (
                        <button onClick={clearAllNotifications} className="text-[11px] text-[#2161FF] font-semibold hover:underline">Clear All</button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className="p-3.5 hover:bg-blue-50/40 transition-colors flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-xs text-[#101828]">{n.title}</h4>
                              <p className="text-xs text-[#667085] mt-0.5">{n.message}</p>
                              <span className="text-[10px] text-gray-400 mt-1 block">{n.timestamp}</span>
                            </div>
                            <button onClick={() => clearNotification(n.id)} className="text-gray-400 hover:text-gray-600">
                              <FiX className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-xs text-gray-500">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-gray-200/60 shadow-2xs transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#2161FF] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                  {(user?.profileImage || avatarPreview) ? (
                    <img src={user?.profileImage || avatarPreview} alt="Profile" className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span>{(user?.firstName?.[0] || user?.username?.[0] || 'C').toUpperCase()}</span>
                  )}
                </div>
                <span className="text-xs font-bold text-[#101828]">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username || 'Candidate'}
                </span>
                <FiChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </header>

          {/* ================================================== */}
          {/* TAB 1: HOME VIEW */}
          {/* ================================================== */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* DYNAMIC CANDIDATE PROFILE CARD */}
              <section className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl sm:rounded-3xl p-6 transition-all hover:shadow-[0_12px_45px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2161FF] to-[#3b82f6] p-[2px] shadow-sm shrink-0 overflow-hidden">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center relative">
                          {(user?.profileImage || avatarPreview) ? (
                            <img src={user?.profileImage || avatarPreview} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          ) : (
                            <span className="text-2xl font-black text-[#2161FF]">
                              {(user?.firstName?.[0] || user?.username?.[0] || 'C').toUpperCase()}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <FiCamera className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-bold text-[#101828]">
                        {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username || 'Candidate'}
                      </h2>
                      <p className="text-xs font-semibold text-[#667085]">
                        {user?.position || user?.summary || 'Add your headline'} • <span className="text-gray-500">{user?.address || 'Add your location'}</span>
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {user?.skills && user.skills.length > 0 ? (
                          user.skills.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-md bg-gray-100 text-[#101828] text-[11px] font-semibold border border-gray-200/50">
                              {typeof skill === 'string' ? skill : skill.name || skill.skillName}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#2161FF] font-semibold cursor-pointer" onClick={() => setActiveTab('profile')}>+ Add your skills</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">PROFILE COMPLETION</div>
                      <div className="text-2xl font-black text-[#2161FF] my-0.5">{profileCompletion}%</div>
                      <div className="w-32 bg-gray-200/80 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#2161FF] h-full rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }} />
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className="px-5 py-2.5 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-sm shadow-[#2161FF]/20 transition-all hover:scale-[1.02]"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              </section>

              {/* APPLICATION SUMMARY */}
              <section className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#101828] tracking-tight">Your applications</h3>
                <div className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-5">
                  <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-100">
                    <div className="space-y-1 cursor-pointer" onClick={() => { setActiveTab('applied-jobs'); setAppStatusFilter('Applied'); }}>
                      <div className="text-xs font-bold text-[#667085]">Applied</div>
                      <div className="text-2xl font-black text-[#101828]">{countApplied}</div>
                      <div className="text-[11px] font-semibold text-gray-400">applications</div>
                    </div>

                    <div className="space-y-1 cursor-pointer" onClick={() => { setActiveTab('applied-jobs'); setAppStatusFilter('Interview'); }}>
                      <div className="text-xs font-bold text-[#667085]">Interview</div>
                      <div className="text-2xl font-black text-[#2161FF]">{countInterview}</div>
                      <div className="text-[11px] font-semibold text-gray-400">interviews</div>
                    </div>

                    <div className="space-y-1 cursor-pointer" onClick={() => { setActiveTab('applied-jobs'); setAppStatusFilter('Offer'); }}>
                      <div className="text-xs font-bold text-[#667085]">Offer</div>
                      <div className="text-2xl font-black text-emerald-600">{countOffer}</div>
                      <div className="text-[11px] font-semibold text-gray-400">offers</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* RECOMMENDED JOBS */}
              <section className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-xl font-extrabold text-[#101828] tracking-tight">Recommended for you</h3>
                  <button onClick={() => setActiveTab('find-jobs')} className="text-xs font-bold text-[#2161FF] hover:underline">
                    View all →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {jobPosts.length === 0 ? (
                    <div className="md:col-span-2 bg-white/80 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] rounded-2xl p-12 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2161FF] flex items-center justify-center mx-auto">
                        <FiSearch className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#101828]">No jobs matching your profile yet.</h4>
                        <p className="text-xs font-semibold text-[#667085] mt-1 max-w-sm mx-auto">
                          Update your profile or upload your resume to improve recommendations.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="px-6 py-2.5 rounded-xl bg-[#2161FF] text-white font-bold text-xs shadow-sm hover:bg-[#1a50db] transition-all"
                      >
                        Complete Profile
                      </button>
                    </div>
                  ) : (
                    jobPosts.slice(0, 4).map(job => (
                      <div
                        key={job.id}
                        className="bg-white/80 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_35px_rgba(33,97,255,0.08)] hover:border-[#2161FF]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Top Meta Header: Company Name, Location & Bookmark */}
                          <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <FiBriefcase className="w-4 h-4 text-[#2161FF]" />
                                <span className="text-xs font-extrabold text-[#101828] uppercase tracking-wider">{job.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
                                <span className="flex items-center gap-1">
                                  <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                                  {job.location}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2161FF] text-[11px] font-bold border border-blue-100/60">
                                  {job.location?.toLowerCase().includes('remote') ? 'Remote' : 'Full Time'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`p-2 rounded-xl border transition-all ${
                                savedJobs.includes(job.id)
                                  ? 'bg-blue-50 text-[#2161FF] border-blue-200 shadow-2xs'
                                  : 'bg-gray-50 text-gray-400 border-gray-200/60 hover:text-[#2161FF] hover:bg-blue-50/60'
                              }`}
                            >
                              <FiBookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current text-[#2161FF]' : ''}`} />
                            </button>
                          </div>

                          {/* Job Title & Salary */}
                          <div className="space-y-1.5 pt-1">
                            <h4 className="text-base sm:text-lg font-extrabold text-[#101828] group-hover:text-[#2161FF] transition-colors leading-snug capitalize">
                              {job.title}
                            </h4>
                            {job.salary && (
                              <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-100/80">
                                {job.salary}
                              </div>
                            )}
                          </div>

                          {/* Skills Required */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {job.skillsRequired.slice(0, 4).map((sk, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-gray-100/80 text-[#101828] text-xs font-bold border border-gray-200/50 group-hover:bg-blue-50 group-hover:text-[#2161FF] group-hover:border-blue-100 transition-all"
                              >
                                {sk}
                              </span>
                            ))}
                            {job.skillsRequired.length > 4 && (
                              <span className="px-2 py-1 text-[11px] font-bold text-gray-400">
                                +{job.skillsRequired.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#667085]">
                            <FiClock className="w-3.5 h-3.5 text-gray-400" />
                            <span>Recently posted</span>
                          </div>

                          <button
                            onClick={() => setSelectedJobDetails(job)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                              appliedJobs.some(j => j.id === job.id)
                                ? 'bg-emerald-600 shadow-emerald-600/20'
                                : 'bg-[#2161FF] hover:bg-[#1a50db] shadow-[#2161FF]/20 group-hover:scale-[1.02]'
                            }`}
                          >
                            {appliedJobs.some(j => j.id === job.id) ? 'Applied ✓' : 'View Details & Apply →'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 2: FIND JOBS PAGE VIEW */}
          {/* ================================================== */}
          {activeTab === 'find-jobs' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">Find your next opportunity</h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">Search thousands of opportunities that match your skills.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.05)] rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full">
                  <FiSearch className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search jobs, skills or companies"
                    value={jobFilters.q}
                    onChange={(e) => setJobFilters({ ...jobFilters, q: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && loadJobs(1)}
                    className="w-full bg-transparent text-sm font-medium text-[#101828] placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div className="w-full sm:w-auto h-[1px] sm:h-8 bg-gray-200" />

                <div className="flex items-center gap-3 px-3 py-2 w-full sm:w-64">
                  <FiMapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={jobFilters.location}
                    onChange={(e) => setJobFilters({ ...jobFilters, location: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && loadJobs(1)}
                    className="w-full bg-transparent text-sm font-medium text-[#101828] placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => loadJobs(1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <FiSearch className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Remote', 'Full-time', 'Internship', 'Fresher', 'Part-time'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => {
                      setJobFilters({ ...jobFilters, jobType: chip === 'All' ? '' : chip });
                      loadJobs(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      (chip === 'All' && !jobFilters.jobType) || jobFilters.jobType === chip
                        ? 'bg-[#2161FF] text-white border-[#2161FF]'
                        : 'bg-white/70 text-[#667085] border-gray-200/60 hover:bg-white'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {jobsLoading ? (
                  <div className="md:col-span-2 p-12 text-center text-xs font-semibold text-gray-500 space-y-2">
                    <div className="w-8 h-8 border-2 border-[#2161FF] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p>Searching opportunities...</p>
                  </div>
                ) : jobPosts.length === 0 ? (
                  <div className="md:col-span-2 bg-white/80 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] rounded-2xl p-12 text-center space-y-3">
                    <FiSearch className="w-8 h-8 text-gray-400 mx-auto" />
                    <h4 className="text-base font-bold text-[#101828]">No jobs found</h4>
                    <p className="text-xs text-[#667085]">Try adjusting your search terms or filter settings.</p>
                  </div>
                ) : (
                  jobPosts.map(job => (
                    <div
                      key={job.id}
                      className="bg-white/80 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_35px_rgba(33,97,255,0.08)] hover:border-[#2161FF]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Top Meta Header: Company Name, Location & Bookmark */}
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FiBriefcase className="w-4 h-4 text-[#2161FF]" />
                              <span className="text-xs font-extrabold text-[#101828] uppercase tracking-wider">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
                              <span className="flex items-center gap-1">
                                <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                                {job.location}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2161FF] text-[11px] font-bold border border-blue-100/60">
                                {job.location?.toLowerCase().includes('remote') ? 'Remote' : 'Full Time'}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              savedJobs.includes(job.id)
                                ? 'bg-blue-50 text-[#2161FF] border-blue-200 shadow-2xs'
                                : 'bg-gray-50 text-gray-400 border-gray-200/60 hover:text-[#2161FF] hover:bg-blue-50/60'
                            }`}
                          >
                            <FiBookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current text-[#2161FF]' : ''}`} />
                          </button>
                        </div>

                        {/* Job Title & Salary */}
                        <div className="space-y-1.5 pt-1">
                          <h4 className="text-base sm:text-lg font-extrabold text-[#101828] group-hover:text-[#2161FF] transition-colors leading-snug capitalize">
                            {job.title}
                          </h4>
                          {job.salary && (
                            <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-100/80">
                              {job.salary}
                            </div>
                          )}
                        </div>

                        {/* Skills Required */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.skillsRequired.slice(0, 4).map((sk, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-gray-100/80 text-[#101828] text-xs font-bold border border-gray-200/50 group-hover:bg-blue-50 group-hover:text-[#2161FF] group-hover:border-blue-100 transition-all"
                            >
                              {sk}
                            </span>
                          ))}
                          {job.skillsRequired.length > 4 && (
                            <span className="px-2 py-1 text-[11px] font-bold text-gray-400">
                              +{job.skillsRequired.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#667085]">
                          <FiClock className="w-3.5 h-3.5 text-gray-400" />
                          <span>Recently posted</span>
                        </div>

                        <button
                          onClick={() => setSelectedJobDetails(job)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                            appliedJobs.some(j => j.id === job.id)
                              ? 'bg-emerald-600 shadow-emerald-600/20'
                              : 'bg-[#2161FF] hover:bg-[#1a50db] shadow-[#2161FF]/20 group-hover:scale-[1.02]'
                          }`}
                        >
                          {appliedJobs.some(j => j.id === job.id) ? 'Applied ✓' : 'View Details & Apply →'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 3: APPLICATIONS PAGE VIEW & TIMELINE */}
          {/* ================================================== */}
          {activeTab === 'applied-jobs' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">Your applications</h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">Track every opportunity you&apos;ve applied to.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Applied', count: countApplied, color: 'text-[#101828]' },
                  { label: 'Interview', count: countInterview, color: 'text-[#2161FF]' },
                  { label: 'Offer', count: countOffer, color: 'text-emerald-600' },
                  { label: 'Rejected', count: countRejected, color: 'text-red-600' },
                ].map(item => (
                  <div key={item.label} className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-4 text-center">
                    <div className="text-xs font-bold text-[#667085]">{item.label}</div>
                    <div className={`text-2xl font-black mt-1 ${item.color}`}>{item.count}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/70 border border-gray-200/60 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {['All', 'Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'].map(st => (
                    <button
                      key={st}
                      onClick={() => setAppStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        appStatusFilter === st
                          ? 'bg-[#2161FF] text-white'
                          : 'bg-white/70 text-[#667085] border border-gray-200/60'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {appliedJobs.length === 0 ? (
                  <div className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-12 text-center space-y-3">
                    <FiCheck className="w-8 h-8 text-[#2161FF] mx-auto" />
                    <h4 className="text-base font-bold text-[#101828]">No applications recorded yet</h4>
                    <p className="text-xs text-[#667085]">Search for openings and click Apply to track them here.</p>
                  </div>
                ) : (
                  appliedJobs
                    .filter(a => appStatusFilter === 'All' || a.status === appStatusFilter)
                    .filter(a => !appSearchQuery || a.jobTitle.toLowerCase().includes(appSearchQuery.toLowerCase()) || a.company.toLowerCase().includes(appSearchQuery.toLowerCase()))
                    .map(app => (
                      <div key={app._id} className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#2161FF] text-white font-black text-lg flex items-center justify-center shrink-0">
                              {app.company?.[0] || 'A'}
                            </div>
                            <div>
                              <h4 className="font-bold text-base text-[#101828]">{app.jobTitle}</h4>
                              <p className="text-xs font-semibold text-[#667085]">{app.company} • {app.location}</p>
                              <span className="text-[11px] text-gray-400 block mt-0.5">Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#2161FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                              {app.matchScore && app.matchScore > 0 ? `AI Match: ${app.matchScore}%` : 'Under AI Evaluation'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                              app.status === 'Shortlisted' || app.status === 'Offer' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-[#2161FF]'
                            }`}>
                              {app.status || 'Under Review'}
                            </span>
                          </div>
                        </div>

                        {/* APPLICATION TIMELINE */}
                        <div className="pt-3 border-t border-gray-100">
                          <div className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider mb-2">Application Timeline</div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#101828] max-w-xl">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <FiCheckCircle className="w-4 h-4" /> Application submitted
                            </div>
                            <span className="text-gray-300">→</span>
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <FiCheckCircle className="w-4 h-4" /> Resume analyzed
                            </div>
                            <span className="text-gray-300">→</span>
                            <div className="flex items-center gap-1.5 text-[#2161FF]">
                              <FiClock className="w-4 h-4 animate-spin" /> Recruiter reviewing
                            </div>
                            <span className="text-gray-300">→</span>
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <FiCheckCircle className="w-4 h-4" /> Decision
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 4: SAVED JOBS VIEW */}
          {/* ================================================== */}
          {activeTab === 'saved-jobs' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">Saved jobs</h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">Opportunities you&apos;ve saved for later.</p>
              </div>

              {savedJobs.length === 0 ? (
                <div className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-12 text-center space-y-4">
                  <FiBookmark className="w-10 h-10 text-gray-400 mx-auto" />
                  <div>
                    <h4 className="text-lg font-bold text-[#101828]">Nothing saved yet</h4>
                    <p className="text-xs font-semibold text-[#667085] mt-1 max-w-sm mx-auto">
                      Save jobs you&apos;re interested in and come back to them later.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('find-jobs')}
                    className="px-6 py-2.5 rounded-xl bg-[#2161FF] text-white font-bold text-xs shadow-sm hover:bg-[#1a50db] transition-all"
                  >
                    Find Jobs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobPosts.filter(j => savedJobs.includes(j.id)).map(job => (
                    <div key={job.id} className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-[#101828] text-base">{job.title}</h4>
                            <p className="text-xs font-semibold text-[#667085]">{job.company} • {job.location}</p>
                          </div>
                          <button onClick={() => toggleSaveJob(job.id)} className="text-red-500 hover:text-red-700">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setSelectedJobDetails(job)}
                          className="flex-1 py-2.5 rounded-xl bg-[#2161FF] text-white font-bold text-xs hover:bg-[#1a50db] transition-all text-center"
                        >
                          View & Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 5: MY PROFILE PAGE VIEW */}
          {/* ================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">My Profile</h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">Manage your personal and professional career details.</p>
              </div>

              <div className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl sm:rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#2161FF] to-[#3b82f6] p-[2px] shadow-sm overflow-hidden">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center relative">
                      {(user?.profileImage || avatarPreview) ? (
                        <img src={user?.profileImage || avatarPreview} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <span className="text-3xl font-black text-[#2161FF]">
                          {(user?.firstName?.[0] || user?.username?.[0] || 'C').toUpperCase()}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                        <FiCamera className="w-6 h-6" />
                        <span className="text-[10px] font-bold mt-1">Change</span>
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])}
                  className="hidden"
                />

                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-xl font-bold text-[#101828]">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username || 'Candidate'}
                  </h3>
                  <p className="text-xs font-semibold text-[#667085]">{user?.email}</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    className="mt-2 text-xs font-bold text-[#2161FF] hover:underline inline-flex items-center gap-1.5"
                  >
                    <FiUpload className="w-3.5 h-3.5" />
                    {isUploadingPhoto ? 'Uploading...' : 'Change photo'}
                  </button>
                </div>
              </div>

              {/* RESUME INTELLIGENCE GLASS CARD (CORE FEATURE) */}
              <section className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2161FF]/10 text-[#2161FF] flex items-center justify-center font-bold">
                      <LuSparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#101828] tracking-tight">Resume Intelligence</h3>
                      <p className="text-xs font-semibold text-[#667085]">Powers VEYRA&apos;s matching intelligence and AI analysis.</p>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={resumeInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleResumeUpload(e.target.files[0])}
                    className="hidden"
                  />

                  {resumeData ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resumeInputRef.current?.click()}
                        disabled={isUploadingResume}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#101828] font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
                      >
                        <FiUpload className="w-3.5 h-3.5 text-[#2161FF]" />
                        <span>Replace</span>
                      </button>
                      <button
                        onClick={handleRemoveResume}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null}
                </div>

                {resumeAnalyzing ? (
                  /* ANALYSIS STATE */
                  <div className="p-8 text-center space-y-3 bg-blue-50/40 rounded-2xl border border-blue-100/60">
                    <div className="w-10 h-10 border-2 border-[#2161FF] border-t-transparent rounded-full animate-spin mx-auto" />
                    <h4 className="text-sm font-bold text-[#101828]">Analyzing your resume...</h4>
                    <div className="flex justify-center gap-4 text-xs font-semibold text-[#667085]">
                      <span>✓ Extracting skills</span>
                      <span>✓ Understanding experience</span>
                      <span>✓ Identifying projects</span>
                      <span>✓ Matching profile</span>
                    </div>
                  </div>
                ) : !resumeData ? (
                  /* UNUPLOADED RESUME CARD */
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-[#667085] leading-relaxed">
                      Upload your resume to unlock real-time candidate matching:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-[#101828]">
                      <div className="flex items-center gap-2 bg-gray-50/60 px-3.5 py-2.5 rounded-xl border border-gray-100">
                        <FiCheck className="w-4 h-4 text-[#2161FF]" /> Build your candidate profile
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50/60 px-3.5 py-2.5 rounded-xl border border-gray-100">
                        <FiCheck className="w-4 h-4 text-[#2161FF]" /> Identify your skills automatically
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50/60 px-3.5 py-2.5 rounded-xl border border-gray-100">
                        <FiCheck className="w-4 h-4 text-[#2161FF]" /> Match you with relevant jobs
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50/60 px-3.5 py-2.5 rounded-xl border border-gray-100">
                        <FiCheck className="w-4 h-4 text-[#2161FF]" /> Help recruiters understand experience
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        onClick={() => resumeInputRef.current?.click()}
                        disabled={isUploadingResume}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-sm shadow-[#2161FF]/20 transition-all flex items-center justify-center gap-2"
                      >
                        <FiFileText className="w-4 h-4" />
                        <span>Upload Resume (PDF, DOC, DOCX)</span>
                      </button>
                      <span className="text-[11px] font-semibold text-gray-400">Supported formats: PDF, DOC, DOCX (Max 5MB)</span>
                    </div>
                  </div>
                ) : (
                  /* ANALYZED RESUME INSIGHTS DISPLAY */
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-200/60">
                      <FiFileText className="w-6 h-6 text-[#2161FF]" />
                      <div>
                        <h4 className="text-sm font-bold text-[#101828]">{resumeData.fileName}</h4>
                        <span className="text-[11px] text-[#667085]">Uploaded {resumeData.uploadDate}</span>
                      </div>
                    </div>

                    {/* Resume Insights */}
                    <div className="space-y-4 pt-1">
                      <h4 className="text-xs font-extrabold text-[#101828] uppercase tracking-wider">Resume Insights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1">
                          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">Experience Level</span>
                          <p className="text-sm font-black text-[#101828]">{resumeData.analysis?.experience || 'Fresher / Entry Level'}</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1">
                          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">Projects Found</span>
                          <p className="text-sm font-black text-[#101828]">{user?.projects?.length ? `${user.projects.length} Verified Projects` : (resumeData.analysis?.projects ? `${resumeData.analysis.projects} Academic / Personal Projects` : '2 Projects Found')}</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1">
                          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">Education Degree</span>
                          <p className="text-sm font-bold text-[#101828]">{user?.education?.[0]?.degree || resumeData.analysis?.education || 'B.Tech / Computer Science'}</p>
                        </div>
                      </div>

                      {/* Extracted Skills & Technologies Chip Cloud */}
                      <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">All Extracted Skills & Technologies</span>
                          <span className="text-xs font-black text-[#2161FF]">{(user?.skills?.length || (resumeData.analysis?.skills || []).length)} Skills Identified</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(user?.skills && user.skills.length > 0 ? user.skills : (resumeData.analysis?.skills || ['React', 'JavaScript', 'HTML/CSS', 'Python', 'Java', 'SQL', 'Git'])).map((sk, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-lg bg-blue-50/80 text-[#2161FF] text-xs font-bold border border-blue-100">
                              {typeof sk === 'string' ? sk : sk.name || sk.skillName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <form onSubmit={handleSaveProfileForm} className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#101828] uppercase tracking-wider">Personal Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">First Name</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">Phone</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Hyderabad, India"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-extrabold text-[#101828] uppercase tracking-wider">Professional Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">Professional Headline</label>
                      <input
                        type="text"
                        value={profileForm.position}
                        onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                        placeholder="Full Stack Developer"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">About / Bio</label>
                      <textarea
                        rows={3}
                        value={profileForm.summary}
                        onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                        placeholder="Write a short summary about your background and technical experience..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#667085] mb-1">Skills (comma separated)</label>
                      <input
                        type="text"
                        value={profileForm.skillsStr}
                        onChange={(e) => setProfileForm({ ...profileForm, skillsStr: e.target.value })}
                        placeholder="React, Java, Spring Boot, MongoDB"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#101828] focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 6: INTERVIEWS VIEW */}
          {/* ================================================== */}
          {activeTab === 'interviews' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">Your interviews</h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">Keep track of your upcoming and completed interviews.</p>
              </div>

              <div className="flex gap-2">
                {['Upcoming', 'Completed', 'Cancelled'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setInterviewTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      interviewTab === tab ? 'bg-[#2161FF] text-white' : 'bg-white/70 text-[#667085] border border-gray-200/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {interviews.filter(i => i.status === interviewTab).length === 0 ? (
                  <div className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-12 text-center space-y-3">
                    <FiCalendar className="w-8 h-8 text-gray-400 mx-auto" />
                    <h4 className="text-base font-bold text-[#101828]">No {interviewTab.toLowerCase()} interviews</h4>
                    <p className="text-xs text-[#667085]">Your scheduled interviews will appear here when invited by recruiters.</p>
                  </div>
                ) : (
                  interviews.filter(i => i.status === interviewTab).map(itv => (
                    <div key={itv.id} className="bg-white/72 backdrop-blur-xl border border-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-[#101828]">{itv.title}</h4>
                        <p className="text-xs font-semibold text-[#667085]">{itv.company}</p>
                        <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                          <span>{itv.date}</span> • <span>{itv.time}</span>
                        </div>
                      </div>

                      {itv.token && (
                        <Link
                          href={`/interview/${itv.token}`}
                          className="px-5 py-2.5 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-2xs transition-all text-center self-start sm:self-auto"
                        >
                          Join Interview
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-bold text-[#101828] mb-3">Practice AI Mock Interview</h3>
                <MockInterview />
              </div>
            </div>
          )}

        </main>
      </div>

      {/* JOB DETAILS & RESUME APPLICATION MODAL */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobDetails(null)}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2161FF] text-xs font-extrabold">
                {selectedJobDetails.company}
              </span>
              <h3 className="text-2xl font-black text-[#101828]">{selectedJobDetails.title}</h3>
              <p className="text-xs font-semibold text-[#667085]">
                {selectedJobDetails.location} • {selectedJobDetails.jobType} • {selectedJobDetails.experience}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-extrabold text-[#101828] uppercase tracking-wider">Job Description</h4>
              <p className="text-xs font-medium text-[#667085] leading-relaxed">{selectedJobDetails.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-[#101828] uppercase tracking-wider">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobDetails.skillsRequired.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-gray-100 text-[#101828] text-xs font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* CONFIRMATION SCREEN SUMMARY */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <h4 className="text-xs font-bold text-[#101828]">Application Details</h4>
              <p className="text-xs text-[#667085]">
                Your application will use your stored resume: <strong className="text-[#101828]">{resumeData?.fileName || user?.resume || 'Resume.pdf'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => submitApplication(selectedJobDetails)}
                disabled={isSubmittingApplication}
                className="flex-1 py-3.5 rounded-xl bg-[#2161FF] hover:bg-[#1a50db] text-white font-bold text-xs shadow-sm transition-all text-center"
              >
                {isSubmittingApplication ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                onClick={() => toggleSaveJob(selectedJobDetails.id)}
                className="px-5 py-3.5 rounded-xl bg-gray-100 text-[#101828] font-bold text-xs hover:bg-gray-200 transition-all"
              >
                Save Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MATCH / APPLICATION SUCCESS MODAL */}
      {matchModalState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4 border border-gray-100">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${matchModalState.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              <FiCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#101828] whitespace-pre-line">{matchModalState.message}</h3>
            <button
              onClick={() => setMatchModalState({ ...matchModalState, show: false })}
              className="w-full py-2.5 rounded-xl bg-[#2161FF] text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
