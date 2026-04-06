// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineClock,
  HiOutlineUserGroup,
  
} from 'react-icons/hi';
import Footer from '../components/layout/Footer';

const About = () => {
  // Philosophy cards data
  const philosophyCards = [
    {
      icon: HiOutlineLightningBolt,
      title: 'Project Chaos',
      subtitle: 'The Problem',
      description: 'Teams drown in scattered tools, unclear ownership, and endless status meetings that drain productivity.',
      color: 'bg-rose-50 text-rose-500 border-rose-100',
      iconBg: 'bg-rose-100',
      accent: 'border-l-rose-400'
    },
    {
      icon: HiOutlineClock,
      title: 'Missed Deadlines',
      subtitle: 'The Cost',
      description: 'Without clear visibility into project progress, deadlines slip silently until it\'s too late to recover.',
      color: 'bg-amber-50 text-amber-500 border-amber-100',
      iconBg: 'bg-amber-100',
      accent: 'border-l-amber-400'
    },
    {
      icon: HiOutlineUserGroup,
      title: 'Team Silos',
      subtitle: 'The Gap',
      description: 'Information gets trapped in silos. Design doesn\'t talk to dev. Marketing doesn\'t know what shipped.',
      color: 'bg-violet-50 text-violet-500 border-violet-100',
      iconBg: 'bg-violet-100',
      accent: 'border-l-violet-400'
    }
  ];

  // Core intent points
  const coreIntents = [
    {
      number: '01',
      title: 'Clarity Over Complexity',
      description: 'We strip away the unnecessary. Every feature exists to bring clarity to your workflow, not to add more noise to an already chaotic process.'
    },
    {
      number: '02',
      title: 'Speed Without Sacrifice',
      description: 'Move fast without breaking things. Sprintly is engineered for performance — instant load times, real-time updates, and zero friction.'
    },
    {
      number: '03',
      title: 'Built for Humans',
      description: 'Tools should adapt to people, not the other way around. We obsess over UX so your team can focus on shipping, not learning software.'
    }
  ];

  // Technology stack
  const techStack = [
    {
      name: 'React.js',
      description: 'Interactive UI',
      detail: 'Component-based architecture for fast, dynamic user interfaces',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      description: 'Backend Engine',
      detail: 'Scalable server-side runtime for high-performance API development',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22V16.9c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.12-.21V7.71c0-.09.04-.17.12-.21l7.44-4.29c.08-.04.18-.04.25 0l7.44 4.29c.07.04.12.12.12.21v8.58c0 .08-.05.17-.12.21l-7.44 4.29c-.07.04-.17.04-.25 0l-1.88-1.11c-.07-.04-.15-.05-.22-.02-.61.27-.72.31-1.3.47-.14.04-.36.11.08.32l2.46 1.45c.24.14.5.21.78.21.27 0 .54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14.52 8c-2.16 0-3.41.93-3.41 2.47 0 1.68 1.3 2.14 3.31 2.35 2.41.25 2.6.63 2.6 1.13 0 .88-.7 1.24-2.35 1.24-2.08 0-2.54-.52-2.69-1.55a.22.22 0 00-.22-.18h-.96c-.12 0-.22.1-.22.22 0 1.24.68 2.73 4.09 2.73 2.45 0 3.85-.96 3.85-2.65 0-1.67-1.13-2.11-3.51-2.43-2.41-.32-2.41-.56-2.41-1.01 0-.44.2-1.04 1.91-1.04 1.53 0 2.09.33 2.32 1.37.02.1.11.18.22.18h.96c.06 0 .12-.03.16-.08a.24.24 0 00.06-.16c-.15-1.77-1.32-2.59-3.71-2.59z"/>
        </svg>
      )
    },
    {
      name: 'MongoDB',
      description: 'Data Layer',
      detail: 'Flexible NoSQL database for scalable and efficient data storage',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      description: 'Design System',
      detail: 'Utility-first CSS framework for rapid, consistent UI development',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Co-Founder',
      description: 'Former VP Engineering at Atlassian. 15+ years building developer tools.',
      initials: 'SC'
    },
    {
      name: 'Michael Roberts',
      title: 'CTO & Co-Founder',
      description: 'Ex-GitHub Engineering Lead. Systems architect & performance expert.',
      initials: 'MR'
    },
    {
      name: 'Emily Johnson',
      title: 'Head of Product',
      description: 'Product strategist from Trello. Obsessed with intuitive user experience.',
      initials: 'EJ'
    },
    {
      name: 'David Kim',
      title: 'Lead Architect',
      description: 'Full-stack architect. 12+ years building scalable SaaS platforms.',
      initials: 'DK'
    }
  ];

  // Hero Desk Illustration
  const DeskIllustration = () => (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Desk Surface */}
      <rect x="40" y="260" width="420" height="12" rx="6" fill="#E2E8F0"/>
      <rect x="100" y="272" width="10" height="80" rx="2" fill="#CBD5E1"/>
      <rect x="390" y="272" width="10" height="80" rx="2" fill="#CBD5E1"/>
      <rect x="80" y="350" width="50" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="370" y="350" width="50" height="8" rx="4" fill="#E2E8F0"/>

      {/* Monitor */}
      <rect x="120" y="80" width="260" height="170" rx="12" fill="#1E293B"/>
      <rect x="130" y="90" width="240" height="145" rx="8" fill="#0F172A"/>
      
      {/* Screen Content - Mini Kanban */}
      <rect x="145" y="105" width="70" height="12" rx="3" fill="#0D9488" opacity="0.8"/>
      
      {/* Kanban columns on screen */}
      <rect x="145" y="125" width="65" height="95" rx="6" fill="#1E293B"/>
      <rect x="218" y="125" width="65" height="95" rx="6" fill="#1E293B"/>
      <rect x="291" y="125" width="65" height="95" rx="6" fill="#1E293B"/>
      
      {/* Column headers */}
      <rect x="150" y="130" width="30" height="6" rx="2" fill="#0D9488" opacity="0.6"/>
      <rect x="223" y="130" width="35" height="6" rx="2" fill="#0D9488" opacity="0.6"/>
      <rect x="296" y="130" width="25" height="6" rx="2" fill="#0D9488" opacity="0.6"/>
      
      {/* Task cards on screen */}
      <rect x="150" y="142" width="55" height="22" rx="4" fill="#334155"/>
      <rect x="155" y="147" width="35" height="4" rx="1" fill="#94A3B8"/>
      <rect x="155" y="154" width="45" height="3" rx="1" fill="#475569"/>
      
      <rect x="150" y="169" width="55" height="22" rx="4" fill="#334155"/>
      <rect x="155" y="174" width="30" height="4" rx="1" fill="#94A3B8"/>
      <rect x="155" y="181" width="40" height="3" rx="1" fill="#475569"/>
      
      <rect x="150" y="196" width="55" height="18" rx="4" fill="#334155"/>
      <rect x="155" y="201" width="38" height="4" rx="1" fill="#94A3B8"/>
      
      <rect x="223" y="142" width="55" height="28" rx="4" fill="#334155"/>
      <rect x="228" y="147" width="40" height="4" rx="1" fill="#94A3B8"/>
      <rect x="228" y="154" width="45" height="3" rx="1" fill="#475569"/>
      <rect x="228" y="160" width="25" height="3" rx="1" fill="#475569"/>
      
      <rect x="223" y="175" width="55" height="20" rx="4" fill="#334155"/>
      <rect x="228" y="180" width="32" height="4" rx="1" fill="#94A3B8"/>
      
      <rect x="296" y="142" width="55" height="25" rx="4" fill="#334155"/>
      <rect x="301" y="147" width="38" height="4" rx="1" fill="#94A3B8"/>
      <rect x="301" y="154" width="42" height="3" rx="1" fill="#475569"/>
      
      {/* Notification dot */}
      <circle cx="345" cy="100" r="5" fill="#0D9488"/>
      
      {/* Monitor Stand */}
      <rect x="230" y="235" width="40" height="28" rx="3" fill="#CBD5E1"/>
      <rect x="210" y="256" width="80" height="6" rx="3" fill="#E2E8F0"/>

      {/* Coffee Mug */}
      <rect x="380" y="228" width="30" height="32" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2"/>
      <path d="M410 238 C418 238 422 242 422 248 C422 254 418 258 410 258" stroke="#CBD5E1" strokeWidth="2" fill="none"/>
      <path d="M388 225 C390 218 395 218 398 225" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M394 222 C396 215 401 215 404 222" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.5"/>
      
      {/* Plant */}
      <rect x="60" y="230" width="24" height="30" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2"/>
      <ellipse cx="72" cy="230" rx="18" ry="12" fill="#0D9488" opacity="0.2"/>
      <path d="M72 230 C68 215 60 210 55 215" stroke="#0D9488" strokeWidth="2" fill="none"/>
      <path d="M72 230 C72 212 80 205 85 210" stroke="#0D9488" strokeWidth="2" fill="none"/>
      <path d="M72 230 C76 218 85 215 88 220" stroke="#14B8A6" strokeWidth="2" fill="none"/>
      <path d="M72 230 C65 220 58 220 56 225" stroke="#14B8A6" strokeWidth="2" fill="none"/>
      <path d="M72 228 C70 215 64 212 60 217" stroke="#2DD4BF" strokeWidth="1.5" fill="none"/>

      {/* Notebook */}
      <rect x="300" y="235" width="55" height="25" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(-5 327 247)"/>
      <rect x="310" y="240" width="30" height="3" rx="1" fill="#CBD5E1" transform="rotate(-5 325 241)"/>
      <rect x="310" y="246" width="35" height="3" rx="1" fill="#E2E8F0" transform="rotate(-5 327 247)"/>
      <rect x="310" y="252" width="20" height="3" rx="1" fill="#E2E8F0" transform="rotate(-5 320 253)"/>

      {/* Pen */}
      <line x1="365" y1="240" x2="375" y2="258" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="376" cy="260" r="2" fill="#0D9488"/>

      {/* Floating elements */}
      <circle cx="450" cy="60" r="20" fill="#0D9488" opacity="0.08"/>
      <circle cx="460" cy="140" r="12" fill="#0D9488" opacity="0.06"/>
      <circle cx="50" cy="100" r="15" fill="#0D9488" opacity="0.08"/>
      <circle cx="35" cy="180" r="8" fill="#0D9488" opacity="0.06"/>
      
      {/* Decorative dots */}
      <circle cx="440" cy="200" r="3" fill="#0D9488" opacity="0.3"/>
      <circle cx="455" cy="210" r="3" fill="#0D9488" opacity="0.2"/>
      <circle cx="445" cy="225" r="3" fill="#0D9488" opacity="0.15"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
     
      {/* NAVIGATION */}
      <Navbar variant="public" />

      {/* HERO SECTION */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 -z-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-slate-200 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                About Sprintly
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.1] mb-6">
                The precision curator for{' '}
                <span className="relative text-teal-600">
                  high-performing
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="#5EEAD4"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                teams
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                We don't just build project management software. We architect precision 
                systems that eliminate noise, surface clarity, and empower teams to ship 
                meaningful work — consistently and confidently.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/register">
                  <button className="group flex items-center gap-2 px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl shadow-lg shadow-teal-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Start Building
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/features">
                  <button className="px-7 py-3.5 text-slate-700 hover:text-teal-600 font-semibold rounded-2xl border-2 border-slate-200 hover:border-teal-200 hover:bg-teal-50/50 transition-all">
                    Explore Features
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Desk Illustration */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-100/50 to-slate-100/50 rounded-3xl blur-2xl -z-10" />
                <DeskIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PHILOSOPHY SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Why we exist
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We identified three critical failures that plague modern teams. 
              Sprintly was built to systematically eliminate each one.
            </p>
          </div>

          {/* Problem Cards - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {philosophyCards.map((card, index) => (
              <div
                key={index}
                className={`relative p-8 bg-white rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1 border-l-4 ${card.accent}`}
              >
                {/* Number Badge */}
                <span className="absolute top-6 right-6 text-6xl font-bold text-slate-100">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                  <card.icon className={`w-7 h-7 ${card.color.split(' ')[1]}`} />
                </div>

                {/* Content */}
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${card.color.split(' ')[1]}`}>
                  {card.subtitle}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Core Intent */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Core Intent
              </h3>
              <p className="text-slate-600">
                Three principles that drive every decision we make.
              </p>
            </div>

            <div className="space-y-0">
              {coreIntents.map((intent, index) => (
                <div
                  key={index}
                  className={`flex gap-6 lg:gap-8 p-6 lg:p-8 ${
                    index !== coreIntents.length - 1 ? 'border-b border-slate-200' : ''
                  } hover:bg-white rounded-2xl transition-colors group`}
                >
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl text-sm font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      {intent.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {intent.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {intent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TECHNOLOGY STACK SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              Technology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Built on modern foundations
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We chose each technology with purpose — performance, scalability, 
              and developer experience at the core of every decision.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group relative p-8 bg-slate-50 hover:bg-white rounded-2xl border-2 border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {tech.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {tech.name}
                </h3>
                <p className="text-teal-600 text-sm font-medium mb-3">
                  {tech.description}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tech.detail}
                </p>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </div>
            ))}
          </div>

          {/* Architecture Note */}
          <div className="mt-12 p-6 lg:p-8 bg-slate-900 rounded-2xl text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">MVC Architecture</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">RESTful APIs</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">JWT Authentication</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">Multi-Tenant SaaS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TEAM ARCHITECTS SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              The Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Team Architects
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A small, focused team of builders who've shipped products used by millions. 
              We bring decades of experience from companies like Atlassian, GitHub, and Trello.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-teal-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Grayscale Photo Placeholder */}
                <div className="relative h-56 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 overflow-hidden">
                  {/* Abstract Profile Shape */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Head */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-slate-400 rounded-full mb-1" />
                      {/* Shoulders */}
                      <div className="w-40 h-20 bg-slate-400 rounded-t-full -mt-2 mx-auto" />
                    </div>
                  </div>

                  {/* Initials Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300">
                    <span className="text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.initials}
                    </span>
                  </div>

                  {/* Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 text-sm font-medium mb-3">
                    {member.title}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
        
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to build with precision?
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of high-performing teams who've traded chaos for clarity. 
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-teal-600 font-semibold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                Start Free Trial
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all">
                Talk to Us
              </button>
            </Link>
          </div>
          <p className="mt-8 text-teal-200 text-sm">
            Free 14-day trial • No credit card • Cancel anytime
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <Footer/>
      {/* ============================================ */}
      {/* CUSTOM STYLES */}
      {/* ============================================ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        ::selection {
          background-color: #99F6E4;
          color: #134E4A;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default About;