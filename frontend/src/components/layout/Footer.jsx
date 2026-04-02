// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlineChat,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';

const Footer = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();

  // Minimal footer for dashboard
  if (variant === 'minimal') {
    return (
      <footer className="bg-white border-t border-secondary-200 py-4 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-500">
            &copy; {currentYear} Sprintly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/help"
              className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              Help
            </a>
            <a
              href="/privacy"
              className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer for landing page and public pages
  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white">Sprintly</span>
            </Link>
            <p className="text-secondary-400 text-sm mb-4">
              Modern project management for teams that want to deliver results faster.
            </p>
            <div className="flex items-center gap-3">
              {/* Social Media Links */}
              <a
                href="https://twitter.com/sprintly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-secondary-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/sprintly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-secondary-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/sprintly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-secondary-700 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/features"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  to="/changelog"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-600 text-white">
                    Hiring
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/help"
                  className="flex items-center gap-2 text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineQuestionMarkCircle className="w-4 h-4" />
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="flex items-center gap-2 text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineDocumentText className="w-4 h-4" />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="flex items-center gap-2 text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineChat className="w-4 h-4" />
                  Community
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@sprintly.com"
                  className="flex items-center gap-2 text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-4 h-4" />
                  Email Support
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Subscribe to our newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-sm text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-400 text-sm">
              &copy; {currentYear} Sprintly, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Cookie Policy
              </Link>
              <Link
                to="/security"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;