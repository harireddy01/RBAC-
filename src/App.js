import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar'; // Sidebar navigation component
import Dashboard from './Pages/Dashboard'; // Dashboard page
import UsersPage from './Pages/UsersPage'; // Users management page
import RBACProvider from './context/RBACContext'; // Context for managing RBAC data
import RolesPage from './Pages/RolePage'; // Roles management page

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
});

const App = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);

  // Handle adding a new role
  const handleAddRole = (newRole) => {
    setRoles([...roles, newRole]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RBACProvider>
        <Router>
          <div style={{ display: 'flex' }}>
            {/* Sidebar: Always visible for navigation */}
            <Sidebar />

            {/* Main content area */}
            <div style={{ flex: 1, padding: '24px' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UsersPage roles={roles} />} />
                <Route path="/roles" element={<RolesPage roles={roles} onAddRole={handleAddRole} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </RBACProvider>
    </ThemeProvider>
  );
};

export default App;
