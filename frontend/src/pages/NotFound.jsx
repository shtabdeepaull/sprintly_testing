// src/pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineArrowLeft, HiOutlineSearch } from 'react-icons/hi';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[150px] font-bold text-secondary-200 leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <HiOutlineSearch className="w-10 h-10 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-secondary-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => navigate(-1)}
            variant="secondary"
            icon={HiOutlineArrowLeft}
          >
            Go Back
          </Button>
          
          <Link to="/dashboard">
            <Button icon={HiOutlineHome}>
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-500 mb-4">
            Need help? Try these links:
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link 
              to="/projects" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Projects
            </Link>
            <Link 
              to="/my-tasks" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              My Tasks
            </Link>
            <Link 
              to="/team" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Team
            </Link>
            <a 
              href="mailto:support@sprintly.com" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;