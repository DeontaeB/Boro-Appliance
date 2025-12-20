# 🚀 SETUP CHECKLIST - Boro Appliance Pros

Follow these steps IN ORDER to get your booking system live.

---

## ✅ STEP 1: Get Twilio Account (15 minutes) 🔴 CRITICAL

**Without this, NO SMS notifications will work!**

### What to do:

1. **Sign up**: https://www.twilio.com/try-twilio
   - Free trial gives you $15 credit
   - More than enough to test

2. **Get a phone number**:
   - Click "Get a Phone Number"
   - Choose a local number (Nashville area code 615 recommended)
   - Cost: $1/month after trial

3. **Copy your credentials**:
   - Dashboard → Account → Account Info
   - Copy:
     - **Account SID** (starts with "AC...")
     - **Auth Token** (click to reveal)
     - **Phone Number** (the one you just got)

4. **Update your `.env` file**:
   ```bash
   cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros
   cp .env.example .env
   ```

   Edit `.env` and add:
   ```env
   # Your Supabase credentials (already have these)
   REACT_APP_SUPABASE_URL=your-url-here
   REACT_APP_SUPABASE_ANON_KEY=your-key-here

   # Twilio credentials (add these NOW)
   REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
   REACT_APP_TWILIO_AUTH_TOKEN=your-auth-token
   REACT_APP_TWILIO_PHONE_NUMBER=+16155551234

   # Your personal phone (where you'll get booking alerts)
   REACT_APP_ADMIN_PHONE=+16155559999
   ```

5. **Test Twilio setup**:
   ```bash
   npm install twilio
   node -e "require('./src/services/twilioService').testTwilioSetup()"
   ```

   ✅ You should receive a test SMS on your admin phone!

---

## ✅ STEP 2: Run Database Migration (5 minutes) 🔴 CRITICAL

### What to do:

1. **Open Supabase Dashboard**:
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**:
   - Left sidebar → SQL Editor
   - Click "New query"

3. **Copy & paste migration**:
   - Open `migration.sql` file in your project
   - Copy ALL the contents
   - Paste into Supabase SQL Editor
   - Click "Run" (bottom right)

4. **Verify it worked**:
   - You should see output showing:
     - ✅ Bookings table updated
     - ✅ tech_payouts table created
     - ✅ Indexes created

5. **Check the tables**:
   - Left sidebar → Table Editor
   - You should see:
     - `bookings` table with new columns
     - `tech_payouts` table (new)
     - `sms_notifications` table

---

## ✅ STEP 3: Add Admin Route (2 minutes) 🟡 IMPORTANT

### What to do:

1. **Open `src/App.js`**:

2. **Add import** at top:
   ```javascript
   import AdminConfirmationPage from './pages/AdminConfirmationPage';
   ```

3. **Add route** with your other routes:
   ```javascript
   <Route path="/admin/confirmations" element={<AdminConfirmationPage />} />
   ```

4. **Test it**:
   ```bash
   npm start
   ```
   - Go to: http://localhost:3000/admin/confirmations
   - You should see the admin confirmation page

---

## ✅ STEP 4: Set Up Automated Reminders (10 minutes) 🟡 IMPORTANT

You have 2 options:

### **Option A: Use Cron-job.org (Easiest - Recommended)**

1. **Create API endpoints** for the cron jobs to call:

   Add to `src/App.js` or create API routes:
   ```javascript
   // In your backend/API
   app.get('/api/cron/send-reminders', async (req, res) => {
     const result = await send24HourReminders();
     res.json(result);
   });

   app.get('/api/cron/generate-payouts', async (req, res) => {
     const result = await generateWeeklyPayoutReports();
     res.json(result);
   });
   ```

2. **Set up cron-job.org**:
   - Go to https://cron-job.org/en/
   - Create free account
   - Add job #1:
     - Title: "Daily Reminders"
     - URL: `https://your-domain.com/api/cron/send-reminders`
     - Schedule: Every day at 9:00 AM (0 9 * * *)
   - Add job #2:
     - Title: "Weekly Payouts"
     - URL: `https://your-domain.com/api/cron/generate-payouts`
     - Schedule: Every Monday at 9:00 AM (0 9 * * 1)

### **Option B: Use Local Cron (Mac/Linux)**

1. **Make scripts executable**:
   ```bash
   chmod +x scripts/send-reminders.js
   chmod +x scripts/generate-payouts.js
   ```

2. **Add to crontab**:
   ```bash
   crontab -e
   ```

3. **Add these lines**:
   ```bash
   # Daily reminders at 9 AM
   0 9 * * * cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros && node scripts/send-reminders.js >> /tmp/reminders.log 2>&1

   # Weekly payouts every Monday at 9 AM
   0 9 * * 1 cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros && node scripts/generate-payouts.js >> /tmp/payouts.log 2>&1
   ```

---

## ✅ STEP 5: Test Everything (30 minutes) 🧪

### **Test 1: Full Booking Flow**

1. **Book an appointment**:
   - Go to your website
   - Click "Book Now"
   - Fill out form with YOUR phone number
   - Submit

2. **Check SMS notifications**:
   - ✅ Did YOU get SMS "Call customer within 2 hours"?
   - ✅ Did customer (your phone) get "We'll call you to confirm"?

3. **Confirm the booking**:
   - Go to `/admin/confirmations`
   - You should see your test booking
   - Select a technician
   - Click "Confirm & Notify Tech"

4. **Check tech notification**:
   - ✅ Did tech get SMS with job details?

5. **Check confirmation SMS**:
   - ✅ Did customer get "Appointment confirmed" SMS?

**If all 5 checkmarks pass → Booking flow works!** ✅

---

### **Test 2: 24-Hour Reminder**

1. **Create a test booking for tomorrow**:
   - Book appointment for tomorrow
   - Confirm it via admin panel

2. **Manually trigger reminder**:
   ```bash
   node scripts/send-reminders.js
   ```

3. **Check SMS**:
   - ✅ Did you get reminder SMS?

---

### **Test 3: Tech Payout Tracking**

1. **Complete some test bookings**:
   - Create 3 bookings
   - Confirm them
   - Mark them as `completed` in Supabase

2. **Generate payout report**:
   ```bash
   node scripts/generate-payouts.js
   ```

3. **Check tech_payouts table**:
   - Go to Supabase → Table Editor → tech_payouts
   - ✅ Should show 3 records with $75 each = $225 total

---

## ✅ STEP 6: Go Live! 🚀

Once all tests pass:

1. **Update your website** with production URL
2. **Share booking link** with customers
3. **Monitor** `/admin/confirmations` daily
4. **Call customers** within 2 hours of booking
5. **Confirm bookings** and assign techs
6. **Pay techs** weekly (Fridays)

---

## 📞 Daily Workflow

### **Every Morning (9 AM)**:
- Check `/admin/confirmations` for new bookings
- Call any pending customers
- Confirm bookings and assign techs
- Automated reminders send at 9 AM (no action needed)

### **Every Friday**:
- Review tech payout reports
- Send payment to techs via Venmo/Zelle
- Mark payouts as "paid" in system

### **As Needed**:
- Handle reschedule requests
- Reassign techs if needed
- Update booking status in Supabase

---

## 🆘 Troubleshooting

### **SMS not sending?**
1. Check Twilio account has credits
2. Verify phone numbers in E.164 format (+16155551234)
3. Check `.env` file has correct credentials
4. Test: `node -e "require('./src/services/twilioService').testTwilioSetup()"`

### **Bookings stuck in pending?**
1. Go to `/admin/confirmations`
2. Manually confirm the booking
3. Or update status in Supabase directly

### **Reminders not working?**
1. Check cron job is running
2. Verify date format in database
3. Test manually: `node scripts/send-reminders.js`

### **Tech not getting notifications?**
1. Ensure booking status is `confirmed` (not pending)
2. Check tech phone number in database
3. Verify Twilio is working

---

## 🎯 Success Metrics to Track

After 1 week:
- **Booking confirmation rate**: Should be 90%+
- **No-show rate**: Should drop to 5-10%
- **Tech satisfaction**: Fewer wasted trips
- **Payment tracking**: Clear records of who owes what

After 1 month:
- **Total bookings**: Track growth
- **Revenue**: Track diagnostic fees + repairs
- **Tech payouts**: Ensure everyone is paid on time

---

## 🎉 You're All Set!

Your booking system now has:
- ✅ Phone confirmation to prevent no-shows
- ✅ Automated 24-hour reminders
- ✅ Tech payout tracking
- ✅ Customer reschedule option
- ✅ Complete SMS notification system

**Questions?** Check the other documentation files:
- `IMPLEMENTATION_GUIDE.md` - Detailed technical guide
- `NOTIFICATION_TEMPLATES.md` - All SMS message templates
- `README.md` - General project info
