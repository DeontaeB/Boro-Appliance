-- Boro Appliance Pros Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Customer Info
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,

  -- Address
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,

  -- Appointment Details
  appliance_type VARCHAR(50) NOT NULL,
  issue_description TEXT,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,

  -- Booking Status
  status VARCHAR(20) DEFAULT 'pending_confirmation' CHECK (status IN ('pending_confirmation', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'reschedule_requested')),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  confirmed_by VARCHAR(255), -- Admin/staff name who confirmed

  -- Payment (paid directly to tech, no online payment)
  diagnostic_fee DECIMAL(10, 2) DEFAULT 99.00,
  repair_cost DECIMAL(10, 2),
  total_collected_by_tech DECIMAL(10, 2),
  payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'card', null)),

  -- Assignment
  assigned_tech_id UUID REFERENCES technicians(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  notes TEXT
);

-- Technicians Table
CREATE TABLE technicians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Personal Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Credentials
  license_number VARCHAR(100),
  insurance_verified BOOLEAN DEFAULT false,

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  available BOOLEAN DEFAULT true,

  -- Specialties (JSON array of appliance types)
  specialties JSONB DEFAULT '[]',

  -- Location
  service_area VARCHAR(100),

  -- Performance Metrics
  total_jobs_completed INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0.00,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relations
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES technicians(id),

  -- Review Content
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  customer_name VARCHAR(255),

  -- Status
  approved BOOLEAN DEFAULT false,
  display_on_site BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SMS Notifications Log (for tracking sent messages)
CREATE TABLE sms_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relations
  booking_id UUID REFERENCES bookings(id),
  recipient_phone VARCHAR(20) NOT NULL,

  -- Message Details
  message_type VARCHAR(50) NOT NULL, -- 'booking_confirmation', 'tech_assigned', 'job_completed', etc.
  message_body TEXT NOT NULL,

  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  twilio_sid VARCHAR(255),
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Tech Payouts Table (tracks money owed to and paid to techs)
CREATE TABLE tech_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relations
  technician_id UUID REFERENCES technicians(id) NOT NULL,
  booking_id UUID REFERENCES bookings(id),

  -- Payout Details
  amount_owed DECIMAL(10, 2) NOT NULL DEFAULT 75.00, -- $75 per job
  payout_status VARCHAR(20) DEFAULT 'pending' CHECK (payout_status IN ('pending', 'paid')),
  payout_method VARCHAR(20) CHECK (payout_method IN ('venmo', 'zelle', 'check', null)),
  payout_reference VARCHAR(255), -- Venmo/Zelle transaction ID or check number

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,

  -- Notes
  notes TEXT
);

-- Create indexes for performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_assigned_tech ON bookings(assigned_tech_id);
CREATE INDEX idx_bookings_date ON bookings(preferred_date);
CREATE INDEX idx_technicians_status ON technicians(status);
CREATE INDEX idx_technicians_available ON technicians(available);
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_tech_payouts_status ON tech_payouts(payout_status);
CREATE INDEX idx_tech_payouts_technician ON tech_payouts(technician_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to bookings table
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to technicians table
CREATE TRIGGER update_technicians_updated_at BEFORE UPDATE ON technicians
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample technician data (for testing)
INSERT INTO technicians (name, email, phone, license_number, insurance_verified, specialties, service_area, available)
VALUES
  ('Mike Johnson', 'mike@boroappliancepros.com', '(615) 555-0101', 'TN-12345', true, '["refrigerator", "washer", "dryer"]', 'Murfreesboro', true),
  ('Sarah Williams', 'sarah@boroappliancepros.com', '(615) 555-0102', 'TN-12346', true, '["dishwasher", "oven", "microwave"]', 'Murfreesboro', true),
  ('David Brown', 'david@boroappliancepros.com', '(615) 555-0103', 'TN-12347', true, '["refrigerator", "disposal", "oven"]', 'Smyrna', true);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read access for now, will refine later)
CREATE POLICY "Enable read access for all users" ON bookings FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON bookings FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON technicians FOR SELECT USING (true);

CREATE POLICY "Enable read access for approved reviews" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Enable insert for all users" ON reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON tech_payouts FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON tech_payouts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON tech_payouts FOR UPDATE USING (true);
