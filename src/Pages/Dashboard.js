import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'; // Add photo icon

const initialProfile = {
  name: 'mayank',
  email: 'mayank.doe@example.com',
  role: 'Admin',
  profilePicture: '', // Empty initially
  lastLogin: '2024-11-25 10:30 AM',
};

const Dashboard = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevState) => ({
          ...prevState,
          profilePicture: reader.result, // Set the image as base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  // Handle saving the changes (API call can be added here)
  const handleSaveChanges = () => {
    console.log('Profile updated:', profile);
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the RBAC Admin Dashboard. Use the navigation to manage users and roles.</p>

      {/* Admin Profile Section */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            {/* Profile Picture Section */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => document.getElementById('profileImageInput').click()} // Trigger file input
                />
              ) : (
                // Display Add Photo Icon if no image is set
                <AddAPhotoIcon
                  style={{
                    fontSize: '50px',
                    color: '#1976d2',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '15px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={() => document.getElementById('profileImageInput').click()} // Trigger file input
                />
              )}

              {/* Hidden File Input for Uploading Image */}
              <input
                type="file"
                id="profileImageInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>

            {/* Editable form */}
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Role"
                  name="role"
                  value={profile.role}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '15px' }}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1"><strong>Name:</strong> {profile.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                <Typography variant="body1"><strong>Role:</strong> {profile.role}</Typography>
                <Typography variant="body1"><strong>Last Login:</strong> {profile.lastLogin}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '15px' }}
                  onClick={toggleEditing}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Paper>
        </Grid>

        {/* Additional Dashboard Content */}
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Recent Activity</Typography>
            <Typography variant="body2">No recent activity to display.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
