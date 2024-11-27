import React, { useState } from 'react';
import UserTable from '../components/UserTable'; // Adjust path based on actual file location

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'mayank', email: 'mayank@gmail.com', role: 'Admin', isActive: true },
    { id: 2, name: 'ironman', email: 'ironman@example.com', role: 'Editor', isActive: false },
    // Add more users here as needed
  ]);

  const [selectedUser, setSelectedUser] = useState(null); // Track the user being edited
  const [isEditing, setIsEditing] = useState(false); // Flag to toggle between view and edit modes
  const [editedUser, setEditedUser] = useState({ name: '', email: '', role: '' }); // Store edited user data

  // Handler to create a new user
  const handleCreateUser = (newUser) => {
    const newId = users.length + 1; // Simple ID generation logic, can be improved
    const newUserWithId = { ...newUser, id: newId, isActive: true }; // New user is active by default
    setUsers([...users, newUserWithId]); // Add new user to the state
  };

  // Handler to delete a user
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Handler to toggle a user's active status
  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  // Handler to edit a user
  const handleEdit = (user) => {
    setIsEditing(true); // Switch to editing mode
    setSelectedUser(user); // Set the user to be edited
    setEditedUser({ name: user.name, email: user.email, role: user.role }); // Pre-fill the edit form with current user data
  };

  // Handler to save the edited user
  const handleSaveEdit = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...editedUser } : user
    ));
    setIsEditing(false); // Switch back to view mode
    setSelectedUser(null); // Reset the selected user
  };

  // Handle input change for edited user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>User Management</h1>
      
      {/* Display the edit form if editing is true */}
      {isEditing ? (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <select
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <UserTable
          users={users}
          onCreateUser={handleCreateUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
};


export default UsersPage;
