import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Switch, TextField, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';

// Sample roles for the dropdown
const roles = ['Admin', 'Editor', 'Viewer'];

const UserTable = ({ users, onCreateUser, onEdit, onDelete, onToggleStatus }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: roles[0], // Default to Admin
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle creating a new user
  const handleCreateUser = (e) => {
    e.preventDefault();
    onCreateUser(newUser); // Call parent handler to update users
    setNewUser({
      name: '',
      email: '',
      role: roles[0], // Reset form to default values
    });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                label="Role"
              >
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>

      <h2>User List</h2>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={user.isActive}
                    onChange={() => onToggleStatus(user.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(user)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
