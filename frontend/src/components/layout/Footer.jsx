import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import logo from '../../assets/logo.png';

const Footer = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();

  // Minimal footer for dashboard
  if (variant === 'minimal') {
    
    return (
      <footer className="bg-white border-t border-secondary-200 py-4 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-500">
            &copy; {currentYear} Sprintly. Student project.
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

  // Full footer for landing and public pages
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
           <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Sprintly logo"
                className="h-16 w-auto object-contain"
              />
              {/* <span className="text-xl font-bold text-white">Sprintly</span> */}
            </Link>

            <p className="text-secondary-400 text-sm max-w-xs">
              We are here to replace JIRA.
            </p>
          </div> 

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
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
                  to="/about"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
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
                  Help
                </a>
              </li>
              <li>
                <a
                  href="mailto:techsolution.chatgpt@gmail.com"
                  className="flex items-center gap-2 text-secondary-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-4 h-4" />
                  Email
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-secondary-400 hover:text-white transition-colors text-sm block"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-secondary-400 hover:text-white transition-colors text-sm block"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-secondary-400 text-sm">
              &copy; {currentYear} Sprintly. Student project.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-secondary-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;