// schedulers/activityStatusScheduler.js
const cron = require('node-cron');
const db = require('../models/db');

class ActivityStatusScheduler {
  async updateMissingActivities() {
    try {
      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Update activities that are past their due date and still incomplete
      const query = `
        UPDATE activities 
        SET status = 'missing' 
        WHERE date < ? 
        AND status = 'incomplete'
      `;
      
      const [result] = await db.promise().query(query, [today]);
      console.log(`Updated ${result.affectedRows} activities to missing status`);
    } catch (error) {
      console.error('Error updating missing activities:', error);
    }
  }

  startScheduler() {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily activity status update check');
      await this.updateMissingActivities();
    });

    // Also run immediately when the server starts
    this.updateMissingActivities();
  }
}

module.exports = new ActivityStatusScheduler();