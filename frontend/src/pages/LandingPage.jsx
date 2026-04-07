import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import LandingHeroDashboard from '../assets/landing-hero-dashboard.png';
import PublicCTA from '../components/common/PublicCTA';
import {
  HiOutlineViewBoards,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlinePlay,
  HiOutlineStar
} from 'react-icons/hi';

const LandingPage = () => {
  const features = [
    {
      icon: HiOutlineViewBoards,
      title: 'Kanban Boards',
      description:
        'Visualize your workflow with intuitive drag-and-drop boards that adapt to your process.',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: HiOutlineUserGroup,
      title: 'Team Collaboration',
      description:
        'Work together seamlessly with real-time updates, comments, and @mentions.',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: HiOutlineBell,
      title: 'Smart Notifications',
      description:
        'Stay informed with intelligent alerts that keep you in the loop without the noise.',
      color: 'bg-violet-50 text-violet-600'
    }
  ];

  const featureHighlights = [
    {
      badge: 'Project Management',
      title: 'Organize work your way with powerful Kanban boards',
      description:
        "Create custom workflows that match your team's unique process. Drag and drop tasks, set priorities, add due dates, and track progress in real-time.",
      features: [
        'Unlimited custom columns and swimlanes',
        'Drag-and-drop task management',
        'Task dependencies and blockers',
        'Due dates with smart reminders',
        'File attachments and comments'
      ],
      imageType: 'kanban'
    },
    {
      badge: 'Team Collaboration',
      title: 'Bring your entire team together in one place',
      description:
        'Enable seamless communication with built-in messaging, threaded comments, and @mentions. Keep all discussions in context.',
      features: [
        'Real-time collaboration',
        'Threaded comments on tasks',
        '@mentions and notifications',
        'Team activity feeds',
        'Shared team workspaces'
      ],
      imageType: 'collaboration'
    },
    {
      badge: 'Analytics & Insights',
      title: 'Make smarter decisions with actionable data',
      description:
        "Understand your team's performance with beautiful dashboards. Track velocity, identify bottlenecks, and optimize your workflow.",
      features: [
        'Customizable dashboards',
        'Burndown and velocity charts',
        'Team performance metrics',
        'Time tracking reports',
        'Export to CSV and PDF'
      ],
      imageType: 'analytics'
    }
  ];

  const testimonials = [
    {
      quote:
        "Sprintly transformed how our engineering team operates. We've seen a 40% increase in productivity since switching.",
      author: 'Sarah Chen',
      role: 'VP of Engineering',
      company: 'TechCorp',
      initials: 'SC'
    },
    {
      quote:
        "The best project management tool we've ever used. Simple enough to start immediately, powerful enough to scale.",
      author: 'Michael Roberts',
      role: 'Product Manager',
      company: 'StartupXYZ',
      initials: 'MR'
    },
    {
      quote:
        'Finally, a tool that our entire team actually enjoys using. The UI is beautiful and incredibly intuitive.',
      author: 'Emily Johnson',
      role: 'Design Lead',
      company: 'DesignStudio',
      initials: 'EJ'
    }
  ];

  const FeatureIllustration = ({ type }) => {
    const illustrations = {
      kanban: (
        <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="480" height="320" rx="16" fill="#F8FAFC" />
          <rect x="20" y="20" width="138" height="280" rx="12" fill="#EEF2FF" />
          <rect x="170" y="20" width="138" height="280" rx="12" fill="#F0FDF4" />
          <rect x="320" y="20" width="138" height="280" rx="12" fill="#FEF3C7" />
          <rect x="32" y="32" width="55" height="14" rx="4" fill="#4F46E5" />
          <rect x="182" y="32" width="70" height="14" rx="4" fill="#10B981" />
          <rect x="332" y="32" width="45" height="14" rx="4" fill="#F59E0B" />
          {[0, 1, 2].map((i) => (
            <g key={`c1-${i}`}>
              <rect x="32" y={60 + i * 75} width="114" height="65" rx="8" fill="white" stroke="#E0E7FF" />
              <rect x="44" y={72 + i * 75} width="70" height="8" rx="2" fill="#334155" />
              <rect x="44" y={86 + i * 75} width="90" height="6" rx="2" fill="#94A3B8" />
              <rect x="44" y={98 + i * 75} width="60" height="6" rx="2" fill="#94A3B8" />
              <circle cx="122" cy={110 + i * 75} r="10" fill="#4F46E5" />
            </g>
          ))}
          {[0, 1].map((i) => (
            <g key={`c2-${i}`}>
              <rect x="182" y={60 + i * 90} width="114" height="75" rx="8" fill="white" stroke="#D1FAE5" />
              <rect x="194" y={72 + i * 90} width="75" height="8" rx="2" fill="#334155" />
              <rect x="194" y={86 + i * 90} width="90" height="6" rx="2" fill="#94A3B8" />
              <rect x="194" y={98 + i * 90} width="70" height="6" rx="2" fill="#94A3B8" />
              <circle cx="272" cy={120 + i * 90} r="10" fill="#10B981" />
            </g>
          ))}
          <rect x="332" y="60" width="114" height="65" rx="8" fill="white" stroke="#FDE68A" />
          <rect x="344" y="72" width="60" height="8" rx="2" fill="#334155" />
          <rect x="344" y="86" width="85" height="6" rx="2" fill="#94A3B8" />
          <circle cx="422" cy="105" r="10" fill="#F59E0B" />
        </svg>
      ),
      collaboration: (
        <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="480" height="320" rx="16" fill="#F8FAFC" />
          <g>
            <circle cx="60" cy="80" r="32" fill="#EEF2FF" />
            <text x="48" y="88" fill="#4F46E5" fontSize="20" fontWeight="bold">SC</text>
            <rect x="105" y="52" width="180" height="56" rx="12" fill="white" stroke="#E0E7FF" />
            <rect x="120" y="66" width="120" height="8" rx="2" fill="#334155" />
            <rect x="120" y="80" width="150" height="6" rx="2" fill="#94A3B8" />
            <rect x="120" y="92" width="90" height="6" rx="2" fill="#94A3B8" />
          </g>
          <g>
            <rect x="150" y="130" width="200" height="65" rx="12" fill="#4F46E5" />
            <rect x="165" y="145" width="130" height="8" rx="2" fill="white" />
            <rect x="165" y="159" width="170" height="6" rx="2" fill="#C7D2FE" />
            <rect x="165" y="171" width="100" height="6" rx="2" fill="#C7D2FE" />
            <circle cx="390" cy="162" r="32" fill="#EEF2FF" />
            <text x="376" y="170" fill="#4F46E5" fontSize="20" fontWeight="bold">MR</text>
          </g>
          <g>
            <circle cx="60" cy="250" r="32" fill="#F0FDF4" />
            <text x="48" y="258" fill="#10B981" fontSize="20" fontWeight="bold">EJ</text>
            <rect x="105" y="222" width="160" height="50" rx="12" fill="white" stroke="#D1FAE5" />
            <rect x="120" y="236" width="100" height="8" rx="2" fill="#334155" />
            <rect x="120" y="250" width="130" height="6" rx="2" fill="#94A3B8" />
          </g>
          <circle cx="430" cy="50" r="22" fill="#FEE2E2" />
          <text x="423" y="56" fill="#EF4444" fontSize="16" fontWeight="bold">3</text>
          <circle cx="420" cy="280" r="6" fill="#10B981" />
          <rect x="345" y="272" width="60" height="16" rx="8" fill="#F0FDF4" />
          <text x="354" y="284" fill="#10B981" fontSize="10">Online</text>
        </svg>
      ),
      analytics: (
        <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="480" height="320" rx="16" fill="#F8FAFC" />
          <rect x="20" y="20" width="260" height="170" rx="12" fill="white" stroke="#E2E8F0" />
          <rect x="35" y="35" width="80" height="10" rx="3" fill="#334155" />
          <rect x="50" y="145" width="28" height="30" rx="4" fill="#C7D2FE" />
          <rect x="88" y="115" width="28" height="60" rx="4" fill="#A5B4FC" />
          <rect x="126" y="85" width="28" height="90" rx="4" fill="#818CF8" />
          <rect x="164" y="65" width="28" height="110" rx="4" fill="#6366F1" />
          <rect x="202" y="95" width="28" height="80" rx="4" fill="#4F46E5" />
          <rect x="240" y="55" width="28" height="120" rx="4" fill="#4338CA" />
          <circle cx="380" cy="105" r="65" fill="#EEF2FF" />
          <path d="M380 40 A65 65 0 0 1 445 105 L380 105 Z" fill="#4F46E5" />
          <path d="M445 105 A65 65 0 0 1 380 170 L380 105 Z" fill="#10B981" />
          <path d="M380 170 A65 65 0 0 1 315 105 L380 105 Z" fill="#F59E0B" />
          <rect x="20" y="210" width="140" height="90" rx="12" fill="white" stroke="#E2E8F0" />
          <rect x="35" y="225" width="50" height="8" rx="2" fill="#94A3B8" />
          <rect x="35" y="242" width="70" height="16" rx="4" fill="#4F46E5" />
          <rect x="35" y="270" width="90" height="6" rx="2" fill="#D1FAE5" />
          <text x="130" y="275" fill="#10B981" fontSize="10">+12%</text>
          <rect x="170" y="210" width="140" height="90" rx="12" fill="white" stroke="#E2E8F0" />
          <rect x="185" y="225" width="60" height="8" rx="2" fill="#94A3B8" />
          <rect x="185" y="242" width="80" height="16" rx="4" fill="#10B981" />
          <rect x="185" y="270" width="70" height="6" rx="2" fill="#FEF3C7" />
          <text x="280" y="275" fill="#F59E0B" fontSize="10">+8%</text>
          <rect x="320" y="210" width="140" height="90" rx="12" fill="white" stroke="#E2E8F0" />
          <rect x="335" y="225" width="45" height="8" rx="2" fill="#94A3B8" />
          <rect x="335" y="242" width="60" height="16" rx="4" fill="#F59E0B" />
          <rect x="335" y="270" width="100" height="6" rx="2" fill="#EEF2FF" />
          <text x="430" y="275" fill="#4F46E5" fontSize="10">+24%</text>
        </svg>
      )
    };

    return illustrations[type] || illustrations.kanban;
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar variant="public" />

      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <HiOutlineStar className="w-4 h-4 fill-indigo-600" />
                <span>Rated #1 Project Management Tool</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                Ship projects{' '}
                <span className="relative text-indigo-600">
                  faster
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="#818CF8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                with your team
              </h1>

              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Sprintly brings all your tasks, teammates, and tools together in one place.
                Plan, track, and deliver projects with clarity and confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link to="/register">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">
                    Start Free Trial
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                  <HiOutlinePlay className="w-5 h-5 text-indigo-600" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {['indigo', 'emerald', 'amber', 'rose'].map((color, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 bg-${color}-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-medium shadow-sm`}
                      style={{
                        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#F43F5E'][i]
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center text-slate-600 text-xs font-medium">
                    +5K
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 justify-center lg:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-slate-700">4.9/5</span>
                  </div>
                  <p className="text-sm text-slate-500">from 2,000+ reviews</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-3xl opacity-40 blur-2xl -z-10" />
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-200/60 p-2 overflow-hidden">
                <img
                  src={LandingHeroDashboard}
                  alt="Sprintly dashboard preview"
                  className="w-full h-auto rounded-[1rem] object-cover"
                />
              </div>

              <div className="hidden lg:flex absolute -left-6 top-1/4 bg-white rounded-xl shadow-xl border border-slate-100 p-4 items-center gap-3 animate-float">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <HiOutlineCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Task Completed!</p>
                  <p className="text-xs text-slate-500">Just now</p>
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-xl border border-slate-100 p-4 items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <HiOutlineUserGroup className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">8 online</p>
                  <p className="text-xs text-slate-500">Team members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Powerful features designed for modern teams. Simple enough to start today,
              powerful enough to scale with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/features">
              <button className="group inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                Explore all features
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {featureHighlights.map((highlight, index) => (
        <section
          key={index}
          className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ${
            index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}>
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
                <Link to="/features">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all">
                    Learn More
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              <div className={index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl opacity-50 blur-xl -z-10" />
                  <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 overflow-hidden">
                    <FeatureIllustration type={highlight.imageType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Loved by teams worldwide
            </h2>
            <p className="text-lg text-slate-600">
              See what our customers have to say about their experience with Sprintly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicCTA />

     <Footer/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background-color: #C7D2FE;
          color: #3730A3;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;