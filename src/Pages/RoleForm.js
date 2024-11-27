import React, { useState, useEffect } from 'react';

// Available permissions
const availablePermissions = ['Read', 'Write', 'Delete', 'Update'];

const RoleForm = ({ role, onSave }) => {
  const [formData, setFormData] = useState({
    id: role?.id || null,
    name: role?.name || '',
    permissions: role?.permissions || [],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        id: role.id || null,
        name: role.name || '',
        permissions: role.permissions || [],
      });
    }
  }, [role]);

  // Handle input change for regular inputs (role name)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox changes for permissions
  const handlePermissionChange = (permission) => {
    setFormData((prevState) => {
      const permissions = prevState.permissions.includes(permission)
        ? prevState.permissions.filter((p) => p !== permission)
        : [...prevState.permissions, permission];
      return { ...prevState, permissions };
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave function passed as a prop to save the role
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Permissions:</label>
        {availablePermissions.map((permission) => (
          <div key={permission}>
            <input
              type="checkbox"
              id={permission}
              checked={formData.permissions.includes(permission)}
              onChange={() => handlePermissionChange(permission)}
            />
            <label htmlFor={permission}>{permission}</label>
          </div>
        ))}
      </div>

      <button type="submit">Save Role</button>
    </form>
  );
};

export default RoleForm;
