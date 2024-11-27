import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  // State to manage the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Mock roles and permissions
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
  ]);

  // Mock users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Alice Johnson', role: 'Viewer', status: 'Inactive' },
  ]);

  // Login function
  const login = (username, password) => {
    // Simulate login logic (replace with real API call)
    const user = users.find((u) => u.name === username);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
  };

  // Check if the user has a specific permission
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    const role = roles.find((r) => r.name === currentUser.role);
    return role?.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        roles,
        users,
        login,
        logout,
        hasPermission,
        setUsers,
        setRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
