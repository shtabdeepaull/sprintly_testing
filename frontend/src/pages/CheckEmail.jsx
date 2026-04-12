import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../services/authService';

export default function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      setMessage('Email address is missing. Please register again.');
      return;
    }

    try {
      setLoading(true);
      const res = await authService.resendVerificationEmail(email);
      setMessage(res.message || 'Verification email sent again');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please verify your email</h1>

        <p className="text-gray-600 mb-2">
          We sent a verification link to:
        </p>

        <p className="font-semibold mb-6 break-all">
          {email || 'your email address'}
        </p>

        <p className="text-gray-500 mb-6">
          Please verify your email before using Sprintly.
        </p>

        {message && (
          <p className="mb-4 text-sm text-blue-600">{message}</p>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Sending...' : 'Resend verification email'}
        </button>

        <div className="mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 underline"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}