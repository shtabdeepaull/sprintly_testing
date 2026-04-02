// src/pages/Pricing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiCheck,
  HiX,
  HiOutlineArrowRight,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineQuestionMarkCircle,
  HiOutlineStar,
  HiOutlineShieldCheck,
  // HiOutlineLightningBolt,
  // HiOutlineUserGroup
} from 'react-icons/hi';

const Pricing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

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

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for individuals and small teams getting started.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      cta: 'Get Started Free',
      ctaVariant: 'secondary',
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: '3 projects', included: true },
        { text: 'Basic Kanban boards', included: true },
        { text: 'Task management', included: true },
        { text: '1GB storage', included: true },
        { text: 'Email support', included: true },
        { text: 'Custom workflows', included: false },
        { text: 'Advanced analytics', included: false },
        { text: 'Priority support', included: false },
        { text: 'SSO & 2FA', included: false }
      ]
    },
    {
      name: 'Pro',
      description: 'For growing teams who need more power and flexibility.',
      monthlyPrice: 12,
      yearlyPrice: 10,
      popular: true,
      cta: 'Start Free Trial',
      ctaVariant: 'primary',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: 'Unlimited projects', included: true },
        { text: 'Advanced Kanban boards', included: true },
        { text: 'Custom workflows', included: true },
        { text: '25GB storage', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Time tracking', included: true },
        { text: 'API access', included: true },
        { text: 'SSO & 2FA', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced security needs.',
      monthlyPrice: null,
      yearlyPrice: null,
      popular: false,
      cta: 'Contact Sales',
      ctaVariant: 'secondary',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'SSO & SAML 2.0', included: true },
        { text: 'Advanced security', included: true },
        { text: 'Audit logs', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'On-premise deployment', included: true },
        { text: 'SLA guarantee', included: true }
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I try Sprintly for free?',
      answer: 'Yes! Our Free plan is free forever with core features. You can also start a 14-day free trial of Pro with no credit card required.'
    },
    {
      question: 'What happens when my trial ends?',
      answer: 'When your trial ends, you\'ll be moved to the Free plan automatically. You won\'t lose any data, but some features will be restricted.'
    },
    {
      question: 'Can I change plans at any time?',
      answer: 'Absolutely! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Do you offer discounts for nonprofits?',
      answer: 'Yes! We offer 50% off for verified nonprofits and educational institutions. Contact our sales team to learn more.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for annual Enterprise plans.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-grade encryption, are SOC 2 Type II compliant, and your data is backed up daily in secure data centers.'
    }
  ];

  const getPrice = (plan) => {
    if (plan.monthlyPrice === null) return 'Custom';
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return price === 0 ? 'Free' : `$${price}`;
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
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Sprintly</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative font-medium transition-colors group ${
                    link.name === 'Pricing' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300 ${
                    link.name === 'Pricing' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

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
                  link.name === 'Pricing' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
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
      <section className="relative pt-28 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 -z-10" />
        <div className="absolute top-20 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            Simple Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Choose the perfect plan for{' '}
            <span className="text-indigo-600">your team</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING CARDS */}
      {/* ============================================ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30 scale-105 z-10'
                    : 'bg-white border-2 border-slate-200 hover:border-indigo-200 hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      <HiOutlineStar className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Name & Description */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                      {getPrice(plan)}
                    </span>
                    {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                      <span className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>
                        /user/month
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && plan.monthlyPrice > 0 && (
                    <p className={`text-sm mt-1 ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>
                      Billed annually (${plan.yearlyPrice * 12}/user/year)
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                  <button
                    className={`w-full py-3.5 rounded-2xl font-semibold transition-all mb-8 ${
                      plan.popular
                        ? 'bg-white text-indigo-600 hover:bg-slate-50 shadow-lg'
                        : plan.ctaVariant === 'primary'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <HiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-indigo-200' : 'text-emerald-500'
                        }`} />
                      ) : (
                        <HiX className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-indigo-300/50' : 'text-slate-300'
                        }`} />
                      )}
                      <span className={`text-sm ${
                        feature.included
                          ? plan.popular ? 'text-white' : 'text-slate-700'
                          : plan.popular ? 'text-indigo-300/50' : 'text-slate-400'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Note */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full">
              <HiOutlineShieldCheck className="w-5 h-5" />
              <span className="font-medium">30-day money-back guarantee on all paid plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURE COMPARISON */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Compare plans in detail
            </h2>
            <p className="text-lg text-slate-600">
              See which plan is right for your team.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className={`py-6 px-6 text-center ${plan.popular ? 'bg-indigo-50' : ''}`}>
                        <span className={`font-bold text-lg ${plan.popular ? 'text-indigo-600' : 'text-slate-900'}`}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Team members', values: ['Up to 5', 'Unlimited', 'Unlimited'] },
                    { feature: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
                    { feature: 'Storage', values: ['1GB', '25GB', 'Unlimited'] },
                    { feature: 'Kanban boards', values: ['Basic', 'Advanced', 'Advanced'] },
                    { feature: 'Custom workflows', values: [false, true, true] },
                    { feature: 'Analytics', values: ['Basic', 'Advanced', 'Advanced'] },
                    { feature: 'Time tracking', values: [false, true, true] },
                    { feature: 'API access', values: [false, true, true] },
                    { feature: 'SSO & SAML', values: [false, false, true] },
                    { feature: 'Dedicated support', values: [false, false, true] }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="py-4 px-6 text-slate-700 font-medium">{row.feature}</td>
                      {row.values.map((value, j) => (
                        <td key={j} className={`py-4 px-6 text-center ${plans[j].popular ? 'bg-indigo-50/50' : ''}`}>
                          {typeof value === 'boolean' ? (
                            value ? (
                              <HiCheck className="w-5 h-5 text-emerald-500 mx-auto" />
                            ) : (
                              <HiX className="w-5 h-5 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-slate-700">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our pricing.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiOutlineQuestionMarkCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all">
                Contact our team
                <HiOutlineArrowRight className="w-5 h-5" />
              </button>
            </Link>
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
            Ready to get started?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using Sprintly to ship projects faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <button className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-indigo-600 font-semibold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                Start Free Trial
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all">
                Contact Sales
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
                                    className="text-slate-400 hover:text-white transition-colors">
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
                    className="text-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};

export default Pricing;