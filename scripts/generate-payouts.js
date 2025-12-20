#!/usr/bin/env node

/**
 * Weekly Payout Report Script
 *
 * USAGE:
 * Run this script every Monday at 9 AM to generate payout reports
 *
 * SETUP:
 * 1. Make executable: chmod +x scripts/generate-payouts.js
 * 2. Add to crontab: crontab -e
 * 3. Add line: 0 9 * * 1 cd /path/to/project && node scripts/generate-payouts.js
 *
 * OR use a service like cron-job.org to call an API endpoint
 */

require('dotenv').config();

const { generateWeeklyPayoutReports } = require('../src/services/payoutService');

async function main() {
  console.log('💰 Starting weekly payout report job...');
  console.log(`Time: ${new Date().toISOString()}`);

  try {
    const result = await generateWeeklyPayoutReports();

    if (result.data && result.data.reports) {
      console.log(`✅ Generated ${result.data.reports.length} payout reports`);

      // Log summary for each tech
      result.data.reports.forEach(({ technician, report }) => {
        console.log(`\n📊 ${technician.name}:`);
        console.log(`   Jobs: ${report.jobs_count}`);
        console.log(`   Total Due: $${report.total_due.toFixed(2)}`);
      });

      process.exit(0);
    } else {
      console.log('ℹ️ No payout reports generated (no completed jobs)');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error generating payout reports:', error);
    process.exit(1);
  }
}

main();
