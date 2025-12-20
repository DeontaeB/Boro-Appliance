# Boro Appliance Pros - Setup Guide

## 🎯 What's Been Built

### ✅ Completed Features

**1. Landing Page (Conversion-Optimized)**
- Social proof (ratings, testimonials)
- Urgency triggers (limited slots)
- Trust signals (warranty, licensing)
- Services showcase
- Multi-CTA placements

**2. Booking System**
- 4-step multi-step form with progress indicator
- Appliance selection
- Contact information collection
- Date/time scheduling
- Payment integration (Stripe ready)
- Database integration (Supabase ready)

**3. Confirmation Page**
- Booking details display
- Next steps explanation
- Print functionality

**4. Backend Infrastructure**
- Supabase client setup
- Database schema (SQL)
- API service layer
- Mock mode for development

**5. Payment System**
- Stripe checkout integration
- Mock payment for development
- Payment status tracking

---

## 🚀 Quick Start (Development Mode)

### Step 1: Install Dependencies

```bash
cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros

npm install
```

### Step 2: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

**Note:** The app works in MOCK MODE without Supabase/Stripe credentials. Bookings are stored in memory and payment is simulated.

---

## 🔧 Production Setup

### 1. Set Up Supabase (Database)

**A. Create Supabase Project**
1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Choose a name: "boro-appliance-pros"
5. Set a database password (SAVE THIS!)
6. Choose region: US East (closest to TN)
7. Wait for project to initialize (~2 minutes)

**B. Run Database Schema**
1. In Supabase dashboard, go to "SQL Editor"
2. Open the file: `supabase-schema.sql`
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click "Run" to create all tables

**C. Get API Credentials**
1. Go to Project Settings → API
2. Copy the `Project URL`
3. Copy the `anon/public` key

### 2. Set Up Stripe (Payments)

**A. Create Stripe Account**
1. Go to https://stripe.com
2. Sign up for account
3. Complete verification (for live payments)

**B. Get API Keys**
1. Go to Developers → API Keys
2. Copy "Publishable key" (starts with `pk_test_...`)
3. Save the "Secret key" for backend (starts with `sk_test_...`)

**Note:** Use test keys for development, live keys for production

### 3. Configure Environment Variables

**A. Create `.env` file**

```bash
cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros

# Copy the example file
cp .env.example .env
```

**B. Edit `.env` file** (use any text editor)

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
```

**C. Restart the dev server**

```bash
npm start
```

---

## 📊 Database Tables

The schema creates these tables:

- **bookings** - Customer appointments
- **technicians** - Tech profiles
- **reviews** - Customer feedback
- **sms_notifications** - SMS tracking

Sample technicians are pre-loaded for testing.

---

## 🧪 Testing the Booking Flow

1. Go to `http://localhost:3000`
2. Click "Book Now"
3. Select an appliance
4. Fill in contact info
5. Choose date/time
6. Click "Pay $99"

**With Supabase configured:**
- Booking is saved to database
- You'll see it in Supabase dashboard → Table Editor → bookings

**Without Supabase (Mock Mode):**
- Booking is logged to browser console
- Check DevTools → Console to see booking data

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#2563eb',  // Change to your brand color
    dark: '#1e40af',
  },
}
```

### Update Business Info

Edit `src/pages/LandingPage.js`:
- Phone number: Search for "(615) 555-0123"
- Email: Search for "info@boroappliancepros.com"
- Service area: Search for "Murfreesboro"

---

## 📦 Deployment (When Ready)

### Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/deontaebeasley/Desktop/Boro/claude-terminal/boro-appliance-pros
vercel

# Follow prompts:
# - Link to Vercel account
# - Set project name
# - Add environment variables from .env
```

### Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable from your `.env` file
3. Redeploy

---

## 🔍 Troubleshooting

### "This site can't be reached"

```bash
# Check if server is running
# You should see "Compiled successfully!" in terminal

# Try a different port
PORT=3001 npm start
```

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm start
```

### Tailwind styles not working

```bash
# Verify these files exist:
# - tailwind.config.js
# - postcss.config.js
# - src/index.css (with @tailwind directives)

# Restart server
npm start
```

---

## 📞 Next Steps

**Phase 3: Tech Dashboard** (Coming Next)
- Techs can view assigned jobs
- Accept/decline appointments
- Update job status

**Phase 4: Admin Panel**
- View all bookings
- Manually assign technicians
- Track revenue

**Phase 5: SMS Automation**
- Auto-notify techs when assigned
- Send customer confirmations
- Job completion alerts

---

## 💡 Development Tips

**View Database Records:**
- Supabase Dashboard → Table Editor → bookings

**Test Payments (Stripe Test Mode):**
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits

**Check Logs:**
- Browser Console (F12) for frontend
- Terminal for backend logs

---

## 📁 Project Structure

```
boro-appliance-pros/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   └── StripeCheckout.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── BookingPage.js
│   │   └── ConfirmationPage.js
│   ├── services/
│   │   ├── supabase.js
│   │   └── bookingService.js
│   ├── App.js
│   └── index.css
├── .env (create this - not in git)
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── supabase-schema.sql
└── package.json
```

---

## ✅ Success Checklist

- [ ] npm install completed
- [ ] npm start works (localhost:3000 loads)
- [ ] Landing page displays correctly
- [ ] Booking form works (all 4 steps)
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] .env file configured
- [ ] Test booking saves to database
- [ ] Confirmation page shows after booking

---

**Questions? Issues? Check the console logs first, then review this guide.**
