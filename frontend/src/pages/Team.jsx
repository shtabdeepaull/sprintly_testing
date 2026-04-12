import React, { useState } from 'react';
import {
  HiOutlineUserAdd,
  HiOutlineMail,
  HiOutlineDotsVertical,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch
} from 'react-icons/hi';
import { useOrganization } from '../hooks/useOrganization';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import Dropdown, { DropdownItem, DropdownDivider } from '../components/common/Dropdown';
import EmptyState from '../components/common/EmptyState';
import { USER_ROLES } from '../utils/constants';
import { formatDate, canManageOrganization } from '../utils/helpers';

const Team = () => {
  const {
    members,
    currentOrganization,
    inviteMember,
    updateMemberRole,
    removeMember
  } = useOrganization();

  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: 'member', team: '' });
  const [inviting, setInviting] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const userRole = currentOrganization?.userRole || 'member';
  const canManageTeam = canManageOrganization(userRole);

  const safeMembers = Array.isArray(members)
    ? members.filter((member) => member && member.user)
    : [];

  const filteredMembers = safeMembers.filter((member) => {
    const fullName = member.user?.fullName || '';
    const email = member.user?.email || '';
    const query = search.toLowerCase();

    return (
      fullName.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query)
    );
  });

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!canManageTeam) return;

    setInviting(true);

    const result = await inviteMember(inviteData.email, inviteData.role, inviteData.team);

    if (result.success) {
      setShowInviteModal(false);
      setInviteData({ email: '', role: 'member', team: '' });
    }

    setInviting(false);
  };

  const handleRoleChange = async (memberId, newRole) => {
    if (!canManageTeam) return;
    await updateMemberRole(memberId, newRole);
    setEditingMember(null);
  };

  const handleRemoveMember = async (memberId) => {
    if (!canManageTeam) return;
    if (!window.confirm('Are you sure you want to remove this member?')) return;

    await removeMember(memberId);
  };

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'member', label: 'Member' },
    { value: 'guest', label: 'Guest' }
  ];

  const teamOptions = [
    { value: '', label: 'No Team' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Team</h1>
          <p className="mt-1 text-secondary-500">
            Manage members in {currentOrganization?.name}
          </p>
        </div>

        {canManageTeam && (
          <Button onClick={() => setShowInviteModal(true)} icon={HiOutlineUserAdd}>
            Invite Member
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="w-full sm:w-72">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members..."
          icon={HiOutlineSearch}
        />
      </div>

      {/* Members Table */}
      {filteredMembers.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-soft">
          <table className="w-full">
            <thead className="border-b border-secondary-200 bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                  Joined
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary-100">
              {filteredMembers.map((member) => {
                const role = USER_ROLES[member.role];

                return (
                  <tr key={member._id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={member.user?.avatar}
                          name={member.user?.fullName || 'Unnamed User'}
                          size="md"
                        />
                        <div>
                          <p className="font-medium text-secondary-900">
                            {member.user?.fullName || 'Unnamed User'}
                          </p>
                          <p className="text-sm text-secondary-500">
                            {member.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {editingMember === member._id ? (
                        <Select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member._id, e.target.value)}
                          options={roleOptions}
                          className="w-40"
                        />
                      ) : (
                        <Badge className={role?.color}>
                          {role?.label || member.role}
                        </Badge>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-secondary-600">
                      {member.team || '-'}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant={member.status === 'active' ? 'success' : 'warning'}
                        dot
                      >
                        {member.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-sm text-secondary-600">
                      {formatDate(member.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      {canManageTeam && member.role !== 'owner' && (
                        <Dropdown
                          trigger={
                            <button
                              type="button"
                              className="rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700"
                            >
                              <HiOutlineDotsVertical className="h-4 w-4" />
                            </button>
                          }
                          position="bottom-right"
                        >
                          <DropdownItem
                            icon={HiOutlinePencil}
                            onClick={() => setEditingMember(member._id)}
                          >
                            Change Role
                          </DropdownItem>

                          <DropdownDivider />

                          <DropdownItem
                            icon={HiOutlineTrash}
                            danger
                            onClick={() => handleRemoveMember(member._id)}
                          >
                            Remove
                          </DropdownItem>
                        </Dropdown>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={HiOutlineUserAdd}
          title="No team members yet"
          description={
            canManageTeam
              ? 'Invite your team members to start collaborating'
              : 'No team members found'
          }
          actionLabel={canManageTeam ? 'Invite Member' : undefined}
          onAction={canManageTeam ? () => setShowInviteModal(true) : undefined}
        />
      )}

      {/* Invite Modal */}
      {canManageTeam && (
        <Modal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          title="Invite Team Member"
        >
          <form onSubmit={handleInvite}>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={inviteData.email}
                onChange={(e) =>
                  setInviteData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="colleague@example.com"
                icon={HiOutlineMail}
                required
              />

              <Select
                label="Role"
                value={inviteData.role}
                onChange={(e) =>
                  setInviteData((prev) => ({ ...prev, role: e.target.value }))
                }
                options={roleOptions}
              />

              <Select
                label="Team (optional)"
                value={inviteData.team}
                onChange={(e) =>
                  setInviteData((prev) => ({ ...prev, team: e.target.value }))
                }
                options={teamOptions}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-secondary-200 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" loading={inviting}>
                Send Invite
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Team;