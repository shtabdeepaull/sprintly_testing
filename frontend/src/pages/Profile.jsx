import React, { useRef, useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineCamera
} from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Avatar from '../components/common/Avatar';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import Card, { CardHeader, CardTitle, CardContent } from '../components/common/Card';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [actionLoading, setActionLoading] = useState('');
  const {
    user,
    updateProfile,
    updatePassword,
    uploadProfileImage,
    removeProfileImage,
    logout
  } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setActionLoading('upload');

      const result = await uploadProfileImage(selectedFile);

      if (result.success) {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } finally {
      setActionLoading('');
    }
  };

  const handleRemoveImage = async () => {
    if (!user?.avatar) {
      toast.error('No profile image to remove');
      return;
    }

    try {
      setActionLoading('remove');

      const result = await removeProfileImage();

      if (result.success) {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } finally {
      setActionLoading('');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setActionLoading('delete');

      await authService.deleteMyAccount();
      await logout(false);

      toast.success('Account deleted successfully');
      navigate('/register');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setActionLoading('');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileErrors({});

    if (!profileData.fullName.trim()) {
      setProfileErrors({ fullName: 'Name is required' });
      return;
    }

    setProfileLoading(true);
    await updateProfile(profileData);
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrors({});

    const errors = {};
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordLoading(true);
    const result = await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    if (result.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setPasswordLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Profile Settings</h1>
        <p className="mt-1 text-secondary-500">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar src={user?.avatar} name={user?.fullName} size="xl" />
              <button
                type="button"
                onClick={handleChooseImage}
                className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700"
              >
                <HiOutlineCamera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1">
              <p className="text-sm text-secondary-600">
                Upload a new profile picture. Supported formats: JPG, PNG, WEBP. Max size: 2MB.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="mt-3 block w-full text-sm text-secondary-600"
              />

              {selectedFile && (
                <p className="mt-2 text-sm text-secondary-500">
                  Selected: {selectedFile.name}
                </p>
              )}

              <div className="mt-3 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handleUploadImage}
                  loading={actionLoading === 'upload'}
                  disabled={!selectedFile}
                >
                  Upload Image
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={handleRemoveImage}
                  loading={actionLoading === 'remove'}
                  disabled={!user?.avatar}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              error={profileErrors.fullName}
              icon={HiOutlineUser}
            />

            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              error={profileErrors.email}
              icon={HiOutlineMail}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={profileLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value
                }))
              }
              error={passwordErrors.currentPassword}
              icon={HiOutlineLockClosed}
            />

            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value
                }))
              }
              error={passwordErrors.newPassword}
              icon={HiOutlineLockClosed}
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))
              }
              error={passwordErrors.confirmPassword}
              icon={HiOutlineLockClosed}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={passwordLoading}>
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-secondary-600">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            loading={actionLoading === 'delete'}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;