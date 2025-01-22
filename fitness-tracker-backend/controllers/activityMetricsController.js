// controllers/activityMetricsController.js
const db = require('../models/db');

exports.getUserMetrics = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get overall statistics
    const statsQuery = `
      SELECT 
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_activities,
        COUNT(CASE WHEN status = 'missing' THEN 1 END) as missed_activities,
        COUNT(CASE WHEN status = 'incomplete' THEN 1 END) as pending_activities,
        COUNT(*) as total_activities,
        ROUND((COUNT(CASE WHEN status = 'completed' THEN 1 END) / COUNT(*) * 100), 1) as completion_rate
      FROM activities 
      WHERE user_id = ?
    `;

    // Get daily activity counts for the last 7 days
    const weeklyQuery = `
      SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as day,
        COUNT(*) as total_activities,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_activities
      FROM activities 
      WHERE user_id = ? 
        AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE_FORMAT(date, '%Y-%m-%d')
      ORDER BY date DESC
    `;

    // Get activity type distribution
    const activityTypesQuery = `
      SELECT 
        activity,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count
      FROM activities 
      WHERE user_id = ?
      GROUP BY activity
      ORDER BY count DESC
      LIMIT 5
    `;

    const [[stats], weeklyStats, activityTypes] = await Promise.all([
      db.promise().query(statsQuery, [userId]),
      db.promise().query(weeklyQuery, [userId]),
      db.promise().query(activityTypesQuery, [userId])
    ]);

    res.json({
      overall_stats: stats[0],
      weekly_stats: weeklyStats[0],
      activity_types: activityTypes[0]
    });
  } catch (error) {
    console.error('Error fetching user metrics:', error);
    res.status(500).json({ 
      message: 'Error fetching user metrics', 
      error: error.message 
    });
  }
};