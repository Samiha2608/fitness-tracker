import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Grid,
  Paper,
  Tooltip,
} from '@mui/material';
import { Add, Done, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ActivityLog = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ activity: "", date: "" });
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  const api = axios.create({
    baseURL: 'http://localhost:5000/auth',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('No token found');
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  const fetchActivities = async () => {
    try {
      setError(null);
      const response = await api.get("/activities");
      setActivities(response.data);
    } catch (error) {
      setError("Failed to load activities. Please try again.");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewActivity({ activity: "", date: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleAddActivity = async () => {
    try {
      if (!newActivity.activity.trim() || !newActivity.date) {
        setError("Please fill in all fields.");
        return;
      }
      await api.post("/activities", newActivity);
      handleClose();
      fetchActivities();
    } catch (error) {
      setError("Failed to add activity. Please try again.");
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await api.patch(`/activities/${id}/complete`);
      fetchActivities();
    } catch (error) {
      setError("Failed to update activity. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px', color: '#e0e0e0' }}>
      <Typography
        variant="h3"
        align="center"
        style={{ marginBottom: '20px', fontWeight: 'bold', color: '#00bfa5' }}
      >
        Activity Log
      </Typography>

      {error && (
        <Typography align="center" color="error" style={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

<Grid container spacing={3}>
  {activities.map((log) => (
    <Grid item xs={12} sm={6} md={4} key={log.id}>
      <Paper
        elevation={3}
        style={{
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: log.status === 'completed' ? '#108265' : '#1e1e1e',
          color: log.status === 'completed' ? '#ffffff' : '#e0e0e0', // Adjusted text color for contrast
        }}
      >
        <Typography
          variant="h6"
          style={{
            textDecoration: log.status === 'completed' ? 'line-through' : 'none',
          }}
        >
          {log.activity}
        </Typography>
        <Typography variant="body2" style={{ color: '#9e9e9e' }}>
          {new Date(log.date).toLocaleDateString()}
        </Typography>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          {log.status === 'incomplete' && (
            <Tooltip title="Mark as completed">
              <IconButton
                style={{ color: '#00796b' }} // Changed tick icon color for "incomplete"
                onClick={() => markAsCompleted(log.id)}
              >
                <Done />
              </IconButton>
            </Tooltip>
          )}
          {log.status === 'completed' && (
            <Tooltip title="Completed">
              <IconButton disabled>
                <Done style={{ color: '#004d40' }} /> {/* Changed tick icon color for "completed" */}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Paper>
    </Grid>
  ))}
</Grid>


<Tooltip title="Add Activity">
  <IconButton
    onClick={handleOpen}
    style={{
      position: 'fixed',
      bottom: '20px', // Default for larger screens
      right: '20px', // Default for larger screens
      backgroundColor: '#00bfa5',
      color: '#121212',
      width: '56px',
      height: '56px',
      zIndex: 1000, // Ensure it's above other elements
    }}
    sx={{
      '@media (max-width: 600px)': {
        bottom: 'unset', // Remove bottom position
        right: 'unset',  // Remove right position
        top: '10px', // Set top position for mobile
        left: '10px', // Set left position for mobile
      },
    }}
  >
    <Add />
  </IconButton>
</Tooltip>



      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>Add New Activity</DialogTitle>
        <DialogContent style={{ backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            label="Activity"
            type="text"
            fullWidth
            value={newActivity.activity}
            onChange={handleChange}
            InputProps={{ style: { color: '#e0e0e0' } }}
            InputLabelProps={{ style: { color: '#9e9e9e' } }}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true, style: { color: '#9e9e9e' } }}
            inputProps={{ min: today, style: { color: '#e0e0e0' } }}
            value={newActivity.date}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#1e1e1e' }}>
          <Button onClick={handleClose} style={{ color: '#00bfa5' }}>
            Cancel
          </Button>
          <Button onClick={handleAddActivity} style={{ color: '#00bfa5' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActivityLog;