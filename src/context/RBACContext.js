import React, { createContext, useState } from 'react';

export const RBACContext = createContext();

const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions] = useState(['Read', 'Write', 'Delete']);

  const addRole = (role) => setRoles([...roles, { ...role, id: Date.now() }]);
  const editRole = (updatedRole) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  };

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));
  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <RBACContext.Provider
      value={{
        users,
        roles,
        permissions,
        addRole,
        editRole,
        deleteUser,
        toggleUserStatus,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export default RBACProvider;
