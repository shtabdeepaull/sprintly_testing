// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      const nextState = location.state?.invitationToken
        ? {
            invitationToken: location.state.invitationToken,
            redirectTo: location.state.redirectTo
          }
        : undefined;

      navigate('/check-email', {
        replace: true,
        state: {
          ...nextState,
          email: formData.email
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-secondary-900">Sprintly</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-secondary-900">Create your account</h1>
            <p className="text-secondary-500 mt-1">Start managing projects today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="John Doe"
              icon={HiOutlineUser}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              icon={HiOutlineMail}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={HiOutlineLockClosed}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              icon={HiOutlineLockClosed}
              autoComplete="new-password"
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-secondary-600">
                I agree to the platform terms and privacy policy.
              </label>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary-500">
              Already have an account?{' '}
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

export default Register;