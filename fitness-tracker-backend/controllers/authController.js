const db = require('../models/db');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Register function
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await db.promise().query(query, [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login function
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.promise().query(query, [username]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token using environment variable
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, created_at: user.created_at },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            message: 'Token expired',
            code: 'TOKEN_EXPIRED'
          });
        }
        return res.status(401).json({ 
          message: 'Invalid token',
          code: 'INVALID_TOKEN'
        });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Get profile of logged-in user
exports.getProfile = async (req, res) => {
  try {
    console.log('Fetching profile for user ID:', req.user.id);

    const query = 'SELECT id, username, created_at FROM users WHERE id = ?';
    const [rows] = await db.promise().query(query, [req.user.id]);

    if (rows.length === 0) {
      console.log('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile retrieved successfully:', rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};


// Update Profile function
exports.updateProfile = async (req, res) => {
  const { username } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access: No token provided' });
  }

  try {
    // Decode token to get user ID
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    console.log('Updating profile for user ID:', userId);

    // Validate input
    if (!username) {
      console.log('Username validation failed: Missing username');
      return res.status(400).json({ message: 'Username is required' });
    }

    // Update user in the database
    const query = 'UPDATE users SET username = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [username, userId]);
    console.log('Update query result:', result);

    // Retrieve updated user data
    const [updatedUser] = await db.promise().query('SELECT id, username, created_at FROM users WHERE id = ?', [userId]);

    console.log('Updated user profile:', updatedUser[0]);
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser[0],
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};



// Add activity with proper error handling
// controllers/authController.js

// Add this to your existing controller file, updating the addActivity function:
exports.addActivity = async (req, res) => {
  const { activity, date } = req.body;
  
  try {
    const userId = req.user.id;

    if (!activity || !date) {
      return res.status(400).json({ message: 'Activity and date are required' });
    }

    // Validate date format and check if it's not in the past
    const activityDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(activityDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Prevent past dates
    if (activityDate < today) {
      return res.status(400).json({ message: 'Cannot select past dates' });
    }

    const query = 'INSERT INTO activities (user_id, activity, date, status) VALUES (?, ?, ?, "incomplete")';
    const [result] = await db.promise().query(query, [userId, activity, date]);
    
    if (result.affectedRows === 1) {
      res.status(201).json({ 
        message: 'Activity added successfully',
        activityId: result.insertId
      });
    } else {
      throw new Error('Failed to insert activity');
    }
  } catch (error) {
    console.error('Error adding activity:', error);
    res.status(500).json({ 
      message: 'Error adding activity', 
      error: error.message 
    });
  }
};

// Update the getActivities function for better sorting:
exports.getActivities = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT 
        id,
        activity,
        date,
        status,
        user_id
      FROM activities 
      WHERE user_id = ? 
      ORDER BY 
        date ASC,
        CASE status
          WHEN 'incomplete' THEN 1
          WHEN 'missing' THEN 2
          WHEN 'completed' THEN 3
        END
    `;

    const [activities] = await db.promise().query(query, [userId]);
    
    // Format dates for frontend
    const formattedActivities = activities.map(activity => ({
      ...activity,
      date: activity.date.toISOString().split('T')[0]
    }));

    res.status(200).json(formattedActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ 
      message: 'Error fetching activities', 
      error: error.message 
    });
  }
};
// Mark activity as completed with proper validation
exports.markAsCompleted = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // First verify the activity exists and belongs to the user
    const [activities] = await db.promise().query(
      'SELECT * FROM activities WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (activities.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const activity = activities[0];
    if (activity.status === 'completed') {
      return res.status(400).json({ message: 'Activity is already completed' });
    }

    const query = 'UPDATE activities SET status = "completed" WHERE id = ? AND user_id = ?';
    const [result] = await db.promise().query(query, [id, userId]);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Activity marked as completed' });
    } else {
      throw new Error('Failed to update activity status');
    }
  } catch (error) {
    console.error('Error marking activity as completed:', error);
    res.status(500).json({ 
      message: 'Error marking activity as completed', 
      error: error.message 
    });
  }
};

