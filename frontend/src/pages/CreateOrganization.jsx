// src/pages/CreateOrganization.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useOrganization } from '../hooks/useOrganization';
import { generateSlug } from '../utils/helpers';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';

const CreateOrganization = () => {
  const navigate = useNavigate();
  const { createOrganization, loading } = useOrganization();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Auto-generate slug from name
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'URL slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const result = await createOrganization(formData);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-secondary-900">Sprintly</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-soft p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineOfficeBuilding className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900">Create your workspace</h1>
            <p className="text-secondary-500 mt-1">
              Set up your organization to start managing projects
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Organization Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g., Acme Corporation"
              required
            />

            <Input
              label="URL Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={errors.slug}
              placeholder="e.g., acme-corp"
              helperText="This will be used in your workspace URL"
              required
            />

            <Textarea
              label="Description (optional)"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your organization..."
              rows={3}
            />

            <Button type="submit" className="w-full" loading={loading}>
              Create Workspace
            </Button>
          </form>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <p className="text-sm text-secondary-500">
            Want to join an existing organization?{' '}
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Enter invite code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;