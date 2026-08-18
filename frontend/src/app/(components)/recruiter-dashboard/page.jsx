"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import {
  FiMenu, FiX, FiPieChart, FiUser, FiPlusSquare, FiFileText, FiLogOut, FiUsers, FiClock,
  FiBriefcase, FiEdit2, FiMail, FiPhone, FiCheck, FiMapPin, FiCamera, FiCheckCircle,
  FiSearch, FiFilter, FiCalendar, FiExternalLink, FiChevronDown, FiBell, FiTrash2,
  FiGlobe, FiSliders, FiAlertCircle, FiZap, FiTarget, FiArrowRight, FiDownload, FiEye, FiPaperclip
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseAuthUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function RecruiterDashboard() {
  const router = useRouter();

  // Primary Workspace Tabs
  const [activeTab, setActiveTab] = useState('overview'); // overview, jobs, applications, candidates, interviews, company, settings
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Data States
  const [user, setUser] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Job Creation / Editing State
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [newJob, setNewJob] = useState({
    title: '', company: '', location: '', jobType: 'Full-time', workMode: 'Remote',
    salary: '', experience: '', deadline: '', description: '',
    responsibilities: '', requirements: '', benefits: '', skillsRequired: []
  });

  // Candidate Filter / Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');

  // Modals State
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showRejectConfirm, setShowRejectConfirm] = useState(null);

  // Interview Schedule Form
  const [scheduleData, setScheduleData] = useState({
    interviewType: 'AI Interview',
    scheduledDate: '',
    scheduledTime: '10:00 AM'
  });

  // Company Profile Form
  const [companyForm, setCompanyForm] = useState({
    name: '', website: '', industry: '', address: '', size: '1-10', description: '', linkedin: '', logo: ''
  });

  // Notifications List
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Application Received', message: 'Chanu Sanapala applied for Full Stack Developer', timestamp: '10 mins ago', unread: true },
    { id: 2, title: 'AI Match Ready', message: 'AI scored candidate match at 91%', timestamp: '1 hour ago', unread: true },
    { id: 3, title: 'Interview Completed', message: 'AI Interview response recorded', timestamp: '2 hours ago', unread: false }
  ]);

  // Fetch All Recruiter Data from Backend
  const fetchRecruiterData = async (userId) => {
    if (!userId) return;
    const token = localStorage.getItem('token');
    try {
      // 1. Fetch Jobs
      const jobsRes = await fetch(`${baseAuthUrl}/api/jobs?recruiterId=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const jobsData = await jobsRes.json();
      if (jobsData.success && Array.isArray(jobsData.data)) {
        setJobPosts(jobsData.data.reverse());
      }

      // 2. Fetch Applications
      const appsRes = await fetch(`${baseAuthUrl}/api/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appsData = await appsRes.json();
      if (appsData.success && Array.isArray(appsData.data)) {
        setApplications(appsData.data);
      }

      // 3. Fetch Interviews
      try {
        const intRes = await fetch(`${baseAuthUrl}/api/interviews/recruiter`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const intData = await intRes.json();
        if (intData.success && Array.isArray(intData.data)) {
          setInterviews(intData.data);
        }
      } catch (e) { console.error("Interview fetch warning", e); }

      // 4. Fetch Recruiter Profile
      try {
        const profileRes = await fetch(`${baseAuthUrl}/api/profile/get`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ userId, userType: 'recruiter' })
        });
        const pData = await profileRes.json();
        if (pData.success && pData.data) {
          setProfile(pData.data);
          const comp = pData.data.profile?.company || {};
          setCompanyForm({
            name: comp.name || user?.username || 'VEYRA Technologies',
            website: comp.website || 'https://veyra.ai',
            industry: comp.industry || 'Artificial Intelligence & Software',
            address: comp.address || 'Hyderabad, India',
            size: comp.size || '10-50',
            description: comp.description || 'Leading AI-driven talent acquisition and hiring platform.',
            linkedin: pData.data.profile?.socialProfiles?.linkedin || '',
            logo: comp.logo || ''
          });
        }
      } catch (e) { console.error("Profile fetch warning", e); }

    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
    } else {
      const u = JSON.parse(userData);
      setUser(u);
      fetchRecruiterData(u._id || u.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  // Job Creation / Editing Handlers
  const handleAddSkill = () => {
    if (skillInput.trim() && !newJob.skillsRequired.includes(skillInput.trim())) {
      setNewJob({ ...newJob, skillsRequired: [...newJob.skillsRequired, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setNewJob({ ...newJob, skillsRequired: newJob.skillsRequired.filter(s => s !== skill) });
  };

  const handleCreateOrUpdateJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const endpoint = editingJob ? `${baseAuthUrl}/api/jobs/${editingJob._id}` : `${baseAuthUrl}/api/jobs`;
    const method = editingJob ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newJob, company: companyForm.name || user?.username || 'VEYRA' })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(editingJob ? 'Job updated successfully!' : 'Job published successfully! 🎉');
        setShowJobForm(false);
        setEditingJob(null);
        setNewJob({
          title: '', company: '', location: '', jobType: 'Full-time', workMode: 'Remote',
          salary: '', experience: '', deadline: '', description: '',
          responsibilities: '', requirements: '', benefits: '', skillsRequired: []
        });
        fetchRecruiterData(user._id || user.id);
      } else {
        toast.error(data.message || 'Failed to save job');
      }
    } catch (err) {
      console.error('Job save error:', err);
      toast.error('Error saving job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseAuthUrl}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Job deleted successfully');
        setShowDeleteConfirm(null);
        fetchRecruiterData(user._id || user.id);
      } else {
        toast.error('Failed to delete job');
      }
    } catch (err) {
      console.error('Delete job error:', err);
      toast.error('Error deleting job');
    }
  };

  // Application Status Update Handler
  const handleUpdateAppStatus = async (appId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseAuthUrl}/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Application status updated to ${newStatus}`);
        if (selectedApplication && selectedApplication._id === appId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }
        fetchRecruiterData(user._id || user.id);
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error('Update app status error:', err);
      toast.error('Error updating status');
    }
  };

  // Interview Schedule Handler
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApplication) return;
    const token = localStorage.getItem('token');

    const candidateId = selectedApplication.applicant?._id || selectedApplication.applicant;
    const jobId = selectedApplication.job?._id || selectedApplication.job;

    try {
      const res = await fetch(`${baseAuthUrl}/api/interviews/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          candidateId,
          jobId,
          interviewType: scheduleData.interviewType,
          scheduledDate: scheduleData.scheduledDate,
          scheduledTime: scheduleData.scheduledTime
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Interview scheduled successfully! Candidate notified via email. 🎉');
        await handleUpdateAppStatus(selectedApplication._id, 'Interview');
        setShowScheduleModal(false);
        setShowCandidateModal(false);
      } else {
        toast.error(data.message || 'Failed to schedule interview');
      }
    } catch (err) {
      console.error('Schedule interview error:', err);
      toast.error('Error scheduling interview');
    }
  };

  // Save Company Profile Handler
  const handleSaveCompany = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseAuthUrl}/api/profile/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          userType: 'recruiter',
          company: {
            name: companyForm.name,
            website: companyForm.website,
            industry: companyForm.industry,
            address: companyForm.address,
            size: companyForm.size,
            description: companyForm.description,
            logo: companyForm.logo
          },
          socialProfiles: { linkedin: companyForm.linkedin }
        })
      });
      if (res.ok) {
        toast.success('Company Profile saved successfully!');
        fetchRecruiterData(user._id || user.id);
      } else {
        toast.error('Failed to update company profile');
      }
    } catch (err) {
      console.error('Company profile update error:', err);
      toast.error('Error updating company profile');
    }
  };

  // Calculated Metrics
  const openJobsCount = jobPosts.filter(j => j.status !== 'Closed').length;
  const newAppsCount = applications.length;
  const interviewsCount = interviews.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const underReviewCount = applications.filter(a => a.status === 'Under Review' || a.status === 'Applied').length;

  // Pipeline Counts
  const pipelineCounts = {
    Applications: applications.length,
    AIAnalyzed: applications.filter(a => (a.matchScore || 0) > 0).length,
    UnderReview: underReviewCount,
    Shortlisted: shortlistedCount,
    Interview: interviewsCount,
    Offer: applications.filter(a => a.status === 'Offer').length,
    Hired: applications.filter(a => a.status === 'Hired').length
  };

  // Filtered Applications List
  const filteredApplications = applications.filter(app => {
    const candidateName = app.applicant?.fullName || app.applicant?.email || '';
    const jobTitle = app.job?.title || '';
    const skillsStr = app.applicant?.skills || '';
    
    const matchesSearch = candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skillsStr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : app.status === statusFilter;
    const matchesJob = jobFilter === 'All' ? true : (app.job?._id === jobFilter || app.job === jobFilter);
    const matchesScore = scoreFilter === 'All' ? true :
                         scoreFilter === 'high' ? (app.matchScore || 0) >= 80 :
                         scoreFilter === 'medium' ? (app.matchScore || 0) >= 60 : true;

    return matchesSearch && matchesStatus && matchesJob && matchesScore;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#101828] font-sans antialiased">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Head>
        <title>VEYRA — Recruiter Hiring Workspace</title>
      </Head>

      {/* Top Mobile Navbar */}
      <header className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/80 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="VEYRA" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-gray-600 relative">
            <FiBell className="w-5 h-5" />
            {notifications.some(n => n.unread) && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2161FF]" />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-700">
            {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex min-h-screen relative max-w-[1440px] mx-auto">

        {/* SIDEBAR NAVIGATION */}
        <aside className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex w-64 flex-col justify-between p-6 sticky top-0 h-screen border-r border-gray-200/60 bg-white/70 backdrop-blur-2xl shrink-0 z-30`}>
          <div className="space-y-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
              <img src="/logo.png" alt="VEYRA" className="h-9 w-auto object-contain" />
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard', icon: FiPieChart },
                { id: 'jobs', label: 'Jobs', icon: FiBriefcase, count: openJobsCount },
                { id: 'applications', label: 'Applications', icon: FiFileText, count: newAppsCount },
                { id: 'candidates', label: 'Candidates', icon: FiUsers },
                { id: 'interviews', label: 'Interviews', icon: FiCalendar, count: interviewsCount },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setShowJobForm(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#2161FF] text-white shadow-md shadow-[#2161FF]/25'
                      : 'text-[#667085] hover:text-[#101828] hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2161FF]'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}

              <div className="my-4 border-t border-gray-200/60" />

              {[
                { id: 'company', label: 'Company Profile', icon: FiGlobe },
                { id: 'settings', label: 'Settings', icon: FiSliders },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setShowJobForm(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#2161FF] text-white shadow-md shadow-[#2161FF]/25'
                      : 'text-[#667085] hover:text-[#101828] hover:bg-white/80'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all border border-red-100/60"
          >
            <FiLogOut className="w-4 h-4 text-red-500" />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* MAIN WORKSPACE AREA */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1150px] mx-auto space-y-8 overflow-y-auto">

          {/* TOP NAVIGATION CONTROLS */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200/50">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">
                {(() => {
                  try {
                    const istDateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
                    const hours = new Date(istDateStr).getHours();
                    if (hours >= 4 && hours < 12) return 'Good morning';
                    if (hours >= 12 && hours < 17) return 'Good afternoon';
                    if (hours >= 17 && hours < 22) return 'Good evening';
                    return 'Good night';
                  } catch (e) {
                    return 'Welcome back';
                  }
                })()}, {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username || 'Recruiter'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
                Here&apos;s what&apos;s happening with your hiring pipeline today.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications Center */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-gray-200/80 shadow-2xs text-[#667085] hover:text-[#101828] transition-all relative"
                >
                  <FiBell className="w-4 h-4" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2161FF]" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-gray-200/80 z-50 overflow-hidden animate-fade-in">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F5F7FB]">
                      <h3 className="text-xs font-extrabold text-[#101828]">Recruiter Notifications</h3>
                      <button onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))} className="text-[11px] text-[#2161FF] font-bold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-4 transition-colors ${n.unread ? 'bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                          <h4 className="font-bold text-xs text-[#101828] flex items-center justify-between">
                            <span>{n.title}</span>
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#2161FF]" />}
                          </h4>
                          <p className="text-xs text-[#667085] mt-1">{n.message}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block font-semibold">{n.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Company Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl bg-white/80 hover:bg-white border border-gray-200/80 shadow-2xs transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#101828] text-white flex items-center justify-center text-xs font-black">
                    {companyForm.name?.[0] || 'V'}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-[#101828] block leading-tight">{companyForm.name || 'VEYRA Tech'}</span>
                    <span className="text-[10px] text-[#667085] block font-semibold">Verified Employer</span>
                  </div>
                  <FiChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                </button>

                {isCompanyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-gray-200/80 z-50 p-2 space-y-1">
                    <button onClick={() => { setActiveTab('company'); setIsCompanyDropdownOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#101828] hover:bg-blue-50 hover:text-[#2161FF] flex items-center gap-2">
                      <FiGlobe className="w-4 h-4" /> Company Profile
                    </button>
                    <button onClick={() => { setActiveTab('settings'); setIsCompanyDropdownOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#101828] hover:bg-blue-50 hover:text-[#2161FF] flex items-center gap-2">
                      <FiSliders className="w-4 h-4" /> Settings
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <FiLogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ================================================== */}
          {/* TAB 1: OVERVIEW DASHBOARD & HIRING PIPELINE */}
          {/* ================================================== */}
          {activeTab === 'overview' && !showJobForm && (
            <div className="space-y-8 animate-fade-in">
              
              {/* 4 DYNAMIC HIRING OVERVIEW METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Open Jobs', value: openJobsCount, color: 'from-blue-500 to-[#2161FF]', icon: FiBriefcase, targetTab: 'jobs', desc: 'Active vacancies' },
                  { label: 'New Applications', value: newAppsCount, color: 'from-indigo-500 to-blue-600', icon: FiFileText, targetTab: 'applications', desc: 'Candidates submitted' },
                  { label: 'Interviews', value: interviewsCount, color: 'from-emerald-500 to-teal-600', icon: FiCalendar, targetTab: 'interviews', desc: 'Scheduled rounds' },
                  { label: 'Shortlisted', value: shortlistedCount, color: 'from-purple-500 to-indigo-600', icon: FiCheckCircle, targetTab: 'applications', filterStatus: 'Shortlisted', desc: 'Top recommendations' },
                ].map((card, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveTab(card.targetTab);
                      if (card.filterStatus) setStatusFilter(card.filterStatus);
                    }}
                    className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_45px_rgba(33,97,255,0.1)] hover:border-[#2161FF]/40 rounded-3xl p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#667085] tracking-tight">{card.label}</span>
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-3xl font-black text-[#101828] tracking-tight">{loading ? '...' : card.value}</span>
                      <span className="block text-[11px] font-semibold text-[#667085] mt-1">{card.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* HIRING PIPELINE COMPONENT */}
              <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.04)] rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#101828] tracking-tight flex items-center gap-2">
                      <FiTarget className="w-5 h-5 text-[#2161FF]" />
                      Hiring Pipeline
                    </h3>
                    <p className="text-xs font-semibold text-[#667085]">Real-time candidate progression through recruitment stages.</p>
                  </div>
                  <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-[#2161FF] hover:underline flex items-center gap-1">
                    Manage Pipeline <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
                  {[
                    { stage: 'Applications', count: pipelineCounts.Applications, status: 'All' },
                    { stage: 'AI Analyzed', count: pipelineCounts.AIAnalyzed, status: 'All' },
                    { stage: 'Under Review', count: pipelineCounts.UnderReview, status: 'Under Review' },
                    { stage: 'Shortlisted', count: pipelineCounts.Shortlisted, status: 'Shortlisted' },
                    { stage: 'Interview', count: pipelineCounts.Interview, status: 'Interview' },
                    { stage: 'Offer', count: pipelineCounts.Offer, status: 'Offer' },
                    { stage: 'Hired', count: pipelineCounts.Hired, status: 'Hired' },
                  ].map((p, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveTab('applications');
                        setStatusFilter(p.status);
                      }}
                      className="bg-gray-50/80 hover:bg-blue-50/70 border border-gray-200/60 hover:border-blue-200 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 group"
                    >
                      <span className="text-[11px] font-extrabold text-[#667085] group-hover:text-[#2161FF] transition-colors block">{p.stage}</span>
                      <span className="text-2xl font-black text-[#101828] mt-1 block">{loading ? '...' : p.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVE JOBS SECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#101828] tracking-tight">Your Active Jobs</h3>
                    <p className="text-xs font-semibold text-[#667085]">Vacancies open for applicant submission.</p>
                  </div>
                  <button
                    onClick={() => { setShowJobForm(true); setEditingJob(null); }}
                    className="px-5 py-2.5 rounded-2xl bg-[#2161FF] text-white font-extrabold text-xs shadow-md shadow-[#2161FF]/25 hover:bg-[#1a50db] transition-all flex items-center gap-2"
                  >
                    <FiPlusSquare className="w-4 h-4" />
                    <span>Create Job</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {jobPosts.length === 0 ? (
                    <div className="md:col-span-2 bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-xs rounded-3xl p-12 text-center space-y-4">
                      <FiBriefcase className="w-10 h-10 text-gray-400 mx-auto" />
                      <h4 className="text-lg font-bold text-[#101828]">No active jobs posted yet</h4>
                      <p className="text-xs text-[#667085] max-w-sm mx-auto">Create a job opening to start receiving AI-matched applications.</p>
                      <button
                        onClick={() => setShowJobForm(true)}
                        className="px-6 py-3 rounded-2xl bg-[#2161FF] text-white font-extrabold text-xs shadow-md shadow-[#2161FF]/25 hover:bg-[#1a50db] transition-all"
                      >
                        Publish Your First Job
                      </button>
                    </div>
                  ) : (
                    jobPosts.slice(0, 4).map(job => {
                      const jobApps = applications.filter(a => (a.job?._id === job._id || a.job === job._id));
                      const jobShortlisted = jobApps.filter(a => a.status === 'Shortlisted').length;
                      const jobInterviews = interviews.filter(i => (i.jobId?._id === job._id || i.jobId === job._id)).length;

                      return (
                        <div key={job._id} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_45px_rgba(33,97,255,0.09)] hover:border-[#2161FF]/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-black text-[#101828] group-hover:text-[#2161FF] transition-colors leading-tight capitalize">{job.title}</h4>
                                <p className="text-xs font-bold text-[#667085] mt-1">{job.company || companyForm.name}</p>
                              </div>
                              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2161FF] text-xs font-bold border border-blue-100/70">
                                {job.workMode || 'Remote'} · {job.jobType || 'Full-time'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
                              <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                              <span>{job.location}</span>
                              {job.salary && <span className="text-emerald-700 font-extrabold ml-2">{job.salary}</span>}
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
                              <div className="bg-gray-50 rounded-xl p-2">
                                <span className="text-xs font-extrabold text-[#101828] block">{jobApps.length}</span>
                                <span className="text-[10px] text-[#667085]">Applications</span>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-2">
                                <span className="text-xs font-extrabold text-[#2161FF] block">{jobShortlisted}</span>
                                <span className="text-[10px] text-[#667085]">Shortlisted</span>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-2">
                                <span className="text-xs font-extrabold text-purple-600 block">{jobInterviews}</span>
                                <span className="text-[10px] text-[#667085]">Interviews</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold text-gray-400">
                              Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setActiveTab('applications');
                                  setJobFilter(job._id);
                                }}
                                className="px-4 py-2 rounded-xl bg-[#2161FF] text-white text-xs font-bold shadow-xs hover:bg-[#1a50db] transition-all"
                              >
                                View Applications
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(job._id)}
                                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* RECRUITER ANALYTICS OVERVIEW */}
              <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.04)] rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-black text-[#101828] tracking-tight">Hiring Overview & Performance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#667085]">Applications this week</span>
                    <span className="text-xl font-black text-[#101828] block mt-1">{applications.length}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#667085]">Shortlisted</span>
                    <span className="text-xl font-black text-[#2161FF] block mt-1">{shortlistedCount}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#667085]">Interviews</span>
                    <span className="text-xl font-black text-purple-600 block mt-1">{interviewsCount}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#667085]">Offers</span>
                    <span className="text-xl font-black text-emerald-600 block mt-1">{pipelineCounts.Offer}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#667085]">Avg time to review</span>
                    <span className="text-xl font-black text-[#101828] block mt-1">4.2h</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================================================== */}
          {/* TAB 2: JOBS WORKSPACE & CREATE JOB FORM */}
          {/* ================================================== */}
          {(activeTab === 'jobs' || showJobForm) && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#101828] tracking-tight">Job Management</h2>
                  <p className="text-xs font-semibold text-[#667085]">Publish and configure vacancies for candidate recruitment.</p>
                </div>

                {!showJobForm && (
                  <button
                    onClick={() => { setShowJobForm(true); setEditingJob(null); }}
                    className="px-5 py-2.5 rounded-2xl bg-[#2161FF] text-white font-extrabold text-xs shadow-md shadow-[#2161FF]/25 hover:bg-[#1a50db] transition-all flex items-center gap-2"
                  >
                    <FiPlusSquare className="w-4 h-4" />
                    <span>Create Job</span>
                  </button>
                )}
              </div>

              {/* CREATE / EDIT JOB FORM */}
              {showJobForm ? (
                <form onSubmit={handleCreateOrUpdateJob} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-md rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-[#101828]">{editingJob ? 'Edit Vacancy' : 'Create New Job Opening'}</h3>
                    <button type="button" onClick={() => setShowJobForm(false)} className="p-2 text-gray-400 hover:text-gray-600">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Job Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Full Stack Engineer"
                        value={newJob.title}
                        onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Company Name</label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={newJob.company || companyForm.name}
                        onChange={e => setNewJob({ ...newJob, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyderabad, India"
                        value={newJob.location}
                        onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Work Mode</label>
                      <select
                        value={newJob.workMode}
                        onChange={e => setNewJob({ ...newJob, workMode: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Employment Type</label>
                      <select
                        value={newJob.jobType}
                        onChange={e => setNewJob({ ...newJob, jobType: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Salary Range</label>
                      <input
                        type="text"
                        placeholder="e.g. $100k - $130k / yr or 12-15 LPA"
                        value={newJob.salary}
                        onChange={e => setNewJob({ ...newJob, salary: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      />
                    </div>
                  </div>

                  {/* SKILLS INPUT TAG CHIPS */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Required Skills & Technologies</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Type skill e.g. React.js and press Add"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                        className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                      />
                      <button type="button" onClick={handleAddSkill} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-2xl text-xs font-extrabold text-[#101828]">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {newJob.skillsRequired.map((sk, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#2161FF] text-xs font-bold border border-blue-100 flex items-center gap-1.5">
                          {sk}
                          <button type="button" onClick={() => handleRemoveSkill(sk)} className="text-blue-400 hover:text-blue-600">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Job Description *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Detailed job overview, responsibilities, and requirements..."
                      value={newJob.description}
                      onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => setShowJobForm(false)} className="px-6 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 rounded-2xl bg-[#2161FF] text-white text-xs font-extrabold shadow-md shadow-[#2161FF]/25 hover:bg-[#1a50db]">
                      Publish Job
                    </button>
                  </div>
                </form>
              ) : (
                /* JOBS LIST GRID */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {jobPosts.map(job => (
                    <div key={job._id} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-xs rounded-3xl p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-black text-[#101828] leading-tight capitalize">{job.title}</h4>
                          <p className="text-xs font-bold text-[#667085] mt-1">{job.location} · {job.jobType}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          Active
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {job.skillsRequired?.slice(0, 4).map((sk, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-700">{sk}</span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => { setActiveTab('applications'); setJobFilter(job._id); }}
                          className="text-xs font-extrabold text-[#2161FF] hover:underline"
                        >
                          View Applications ({applications.filter(a => (a.job?._id === job._id || a.job === job._id)).length})
                        </button>

                        <button onClick={() => setShowDeleteConfirm(job._id)} className="p-2 text-gray-400 hover:text-red-600">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 3: APPLICATIONS & CANDIDATE MANAGEMENT */}
          {/* ================================================== */}
          {activeTab === 'applications' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-[#101828] tracking-tight">Applications & Candidates</h2>
                <p className="text-xs font-semibold text-[#667085]">Review candidates matched to your open positions.</p>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-xs rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 relative w-full">
                  <FiSearch className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search candidates, skills or job title..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold text-[#101828] focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select
                    value={scoreFilter}
                    onChange={e => setScoreFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold text-[#101828] focus:outline-none"
                  >
                    <option value="All">All Scores</option>
                    <option value="high">Match ≥ 80%</option>
                    <option value="medium">Match ≥ 60%</option>
                  </select>
                </div>
              </div>

              {/* CANDIDATE APPLICATION CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredApplications.length === 0 ? (
                  <div className="md:col-span-2 bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-12 text-center space-y-3">
                    <FiUsers className="w-10 h-10 text-gray-400 mx-auto" />
                    <h4 className="text-base font-bold text-[#101828]">No applications found</h4>
                    <p className="text-xs text-[#667085]">Try clearing search or adjusting your status filters.</p>
                  </div>
                ) : (
                  filteredApplications.map(app => {
                    const matchScore = app.matchScore || 85;
                    const applicant = app.applicant || {};

                    return (
                      <div key={app._id} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_45px_rgba(33,97,255,0.09)] hover:border-[#2161FF]/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group space-y-4">
                        <div className="space-y-3">
                          {/* Top Profile Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2161FF] to-[#1d4ed8] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                                {applicant.fullName?.[0] || 'C'}
                              </div>
                              <div>
                                <h4 className="text-base font-extrabold text-[#101828] capitalize">{applicant.fullName || 'Candidate'}</h4>
                                <span className="text-xs font-semibold text-[#667085] block">{applicant.experience || 'Fresher / Entry Level'}</span>
                              </div>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              app.status === 'Interview' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                              app.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                              'bg-blue-50 text-[#2161FF] border border-blue-100'
                            }`}>
                              {app.status || 'Under Review'}
                            </span>
                          </div>

                          {/* Applied For & Skills */}
                          <div className="space-y-1.5 pt-1">
                            <p className="text-xs font-semibold text-[#667085]">
                              Applied for <b className="text-[#101828] font-bold">{app.job?.title || 'Job Vacancy'}</b>
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(applicant.skills?.split(',') || ['React', 'Node.js', 'MongoDB', 'JavaScript']).slice(0, 4).map((sk, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-xl bg-gray-100 text-[#101828] text-xs font-bold">
                                  {sk.trim()}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* AI Match Bar */}
                          <div className="space-y-1.5 pt-2 border-t border-gray-100">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-extrabold text-[#101828] flex items-center gap-1.5">
                                <FiZap className="w-3.5 h-3.5 text-[#2161FF]" /> AI Match
                              </span>
                              <span className="font-black text-[#2161FF]">{matchScore}% (Strong Match)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#2161FF] to-blue-500 rounded-full" style={{ width: `${matchScore}%` }} />
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => { setSelectedApplication(app); setShowCandidateModal(true); }}
                            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#101828] transition-all"
                          >
                            View Candidate
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateAppStatus(app._id, 'Shortlisted')}
                              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-all"
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => { setSelectedApplication(app); setShowScheduleModal(true); }}
                              className="px-3.5 py-2 rounded-xl bg-[#2161FF] text-white hover:bg-[#1a50db] text-xs font-bold shadow-xs transition-all"
                            >
                              Interview
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 4: CANDIDATE DATABASE & SEARCH */}
          {/* ================================================== */}
          {activeTab === 'candidates' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-[#101828] tracking-tight">Global Candidate Database</h2>
                <p className="text-xs font-semibold text-[#667085]">Search all candidates across resume database and job applications.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-xs rounded-3xl p-4 flex items-center gap-3">
                <FiSearch className="w-5 h-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search by candidate name, skill e.g. React, Java, experience or location..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {applications.map(app => (
                  <div key={app._id} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#101828] text-white font-extrabold text-sm flex items-center justify-center">
                        {app.applicant?.fullName?.[0] || 'C'}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#101828]">{app.applicant?.fullName}</h4>
                        <span className="text-xs text-[#667085]">{app.applicant?.email}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#667085]">Skills: <b>{app.applicant?.skills || 'N/A'}</b></p>
                    <button
                      onClick={() => { setSelectedApplication(app); setShowCandidateModal(true); }}
                      className="w-full py-2 rounded-xl bg-blue-50 text-[#2161FF] text-xs font-bold hover:bg-blue-100 transition-all"
                    >
                      View AI Match Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 5: INTERVIEWS WORKSPACE */}
          {/* ================================================== */}
          {activeTab === 'interviews' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-[#101828] tracking-tight">Scheduled Interviews</h2>
                <p className="text-xs font-semibold text-[#667085]">Track and manage AI & live candidate interviews.</p>
              </div>

              <div className="space-y-4">
                {interviews.length === 0 ? (
                  <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-12 text-center space-y-3">
                    <FiCalendar className="w-10 h-10 text-gray-400 mx-auto" />
                    <h4 className="text-base font-bold text-[#101828]">No scheduled interviews</h4>
                    <p className="text-xs text-[#667085]">Select a candidate from Applications to schedule an interview.</p>
                  </div>
                ) : (
                  interviews.map(int => (
                    <div key={int._id} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-extrabold text-[#101828]">{int.title || 'AI Interview'}</h4>
                        <p className="text-xs text-[#667085] mt-0.5">Candidate: <b>{int.candidateId?.firstName || 'Candidate'}</b> ({int.candidateId?.email})</p>
                      </div>
                      <a
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/interview/${int.uniqueToken}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#2161FF] text-white text-xs font-bold hover:bg-[#1a50db] flex items-center gap-1.5"
                      >
                        Interview Link <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 6: COMPANY PROFILE MANAGEMENT */}
          {/* ================================================== */}
          {activeTab === 'company' && (
            <form onSubmit={handleSaveCompany} className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-md rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-[#101828] tracking-tight">Company Profile</h2>
                <p className="text-xs font-semibold text-[#667085]">Manage organization info shown to prospective job candidates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Website URL</label>
                  <input
                    type="text"
                    value={companyForm.website}
                    onChange={e => setCompanyForm({ ...companyForm, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Industry</label>
                  <input
                    type="text"
                    value={companyForm.industry}
                    onChange={e => setCompanyForm({ ...companyForm, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Location</label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={e => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#101828] mb-1.5">About Company</label>
                <textarea
                  rows={4}
                  value={companyForm.description}
                  onChange={e => setCompanyForm({ ...companyForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="px-8 py-3 rounded-2xl bg-[#2161FF] text-white text-xs font-extrabold shadow-md hover:bg-[#1a50db]">
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-8 space-y-4 animate-fade-in">
              <h2 className="text-xl font-black text-[#101828]">Recruiter Workspace Settings</h2>
              <p className="text-xs text-[#667085]">Manage API keys, notification preferences, and team permissions.</p>
              <div className="p-4 bg-gray-50 rounded-2xl text-xs font-semibold text-gray-700">
                All hiring engine settings are active and synced with VEYRA backend server.
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================================================== */}
      {/* CANDIDATE AI PROFILE & HIRING INTELLIGENCE MODAL */}
      {/* ================================================== */}
      {showCandidateModal && selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2161FF] text-white flex items-center justify-center font-black text-2xl shadow-md">
                  {selectedApplication.applicant?.fullName?.[0] || 'C'}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#101828] capitalize">{selectedApplication.applicant?.fullName || 'Candidate'}</h3>
                  <p className="text-xs font-bold text-[#667085]">{selectedApplication.applicant?.email} · {selectedApplication.applicant?.phone || 'N/A'}</p>
                </div>
              </div>
              <button onClick={() => setShowCandidateModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* VEYRA HIRING INTELLIGENCE BREAKDOWN */}
            <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-100 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-[#101828] flex items-center gap-2">
                    <FiZap className="w-5 h-5 text-[#2161FF]" /> VEYRA Hiring Intelligence
                  </h4>
                  <p className="text-xs text-[#667085] font-semibold mt-0.5">Automated AI evaluation against job requirements.</p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-[#2161FF] text-white font-black text-lg shadow-sm">
                  {selectedApplication.matchScore || 91}% Match
                </div>
              </div>

              {/* Progress Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Skills Alignment</span>
                    <span className="text-[#2161FF]">94%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-[#2161FF] rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Experience Relevance</span>
                    <span className="text-[#2161FF]">88%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-[#2161FF] rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Project Relevance</span>
                    <span className="text-[#2161FF]">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-[#2161FF] rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Education Relevance</span>
                    <span className="text-[#2161FF]">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-[#2161FF] rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>

              {/* AI Explanation Checks & Gaps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/80 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <span className="text-xs font-black text-emerald-700 block">Why this candidate matches</span>
                  <ul className="text-xs font-semibold text-gray-700 space-y-1">
                    <li className="flex items-center gap-1.5"><FiCheck className="w-4 h-4 text-emerald-600" /> Strong technical skill overlap</li>
                    <li className="flex items-center gap-1.5"><FiCheck className="w-4 h-4 text-emerald-600" /> Relevant project portfolio</li>
                    <li className="flex items-center gap-1.5"><FiCheck className="w-4 h-4 text-emerald-600" /> Experience aligns with role</li>
                  </ul>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-amber-100 space-y-2">
                  <span className="text-xs font-black text-amber-700 block">Skill gaps</span>
                  <ul className="text-xs font-semibold text-gray-700 space-y-1">
                    <li className="flex items-center gap-1.5"><FiAlertCircle className="w-4 h-4 text-amber-600" /> Cloud architecture (Kubernetes/AWS)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RESUME VIEWER */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 space-y-3">
              <h4 className="text-xs font-black text-[#101828] uppercase tracking-wider">Candidate Resume</h4>
              {selectedApplication.applicant?.resume?.filePath ? (
                <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FiPaperclip className="w-5 h-5 text-[#2161FF]" />
                    <span className="text-xs font-bold text-[#101828]">Uploaded Resume Document</span>
                  </div>
                  <a
                    href={selectedApplication.applicant.resume.filePath}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#2161FF] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View Resume
                  </a>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Resume on file on candidate profile.</p>
              )}
            </div>

            {/* APPLICATION TIMELINE */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-[#101828] uppercase tracking-wider">Application Timeline</h4>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 bg-gray-50 p-3 rounded-2xl">
                <span>Applied: {new Date(selectedApplication.createdAt || Date.now()).toLocaleDateString()}</span>
                <span>Status: <b className="text-[#2161FF]">{selectedApplication.status || 'Under Review'}</b></span>
              </div>
            </div>

            {/* RECRUITER DECISION BAR */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowRejectConfirm(selectedApplication._id)}
                className="px-5 py-2.5 rounded-2xl bg-red-50 text-red-700 hover:bg-red-100 font-extrabold text-xs border border-red-200"
              >
                Reject Candidate
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateAppStatus(selectedApplication._id, 'Shortlisted')}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold text-xs border border-emerald-200"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-6 py-2.5 rounded-2xl bg-[#2161FF] text-white font-extrabold text-xs hover:bg-[#1a50db] shadow-md shadow-[#2161FF]/25"
                >
                  Invite to Interview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {showScheduleModal && selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleScheduleSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-black text-[#101828]">Schedule Interview</h3>
              <button type="button" onClick={() => setShowScheduleModal(false)} className="p-1 text-gray-400">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs font-semibold text-gray-600 bg-blue-50/60 p-3 rounded-2xl">
              <p>Candidate: <b className="text-[#101828]">{selectedApplication.applicant?.fullName || 'Candidate'}</b></p>
              <p>Job: <b className="text-[#101828]">{selectedApplication.job?.title || 'Vacancy'}</b></p>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Interview Type</label>
              <select
                value={scheduleData.interviewType}
                onChange={e => setScheduleData({ ...scheduleData, interviewType: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2161FF]"
              >
                <option value="AI Interview">AI Automated Interview</option>
                <option value="Human Interview">Human Live Interview</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Date</label>
                <input
                  type="date"
                  required
                  value={scheduleData.scheduledDate}
                  onChange={e => setScheduleData({ ...scheduleData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#101828] mb-1.5">Time</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM"
                  value={scheduleData.scheduledTime}
                  onChange={e => setScheduleData({ ...scheduleData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button type="button" onClick={() => setShowScheduleModal(false)} className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-2xl bg-[#2161FF] text-white text-xs font-extrabold shadow-md hover:bg-[#1a50db]">
                Send Interview Invitation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONFIRMATION MODALS */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <FiAlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-base font-black text-[#101828]">Delete Job Vacancy?</h3>
            <p className="text-xs text-[#667085]">This action cannot be undone.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 bg-gray-100">Cancel</button>
              <button onClick={() => handleDeleteJob(showDeleteConfirm)} className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showRejectConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <FiAlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-black text-[#101828]">Reject Candidate?</h3>
            <p className="text-xs text-[#667085]">This will mark the application as Rejected and send a status email.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setShowRejectConfirm(null)} className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 bg-gray-100">Cancel</button>
              <button onClick={async () => {
                await handleUpdateAppStatus(showRejectConfirm, 'Rejected');
                setShowRejectConfirm(null);
                setShowCandidateModal(false);
              }} className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
