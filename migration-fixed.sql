-- ============================================
-- BORO APPLIANCE PROS - DATABASE MIGRATION (FIXED)
-- ============================================
-- Run this in your Supabase SQL Editor
-- This updates your existing database to support the new booking flow

-- STEP 1: Update bookings table status column
-- ============================================

-- Drop the old constraint
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Add new constraint with updated statuses
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending_confirmation', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'reschedule_requested'));

-- Set default status to pending_confirmation
ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'pending_confirmation';

-- STEP 2: Add new confirmation fields
-- ============================================

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS confirmed_by VARCHAR(255);

-- STEP 3: Update payment columns
-- ============================================

-- Add new payment tracking columns
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS diagnostic_fee DECIMAL(10, 2) DEFAULT 99.00,
  ADD COLUMN IF NOT EXISTS repair_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS total_collected_by_tech DECIMAL(10, 2);

-- Drop old payment_method constraint if exists
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_payment_method_check;

-- Add updated payment_method column
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20);

ALTER TABLE bookings
  ADD CONSTRAINT bookings_payment_method_check
  CHECK (payment_method IN ('cash', 'card', null));

-- STEP 4: Remove old Stripe payment columns (OPTIONAL)
-- ============================================
-- Uncomment these if you want to completely remove Stripe references

-- ALTER TABLE bookings DROP COLUMN IF EXISTS payment_status;
-- ALTER TABLE bookings DROP COLUMN IF EXISTS stripe_payment_id;

-- STEP 5: Create tech_payouts table
-- ============================================

CREATE TABLE IF NOT EXISTS tech_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relations
  technician_id UUID REFERENCES technicians(id) NOT NULL,
  booking_id UUID REFERENCES bookings(id),

  -- Payout Details
  amount_owed DECIMAL(10, 2) NOT NULL DEFAULT 75.00,
  payout_status VARCHAR(20) DEFAULT 'pending' CHECK (payout_status IN ('pending', 'paid')),
  payout_method VARCHAR(20) CHECK (payout_method IN ('venmo', 'zelle', 'check', null)),
  payout_reference VARCHAR(255),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,

  -- Notes
  notes TEXT
);

-- STEP 6: Add indexes for tech_payouts
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tech_payouts_status ON tech_payouts(payout_status);
CREATE INDEX IF NOT EXISTS idx_tech_payouts_technician ON tech_payouts(technician_id);
CREATE INDEX IF NOT EXISTS idx_tech_payouts_created ON tech_payouts(created_at DESC);

-- STEP 7: Enable RLS on tech_payouts
-- ============================================

ALTER TABLE tech_payouts ENABLE ROW LEVEL SECURITY;

-- STEP 8: Add RLS policies (FIXED - no IF NOT EXISTS)
-- ============================================

-- Drop policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Enable read access for all users" ON tech_payouts;
DROP POLICY IF EXISTS "Enable insert for all users" ON tech_payouts;
DROP POLICY IF EXISTS "Enable update for all users" ON tech_payouts;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON tech_payouts FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users"
  ON tech_payouts FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users"
  ON tech_payouts FOR UPDATE USING (true);

-- STEP 9: Verify migration
-- ============================================

-- Check bookings table columns
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'bookings'
  AND column_name IN ('status', 'confirmed_at', 'confirmed_by', 'diagnostic_fee', 'repair_cost', 'total_collected_by_tech', 'payment_method')
ORDER BY column_name;

-- Check tech_payouts table exists
SELECT table_name
FROM information_schema.tables
WHERE table_name = 'tech_payouts';

-- Check indexes
SELECT indexname, tablename
FROM pg_indexes
WHERE tablename IN ('bookings', 'tech_payouts')
ORDER BY tablename, indexname;

-- ============================================
-- MIGRATION COMPLETE! ✅
-- ============================================
-- Next steps:
-- 1. Set up Twilio account
-- 2. Update .env with Twilio credentials
-- 3. Set up cron jobs for reminders
-- 4. Test booking flow
