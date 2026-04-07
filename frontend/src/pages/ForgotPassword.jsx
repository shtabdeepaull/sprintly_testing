// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineArrowLeft, HiOutlineCheckCircle } from 'react-icons/hi';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { validateForgotPasswordForm } from '../utils/validators';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForgotPasswordForm({ email });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      await api.post('/auth/forgot-password', { email });
      
      setSubmitted(true);
      toast.success('Password reset email sent!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      toast.error(message);
      setErrors({ email: message });
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <img
                src={Logo}
                alt="Sprintly Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              Check your email
            </h1>
            
            <p className="text-secondary-500 mb-6">
              We've sent a password reset link to<br />
              <strong className="text-secondary-700">{email}</strong>
            </p>

            <p className="text-sm text-secondary-500 mb-6">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setSubmitted(false)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                try again
              </button>
            </p>

            <Link to="/login">
              <Button variant="secondary" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <img
              src={Logo}
              alt="Sprintly Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-soft p-8">
          {/* Back Link */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-1 text-sm text-secondary-500 hover:text-secondary-700 mb-6"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-secondary-900">Forgot password?</h1>
            <p className="text-secondary-500 mt-1">
              No worries, we'll send you reset instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              error={errors.email}
              placeholder="Enter your email"
              icon={HiOutlineMail}
              autoComplete="email"
              autoFocus
            />

            <Button type="submit" className="w-full" loading={loading}>
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary-500">
              Remember your password?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;