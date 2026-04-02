import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiBell,
  HiMenuAlt3,
  HiChevronDown,
  HiLogout,
  HiUser,
  HiCog
} from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { useOrganization } from '../../hooks/useOrganization';
import { useNotifications } from '../../hooks/useNotifications';
import Avatar from '../common/Avatar';
import Dropdown, { DropdownItem, DropdownDivider } from '../common/Dropdown';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { organizations, currentOrganization, switchOrganization } = useOrganization();
  const { unreadCount } = useNotifications();

  const hasWorkspace = organizations.length > 0 && !!currentOrganization;
  const brandLink = hasWorkspace ? '/dashboard' : '/create-organization';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-secondary-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg"
              type="button"
            >
              <HiMenuAlt3 className="w-6 h-6" />
            </button>

            <Link to={brandLink} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-secondary-900">
                Sprintly
              </span>
            </Link>

            {hasWorkspace && organizations.length > 1 && (
              <Dropdown
                trigger={
                  <button
                    type="button"
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-sm font-medium text-secondary-700"
                  >
                    {currentOrganization?.name || 'Select Organization'}
                    <HiChevronDown className="w-4 h-4" />
                  </button>
                }
                position="bottom-left"
              >
                {organizations.map((org) => (
                  <DropdownItem key={org._id} onClick={() => switchOrganization(org)}>
                    <div className="flex items-center justify-between w-full">
                      <span>{org.name}</span>
                      {org._id === currentOrganization?._id && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </div>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              className="relative p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg"
            >
              <HiBell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 p-1 hover:bg-secondary-100 rounded-lg"
                >
                  <Avatar src={user?.avatar} name={user?.fullName} size="sm" />
                  <span className="hidden sm:block text-sm font-medium text-secondary-700">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                  <HiChevronDown className="hidden sm:block w-4 h-4 text-secondary-500" />
                </button>
              }
              position="bottom-right"
            >
              <div className="px-4 py-3 border-b border-secondary-100">
                <p className="text-sm font-medium text-secondary-900">{user?.fullName}</p>
                <p className="text-xs text-secondary-500">{user?.email}</p>
              </div>

              <DropdownItem icon={HiUser} onClick={() => navigate('/profile')}>
                Profile
              </DropdownItem>

              {hasWorkspace && (
                <DropdownItem icon={HiCog} onClick={() => navigate('/settings')}>
                  Settings
                </DropdownItem>
              )}

              <DropdownDivider />

              <DropdownItem icon={HiLogout} danger onClick={handleLogout}>
                Log out
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;