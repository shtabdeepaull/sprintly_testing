// src/pages/OrganizationSettings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { canAccessSettings } from '../utils/helpers';
import EmptyState from '../components/common/EmptyState';
import { useOrganization } from '../hooks/useOrganization';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Card, { CardHeader, CardTitle, CardContent } from '../components/common/Card';

const OrganizationSettings = () => {
  const navigate = useNavigate();
  const { currentOrganization, updateOrganization } = useOrganization();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const userRole = currentOrganization?.userRole || 'member';

  useEffect(() => {
    if (currentOrganization) {
      setFormData({
        name: currentOrganization.name || '',
        description: currentOrganization.description || ''
      });
    }
  }, [currentOrganization]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: 'Organization name is required' });
      return;
    }

    setLoading(true);

    const result = await updateOrganization(currentOrganization._id, formData);

    setLoading(false);

    if (result.success) {
      setErrors({});
      toast.success('Organization updated successfully');
    } else {
      toast.error(result.message || 'Failed to update organization');
    }
  };

  const handleDeleteOrganization = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this organization? This action cannot be undone and will delete all projects, tasks, and data.'
      )
    ) {
      return;
    }

    const confirmText = prompt('Type "DELETE" to confirm:');
    if (confirmText !== 'DELETE') {
      toast.info('Deletion cancelled');
      return;
    }

    try {
      // API call to delete organization would go here
      toast.success('Organization deleted');
      navigate('/create-organization');
    } catch (error) {
      toast.error('Failed to delete organization');
    }
  };

  if (currentOrganization && !canAccessSettings(userRole)) {
    return (
      <EmptyState
        title="Access restricted"
        description="Only owner and admin can access organization settings."
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Organization Settings
        </h1>
        <p className="text-secondary-500 mt-1">
          Manage your workspace settings
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Organization Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              error={errors.name}
              icon={HiOutlineOfficeBuilding}
            />

            <Input
              label="URL Slug"
              value={currentOrganization?.slug || ''}
              disabled
              helperText="The URL slug cannot be changed after creation"
            />

            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              placeholder="Describe your organization..."
              rows={3}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Workflow Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Default Task Workflow</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-secondary-600 mb-4">
            Configure the default task statuses for new projects.
          </p>

          <div className="flex flex-wrap gap-2">
            {currentOrganization?.settings?.defaultTaskStatuses?.map((status, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-secondary-100 rounded-lg text-sm text-secondary-700"
              >
                {status.replace('_', ' ')}
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" className="mt-4">
            Customize Workflow
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-secondary-900">
                  Delete Organization
                </p>
                <p className="text-sm text-secondary-600">
                  Permanently delete this organization and all its data
                </p>
              </div>

              <Button
                variant="danger"
                icon={HiOutlineTrash}
                onClick={handleDeleteOrganization}
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationSettings;