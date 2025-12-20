#!/usr/bin/env node

/**
 * Daily Reminder Script
 *
 * USAGE:
 * Run this script daily at 9 AM to send 24-hour reminders
 *
 * SETUP:
 * 1. Make executable: chmod +x scripts/send-reminders.js
 * 2. Add to crontab: crontab -e
 * 3. Add line: 0 9 * * * cd /path/to/project && node scripts/send-reminders.js
 *
 * OR use a service like cron-job.org to call an API endpoint
 */

require('dotenv').config();

// Import the reminder function
const { send24HourReminders } = require('../src/services/notificationService');

async function main() {
  console.log('🔔 Starting daily reminder job...');
  console.log(`Time: ${new Date().toISOString()}`);

  try {
    const result = await send24HourReminders();

    if (result.success) {
      console.log(`✅ Success! Sent ${result.count} reminders`);
      process.exit(0);
    } else {
      console.error('❌ Failed to send reminders:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error running reminder job:', error);
    process.exit(1);
  }
}

main();
