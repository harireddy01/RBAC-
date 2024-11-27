import React, { useState } from 'react';
import RoleForm from './RoleForm';

const RolePage = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

  const handleSaveRole = (roleData) => {
    if (roleData.id) {
      // Editing an existing role
      setRoles(roles.map((role) => (role.id === roleData.id ? roleData : role)));
    } else {
      // Adding a new role
      setRoles([...roles, { ...roleData, id: roles.length + 1 }]);
    }
    setIsFormVisible(false); // Close the form after saving
    setRoleToEdit(null);
  };

  const handleEditRole = (role) => {
    setRoleToEdit(role);
    setIsFormVisible(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return (
    <div>
      <h2>Role Management</h2>
      <button onClick={() => setIsFormVisible(true)}>Add Role</button>

      {isFormVisible && (
        <RoleForm role={roleToEdit} onSave={handleSaveRole} />
      )}

      <div>
        <h3>Existing Roles</h3>
        {roles.length === 0 ? (
          <p>No roles available. Please add a role.</p>
        ) : (
          <ul>
            {roles.map((role) => (
              <li key={role.id}>
                <h4>{role.name}</h4>
                <p>Permissions: {role.permissions.join(', ')}</p>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RolePage;
