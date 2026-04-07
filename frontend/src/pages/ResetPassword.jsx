// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { validateResetPasswordForm, validatePassword } from '../utils/validators';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  // Password strength indicator
  const passwordStrength = validatePassword(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateResetPasswordForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      await api.put(`/auth/reset-password/${token}`, {
        password: formData.password
      });
      
      setSuccess(true);
      toast.success('Password reset successful!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      
      if (message.includes('Invalid') || message.includes('expired')) {
        setTokenError(true);
      } else {
        toast.error(message);
        setErrors({ password: message });
      }
    } finally {
      setLoading(false);
    }
  };

  // Token error state
  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <img
                src={Logo}
                alt="Sprintly Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineExclamationCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              Invalid or Expired Link
            </h1>
            
            <p className="text-secondary-500 mb-6">
              This password reset link is invalid or has expired. 
              Please request a new password reset.
            </p>

            <div className="space-y-3">
              <Link to="/forgot-password">
                <Button className="w-full">
                  Request New Link
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="secondary" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <img
                src={Logo}
                alt="Sprintly Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              Password Reset Successful!
            </h1>
            
            <p className="text-secondary-500 mb-6">
              Your password has been reset successfully. 
              You'll be redirected to the login page shortly.
            </p>

            <Link to="/login">
              <Button className="w-full">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get strength indicator color
  const getStrengthColor = () => {
    if (passwordStrength.strength <= 1) return 'bg-red-500';
    if (passwordStrength.strength === 2) return 'bg-orange-500';
    if (passwordStrength.strength === 3) return 'bg-yellow-500';
    if (passwordStrength.strength === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

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
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-secondary-900">Set new password</h1>
            <p className="text-secondary-500 mt-1">
              Your new password must be different from previous passwords
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter new password"
                icon={HiOutlineLockClosed}
                autoComplete="new-password"
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-secondary-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength <= 2 ? 'text-red-500' : 
                      passwordStrength.strength === 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.strengthLabel}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-500">
                    Use 6+ characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm new password"
              icon={HiOutlineLockClosed}
              autoComplete="new-password"
            />

            <Button type="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;