const express = require('express');
const activityMetrics = require('../controllers/activityMetricsController');
const {
  registerUser,
  loginUser,
  verifyToken,
  getProfile,
  updateProfile,
  addActivity,
  markAsCompleted,
  getActivities,
} = require('../controllers/authController');

const router = express.Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

// Activity routes
router.post('/activities', verifyToken, addActivity);
router.patch('/activities/:id/complete', verifyToken, markAsCompleted);
router.get('/activities', verifyToken, getActivities);
router.get('/metrics', verifyToken, activityMetrics.getUserMetrics);

module.exports = router;