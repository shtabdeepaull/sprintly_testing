// src/pages/Features.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineViewBoards,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineChatAlt2,
  HiOutlinePaperClip,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineDocumentReport,
  HiOutlineGlobe,
  HiOutlineDeviceMobile,
  HiOutlineRefresh,
  HiOutlineCube,
  // HiOutlineTemplate,
  // HiOutlineColorSwatch
} from 'react-icons/hi';

const Features = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  // Core Features
  const coreFeatures = [
    {
      icon: HiOutlineViewBoards,
      title: 'Kanban Boards',
      description: 'Visualize your workflow with intuitive drag-and-drop boards. Customize columns, swimlanes, and card layouts.',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: HiOutlineUserGroup,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates, comments, @mentions, and team workspaces.',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: HiOutlineChartBar,
      title: 'Advanced Analytics',
      description: 'Make data-driven decisions with comprehensive dashboards, burndown charts, and velocity tracking.',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      icon: HiOutlineLightningBolt,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks with custom rules, triggers, and actions. Save hours every week.',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      icon: HiOutlineShieldCheck,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, SSO, 2FA, audit logs, and SOC 2 Type II compliance included.',
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      icon: HiOutlineBell,
      title: 'Smart Notifications',
      description: 'Stay informed with intelligent alerts. Get notified about what matters, filter out the noise.',
      color: 'bg-violet-50 text-violet-600'
    }
  ];

  // Additional Features
  const additionalFeatures = [
    { icon: HiOutlineSearch, title: 'Powerful Search', description: 'Find anything instantly across all projects and tasks.' },
    { icon: HiOutlineChatAlt2, title: 'Comments & Discussions', description: 'Discuss tasks in context with threaded conversations.' },
    { icon: HiOutlinePaperClip, title: 'File Attachments', description: 'Attach any file type directly to tasks and comments.' },
    { icon: HiOutlineCalendar, title: 'Due Dates & Reminders', description: 'Never miss a deadline with smart date tracking.' },
    { icon: HiOutlineTag, title: 'Labels & Tags', description: 'Organize and filter tasks with custom labels.' },
    { icon: HiOutlineCollection, title: 'Subtasks & Checklists', description: 'Break down complex tasks into manageable steps.' },
    { icon: HiOutlineCog, title: 'Custom Workflows', description: 'Define your own statuses and transitions.' },
    { icon: HiOutlineDocumentReport, title: 'Activity Logs', description: 'Track all changes with detailed audit trails.' },
    { icon: HiOutlineGlobe, title: 'Multi-Workspace', description: 'Manage multiple organizations from one account.' },
    { icon: HiOutlineDeviceMobile, title: 'Mobile Apps', description: 'Stay productive on iOS and Android devices.' },
    { icon: HiOutlineRefresh, title: 'Real-time Sync', description: 'Changes sync instantly across all devices.' },
    { icon: HiOutlineCube, title: 'Integrations', description: 'Connect with 100+ tools you already use.' }
  ];

  // Feature Highlights
  const featureHighlights = [
    {
      badge: 'Task Management',
      title: 'Organize work your way with powerful task management',
      description: 'Create tasks with rich descriptions, checklists, attachments, and custom fields. Assign to team members, set priorities, and track progress from start to finish.',
      features: [
        'Rich text descriptions with markdown',
        'Custom fields for any data type',
        'Task dependencies and blockers',
        'Time estimation and tracking',
        'Recurring tasks automation'
      ],
      illustration: 'task'
    },
    {
      badge: 'Visual Workflows',
      title: 'See the big picture with visual project boards',
      description: 'Kanban boards, list views, and timeline views give you multiple ways to visualize your work. Switch between views instantly to find what works best for your team.',
      features: [
        'Drag-and-drop Kanban boards',
        'Customizable list views',
        'Timeline and Gantt charts',
        'Calendar view for deadlines',
        'Multiple view layouts'
      ],
      illustration: 'workflow'
    },
    {
      badge: 'Team Collaboration',
      title: 'Bring your entire team together in one place',
      description: 'Comments, @mentions, and real-time notifications keep everyone aligned. Share files, discuss ideas, and make decisions faster without leaving Sprintly.',
      features: [
        'Threaded comments on tasks',
        '@mentions for notifications',
        'Real-time collaborative editing',
        'Team activity feeds',
        'Guest access for clients'
      ],
      illustration: 'collaboration'
    },
    {
      badge: 'Insights & Reporting',
      title: 'Make smarter decisions with powerful analytics',
      description: 'Track team velocity, identify bottlenecks, and measure progress with beautiful dashboards. Export reports to share with stakeholders.',
      features: [
        'Customizable dashboards',
        'Burndown and velocity charts',
        'Team workload distribution',
        'Time tracking reports',
        'Export to PDF and CSV'
      ],
      illustration: 'analytics'
    }
  ];

  // SVG Illustration Component
  const FeatureIllustration = ({ type }) => {
    const illustrations = {
      task: (
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="400" height="300" rx="16" fill="#F8FAFC"/>
          <rect x="20" y="20" width="360" height="260" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          
          {/* Task Header */}
          <rect x="40" y="40" width="200" height="16" rx="4" fill="#334155"/>
          <rect x="40" y="64" width="280" height="8" rx="2" fill="#94A3B8"/>
          <rect x="40" y="80" width="240" height="8" rx="2" fill="#94A3B8"/>
          
          {/* Priority Badge */}
          <rect x="300" y="40" width="60" height="24" rx="12" fill="#FEE2E2"/>
          <circle cx="315" cy="52" r="4" fill="#EF4444"/>
          <rect x="324" y="48" width="28" height="8" rx="2" fill="#EF4444"/>
          
          {/* Checklist */}
          <rect x="40" y="110" width="320" height="100" rx="8" fill="#F8FAFC"/>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="55" y={125 + i * 22} width="16" height="16" rx="4" fill={i < 2 ? "#4F46E5" : "white"} stroke="#4F46E5" strokeWidth="2"/>
              {i < 2 && <path d={`M59 ${133 + i * 22}l3 3 5-5`} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>}
              <rect x="80" y={128 + i * 22} width={[180, 140, 200, 160][i]} height="10" rx="2" fill={i < 2 ? "#CBD5E1" : "#334155"}/>
            </g>
          ))}
          
          {/* Progress Bar */}
          <rect x="40" y="230" width="320" height="8" rx="4" fill="#E2E8F0"/>
          <rect x="40" y="230" width="200" height="8" rx="4" fill="#4F46E5"/>
          <text x="40" y="258" fill="#64748B" fontSize="12">50% complete</text>
          
          {/* Assignees */}
          <circle cx="320" cy="250" r="16" fill="#4F46E5"/>
          <circle cx="340" cy="250" r="16" fill="#10B981"/>
          <circle cx="360" cy="250" r="16" fill="#F59E0B"/>
        </svg>
      ),
      workflow: (
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="400" height="300" rx="16" fill="#F8FAFC"/>
          
          {/* Kanban Columns */}
          <rect x="15" y="20" width="115" height="260" rx="10" fill="#EEF2FF"/>
          <rect x="142" y="20" width="115" height="260" rx="10" fill="#FEF3C7"/>
          <rect x="270" y="20" width="115" height="260" rx="10" fill="#D1FAE5"/>
          
          {/* Column Headers */}
          <rect x="25" y="30" width="50" height="14" rx="4" fill="#4F46E5"/>
          <rect x="152" y="30" width="65" height="14" rx="4" fill="#F59E0B"/>
          <rect x="280" y="30" width="45" height="14" rx="4" fill="#10B981"/>
          
          {/* Cards Column 1 */}
          <rect x="25" y="55" width="95" height="60" rx="8" fill="white" stroke="#C7D2FE"/>
          <rect x="35" y="65" width="60" height="8" rx="2" fill="#334155"/>
          <rect x="35" y="78" width="75" height="6" rx="2" fill="#94A3B8"/>
          <circle cx="100" cy="100" r="10" fill="#4F46E5"/>
          
          <rect x="25" y="125" width="95" height="50" rx="8" fill="white" stroke="#C7D2FE"/>
          <rect x="35" y="135" width="55" height="8" rx="2" fill="#334155"/>
          <rect x="35" y="148" width="70" height="6" rx="2" fill="#94A3B8"/>
          
          <rect x="25" y="185" width="95" height="45" rx="8" fill="white" stroke="#C7D2FE"/>
          <rect x="35" y="195" width="65" height="8" rx="2" fill="#334155"/>
          <rect x="35" y="208" width="50" height="6" rx="2" fill="#94A3B8"/>
          
          {/* Cards Column 2 */}
          <rect x="152" y="55" width="95" height="70" rx="8" fill="white" stroke="#FDE68A"/>
          <rect x="162" y="65" width="70" height="8" rx="2" fill="#334155"/>
          <rect x="162" y="78" width="75" height="6" rx="2" fill="#94A3B8"/>
          <rect x="162" y="95" width="40" height="16" rx="4" fill="#FEF3C7"/>
          <circle cx="227" cy="108" r="10" fill="#F59E0B"/>
          
          <rect x="152" y="135" width="95" height="55" rx="8" fill="white" stroke="#FDE68A"/>
          <rect x="162" y="145" width="55" height="8" rx="2" fill="#334155"/>
          <rect x="162" y="158" width="70" height="6" rx="2" fill="#94A3B8"/>
          
          {/* Cards Column 3 */}
          <rect x="280" y="55" width="95" height="55" rx="8" fill="white" stroke="#A7F3D0"/>
          <rect x="290" y="65" width="60" height="8" rx="2" fill="#334155"/>
          <rect x="290" y="78" width="70" height="6" rx="2" fill="#94A3B8"/>
          <circle cx="355" cy="93" r="10" fill="#10B981"/>
          
          <rect x="280" y="120" width="95" height="50" rx="8" fill="white" stroke="#A7F3D0"/>
          <rect x="290" y="130" width="50" height="8" rx="2" fill="#334155"/>
          <rect x="290" y="143" width="65" height="6" rx="2" fill="#94A3B8"/>
          
          {/* Drag indicator */}
          <rect x="155" y="200" width="90" height="50" rx="8" fill="white" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 2"/>
          <path d="M200 215 L200 235 M190 225 L200 235 L210 225" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      collaboration: (
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="400" height="300" rx="16" fill="#F8FAFC"/>
          
          {/* Chat Container */}
          <rect x="20" y="20" width="360" height="260" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          
          {/* Message 1 */}
          <circle cx="50" cy="60" r="20" fill="#EEF2FF"/>
          <text x="43" y="66" fill="#4F46E5" fontSize="14" fontWeight="bold">SC</text>
          <rect x="80" y="45" width="200" height="45" rx="12" fill="#F1F5F9"/>
          <rect x="95" y="55" width="140" height="8" rx="2" fill="#334155"/>
          <rect x="95" y="70" width="170" height="6" rx="2" fill="#94A3B8"/>
          <text x="290" y="80" fill="#94A3B8" fontSize="10">2m ago</text>
          
          {/* Message 2 - Current user */}
          <rect x="120" y="105" width="220" height="50" rx="12" fill="#4F46E5"/>
          <rect x="135" y="118" width="160" height="8" rx="2" fill="white"/>
          <rect x="135" y="133" width="190" height="6" rx="2" fill="#C7D2FE"/>
          <circle cx="355" cy="130" r="20" fill="#EEF2FF"/>
          <text x="348" y="136" fill="#4F46E5" fontSize="14" fontWeight="bold">ME</text>
          
          {/* Message 3 */}
          <circle cx="50" cy="195" r="20" fill="#F0FDF4"/>
          <text x="43" y="201" fill="#10B981" fontSize="14" fontWeight="bold">MR</text>
          <rect x="80" y="175" width="180" height="55" rx="12" fill="#F1F5F9"/>
          <rect x="95" y="188" width="120" height="8" rx="2" fill="#334155"/>
          <rect x="95" y="203" width="150" height="6" rx="2" fill="#94A3B8"/>
          <rect x="95" y="215" width="100" height="6" rx="2" fill="#94A3B8"/>
          
          {/* Input Area */}
          <rect x="30" y="245" width="300" height="28" rx="14" fill="#F1F5F9"/>
          <rect x="45" y="255" width="100" height="8" rx="2" fill="#CBD5E1"/>
          <circle cx="350" cy="259" r="14" fill="#4F46E5"/>
          <path d="M345 259 L355 259 M350 254 L350 264" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Typing Indicator */}
          <rect x="80" y="240" width="60" height="20" rx="10" fill="#F1F5F9"/>
          <circle cx="95" cy="250" r="3" fill="#94A3B8"/>
          <circle cx="107" cy="250" r="3" fill="#94A3B8"/>
          <circle cx="119" cy="250" r="3" fill="#94A3B8"/>
        </svg>
      ),
      analytics: (
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="400" height="300" rx="16" fill="#F8FAFC"/>
          
          {/* Main Chart */}
          <rect x="20" y="20" width="230" height="150" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="35" y="35" width="80" height="12" rx="3" fill="#334155"/>
          
          {/* Line Chart */}
          <path d="M50 140 L90 110 L130 125 L170 80 L210 95" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M50 140 L90 110 L130 125 L170 80 L210 95 L210 150 L50 150 Z" fill="url(#gradient1)" opacity="0.2"/>
          
          {/* Chart dots */}
          <circle cx="50" cy="140" r="5" fill="#4F46E5"/>
          <circle cx="90" cy="110" r="5" fill="#4F46E5"/>
          <circle cx="130" cy="125" r="5" fill="#4F46E5"/>
          <circle cx="170" cy="80" r="5" fill="#4F46E5"/>
          <circle cx="210" cy="95" r="5" fill="#4F46E5"/>
          
          {/* Pie Chart */}
          <circle cx="320" cy="95" r="55" fill="#EEF2FF"/>
          <path d="M320 40 A55 55 0 0 1 375 95 L320 95 Z" fill="#4F46E5"/>
          <path d="M375 95 A55 55 0 0 1 320 150 L320 95 Z" fill="#10B981"/>
          <path d="M320 150 A55 55 0 0 1 265 95 L320 95 Z" fill="#F59E0B"/>
          
          {/* Stat Cards */}
          <rect x="20" y="185" width="115" height="95" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="35" y="200" width="50" height="8" rx="2" fill="#94A3B8"/>
          <rect x="35" y="218" width="70" height="20" rx="4" fill="#4F46E5"/>
          <rect x="35" y="250" width="80" height="6" rx="2" fill="#D1FAE5"/>
          <text x="95" y="257" fill="#10B981" fontSize="10" fontWeight="bold">+12%</text>
          
          <rect x="145" y="185" width="115" height="95" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="160" y="200" width="60" height="8" rx="2" fill="#94A3B8"/>
          <rect x="160" y="218" width="80" height="20" rx="4" fill="#10B981"/>
          <rect x="160" y="250" width="70" height="6" rx="2" fill="#FEF3C7"/>
          <text x="220" y="257" fill="#F59E0B" fontSize="10" fontWeight="bold">+8%</text>
          
          <rect x="270" y="185" width="115" height="95" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="285" y="200" width="45" height="8" rx="2" fill="#94A3B8"/>
          <rect x="285" y="218" width="60" height="20" rx="4" fill="#F59E0B"/>
          <rect x="285" y="250" width="85" height="6" rx="2" fill="#EEF2FF"/>
          <text x="360" y="257" fill="#4F46E5" fontSize="10" fontWeight="bold">+24%</text>
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      )
    };
    return illustrations[type] || illustrations.task;
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ============================================ */}
      {/* NAVIGATION */}
      {/* ============================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/60'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Sprintly</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative font-medium transition-colors group ${
                    link.name === 'Features' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300 ${
                    link.name === 'Features' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <button className="px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200/60 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  link.name === 'Features' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl font-medium transition-colors text-left">
                  Sign In
                </button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-2xl transition-colors">
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            Powerful Features
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Everything you need to{' '}
            <span className="text-indigo-600">ship faster</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            From task management to team collaboration, Sprintly gives your team all the tools 
            they need to deliver projects on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <button className="group flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Start Free Trial
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/pricing">
              <button className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CORE FEATURES GRID */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Core Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Built for modern teams
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to help your team work better together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURE HIGHLIGHTS - Alternating Sections */}
      {/* ============================================ */}
      {featureHighlights.map((highlight, index) => (
        <section
          key={index}
          className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              {/* Text */}
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                  {highlight.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {highlight.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {highlight.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {highlight.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiOutlineCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all">
                    Get Started
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Illustration */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl opacity-50 blur-xl -z-10" />
                  <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 overflow-hidden">
                    <FeatureIllustration type={highlight.illustration} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============================================ */}
      {/* ADDITIONAL FEATURES GRID */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-4">
              And So Much More
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Packed with features you'll love
            </h2>
            <p className="text-lg text-slate-400">
              Every feature is designed to make your team more productive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to supercharge your workflow?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Start your free trial today and discover why thousands of teams choose Sprintly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <button className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-indigo-600 font-semibold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                Start Free Trial
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/pricing">
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all">
                View Pricing
              </button>
            </Link>
          </div>
          <p className="mt-8 text-indigo-200 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-white">Sprintly</span>
              </Link>
              <p className="text-slate-400 mb-6">Modern project management for teams that ship.</p>
              <div className="flex gap-3">
                  {['T', 'L', 'G', 'Y'].map((letter, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                      aria-label={`Social link ${letter}`}
                    >
                      <span className="text-xs font-bold">{letter}</span>
                    </button>
                  ))}
                </div>
            </div>

            {/* Links */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Help Center', 'Documentation', 'API Reference', 'Community'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Sprintly, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-slate-500 hover:text-white text-sm transition-colors">
                
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};

export default Features;