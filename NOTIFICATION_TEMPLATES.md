# SMS Notification Templates

This document contains the SMS notification templates for the Boro Appliance Pros booking system.

## Customer Notifications

### 1. Booking Request Received (Sent immediately after booking)

**⚠️ CRITICAL: Customer books with status 'pending_confirmation'**

```
Thanks for booking with Boro Appliance Pros!

We'll call you within 2 hours to confirm your appointment for {date} at {time}.

- Boro Appliance Pros
(615) 555-0123
```

**Variables:**
- `{date}` - Preferred appointment date
- `{time}` - Preferred time slot

---

### 2. Appointment Confirmed (Sent after admin confirms via phone)

```
Appointment confirmed! {date} at {time}.

Your tech will call you 30 min before arrival. $99 diagnostic fee payable to tech (cash or card).

- Boro Appliance Pros
```

**Variables:**
- `{date}` - Preferred appointment date
- `{time}` - Preferred time slot

---

### 3. 24-Hour Reminder (Sent day before appointment)

```
Reminder: Appliance repair tomorrow at {time}.

Tech will call 30 min before arrival. $99 diagnostic fee due. Reply CANCEL to reschedule.

- Boro Appliance Pros
(615) 555-0123
```

**Variables:**
- `{time}` - Appointment time slot

---

## Admin Notifications

### 4. New Booking Request (Sent to YOU immediately after customer books)

**⚠️ CRITICAL: YOU get notified FIRST, not the tech**

```
🔔 New booking request!

Customer: {customer_name}
Phone: {customer_phone}
Date: {date} at {time}
Appliance: {appliance_type}
Address: {address}, {city}

⏰ CALL CUSTOMER WITHIN 2 HOURS TO CONFIRM

View details: [admin link]
```

**Variables:**
- `{customer_name}` - Customer's full name
- `{customer_phone}` - Customer's phone number
- `{date}` - Preferred appointment date
- `{time}` - Preferred time slot
- `{appliance_type}` - Type of appliance
- `{address}` - Street address
- `{city}` - City

---

### 5. Reschedule Request (Sent to YOU when customer requests reschedule)

```
🔄 Customer requested reschedule

Customer: {customer_name}
Phone: {customer_phone}
Original: {date} at {time}

Call customer to reschedule.
```

---

## Technician Notifications

### 6. Job Confirmed (Sent ONLY after admin confirms booking)

**⚠️ Tech only gets notified AFTER you confirm with customer**

```
New job confirmed!

📅 {date} at {time}
📍 {address}, {city}, {zip}
🔧 {appliance_type}
{issue_description}

Customer: {customer_name}
📞 {customer_phone}

Call 30 min before arrival. Collect $99 diagnostic fee.

You'll get paid $75 for this job.
```

**Variables:**
- `{date}` - Preferred appointment date
- `{time}` - Preferred time slot
- `{address}` - Street address
- `{city}` - City
- `{zip}` - ZIP code
- `{appliance_type}` - Type of appliance (capitalized)
- `{issue_description}` - Customer's description of the issue (optional)
- `{customer_name}` - Customer's full name
- `{customer_phone}` - Customer's phone number

---

### 7. Weekly Payout Reminder (Sent Friday if tech hasn't paid)

```
💰 Weekly payout due - {tech_name}

Jobs completed: {jobs_count}
Amount owed to you: ${amount_owed}

Pay to: [Your Venmo/Zelle]

Deadline: This Friday

View details: [payout link]
```

---

## Implementation Notes

### Using the `sms_notifications` Table

When sending SMS notifications, log them in the database:

```javascript
// Example: Create notification record
await supabase
  .from('sms_notifications')
  .insert([
    {
      booking_id: booking.id,
      recipient_phone: customer_phone,
      message_type: 'booking_confirmation',
      message_body: message,
      status: 'pending'
    }
  ]);

// After sending via Twilio:
await supabase
  .from('sms_notifications')
  .update({
    status: 'sent',
    twilio_sid: messageSid,
    sent_at: new Date().toISOString()
  })
  .eq('id', notificationId);
```

### Message Types

- `booking_request` - Customer receives booking request acknowledgment
- `booking_confirmed` - Customer receives confirmation after admin verifies
- `admin_new_booking` - Admin receives notification of new booking request
- `tech_job_confirmed` - Tech notified of confirmed job
- `customer_reminder` - 24-hour reminder to customer
- `reschedule_request` - Admin notified of reschedule request
- `tech_payout_reminder` - Weekly payout reminder to tech

### Twilio Integration

Required environment variables:
```
REACT_APP_TWILIO_ACCOUNT_SID=your-account-sid
REACT_APP_TWILIO_AUTH_TOKEN=your-auth-token
REACT_APP_TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

### When to Send Notifications

**⚠️ CRITICAL FLOW - DO NOT SKIP CONFIRMATION STEP**

1. **Booking Request Received (Customer)**
   - Trigger: Immediately after `createBooking()` succeeds
   - Recipient: Customer's phone number
   - Type: `booking_request`
   - Status: `pending_confirmation`

2. **New Booking Alert (Admin/YOU)**
   - Trigger: Immediately after `createBooking()` succeeds
   - Recipient: YOUR phone number (admin)
   - Type: `admin_new_booking`
   - Action Required: Call customer within 2 hours

3. **Booking Confirmed (Customer)**
   - Trigger: After admin calls and confirms via `confirmBooking()`
   - Recipient: Customer's phone number
   - Type: `booking_confirmed`
   - Status: `confirmed`

4. **Job Assigned (Tech)**
   - Trigger: After `confirmBooking()` assigns tech
   - Recipient: Assigned technician's phone number
   - Type: `tech_job_confirmed`
   - Status: `confirmed`

5. **24-Hour Reminder (Customer)**
   - Trigger: Automated daily job at 9 AM
   - Recipient: Customers with confirmed appointments tomorrow
   - Type: `customer_reminder`

6. **Reschedule Request (Admin/YOU)**
   - Trigger: When customer clicks reschedule button
   - Recipient: YOUR phone number (admin)
   - Type: `reschedule_request`
   - Status: `reschedule_requested`

7. **Weekly Payout Reminder (Tech)**
   - Trigger: Automated Friday job if payout status is 'pending'
   - Recipient: Tech's phone number
   - Type: `tech_payout_reminder`

### Sample Implementation

```javascript
import { supabase } from './supabase';

export const sendBookingConfirmation = async (booking) => {
  const message = `Booking confirmed! Your appointment is scheduled for ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}.

Tech will call you 30 min before arrival. $99 diagnostic fee payable to tech (cash or card).

- Boro Appliance Pros`;

  // Log notification
  const { data: notification } = await supabase
    .from('sms_notifications')
    .insert({
      booking_id: booking.id,
      recipient_phone: booking.customer_phone,
      message_type: 'booking_confirmation',
      message_body: message,
      status: 'pending'
    })
    .select()
    .single();

  // TODO: Send via Twilio
  // const twilioResponse = await twilioClient.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: booking.customer_phone
  // });

  // Update notification status
  // await supabase
  //   .from('sms_notifications')
  //   .update({
  //     status: 'sent',
  //     twilio_sid: twilioResponse.sid,
  //     sent_at: new Date().toISOString()
  //   })
  //   .eq('id', notification.id);

  return notification;
};

export const sendTechAssignment = async (booking, technician) => {
  const issueDescription = booking.issue_description
    ? `Issue: ${booking.issue_description}\n`
    : '';

  const message = `New job assigned!

Date: ${new Date(booking.preferred_date).toLocaleDateString()}
Time: ${booking.preferred_time}
Address: ${booking.street_address}, ${booking.city}, ${booking.zip_code}
Appliance: ${booking.appliance_type}
${issueDescription}
Customer: ${booking.customer_name}
Phone: ${booking.customer_phone}

Remember to call 30 min before arrival. Collect $99 diagnostic fee.`;

  // Log notification
  const { data: notification } = await supabase
    .from('sms_notifications')
    .insert({
      booking_id: booking.id,
      recipient_phone: technician.phone,
      message_type: 'tech_assigned',
      message_body: message,
      status: 'pending'
    })
    .select()
    .single();

  // TODO: Send via Twilio (same as above)

  return notification;
};
```

## Tech Payout Tracking

After a job is completed, create a payout record:

```javascript
export const createTechPayout = async (bookingId, technicianId) => {
  const { data, error } = await supabase
    .from('tech_payouts')
    .insert({
      booking_id: bookingId,
      technician_id: technicianId,
      amount_owed: 75.00,
      payout_status: 'pending'
    })
    .select()
    .single();

  return { data, error };
};

export const markPayoutPaid = async (payoutId, method, reference) => {
  const { data, error } = await supabase
    .from('tech_payouts')
    .update({
      payout_status: 'paid',
      payout_method: method, // 'venmo', 'zelle', or 'check'
      payout_reference: reference, // transaction ID or check number
      paid_at: new Date().toISOString()
    })
    .eq('id', payoutId)
    .select()
    .single();

  return { data, error };
};
```
