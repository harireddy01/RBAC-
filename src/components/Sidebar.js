import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const Sidebar = () => {
  // Sidebar navigation links
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Roles', icon: <SecurityIcon />, path: '/roles' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={NavLink}
              to={item.path}
              activeClassName="active-link"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&.active-link': { backgroundColor: '#e0e0e0' },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
