import { supabase } from './supabase';

// Admin phone number - UPDATE THIS WITH YOUR ACTUAL PHONE
const ADMIN_PHONE = process.env.REACT_APP_ADMIN_PHONE || '(615) 555-0100';

/**
 * Send booking request notifications
 * Called immediately after customer books (status: pending_confirmation)
 */
export const sendBookingRequestNotifications = async (booking) => {
  // 1. Send acknowledgment to CUSTOMER
  const customerMessage = `Thanks for booking with Boro Appliance Pros!

We'll call you within 2 hours to confirm your appointment for ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}.

- Boro Appliance Pros
(615) 555-0123`;

  await logNotification({
    booking_id: booking.id,
    recipient_phone: booking.customer_phone,
    message_type: 'booking_request',
    message_body: customerMessage,
  });

  // 2. Alert ADMIN to call customer
  const adminMessage = `🔔 New booking request!

Customer: ${booking.customer_name}
Phone: ${booking.customer_phone}
Date: ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}
Appliance: ${booking.appliance_type}
Address: ${booking.street_address}, ${booking.city}

⏰ CALL CUSTOMER WITHIN 2 HOURS TO CONFIRM`;

  await logNotification({
    booking_id: booking.id,
    recipient_phone: ADMIN_PHONE,
    message_type: 'admin_new_booking',
    message_body: adminMessage,
  });

  console.log('📱 Booking request notifications queued');
  // TODO: Actually send via Twilio here
};

/**
 * Send confirmation notifications
 * Called after admin confirms booking and assigns tech
 */
export const sendConfirmationNotifications = async (booking, technician) => {
  // 1. Confirm with CUSTOMER
  const customerMessage = `Appointment confirmed! ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}.

Your tech will call you 30 min before arrival. $99 diagnostic fee payable to tech (cash or card).

- Boro Appliance Pros`;

  await logNotification({
    booking_id: booking.id,
    recipient_phone: booking.customer_phone,
    message_type: 'booking_confirmed',
    message_body: customerMessage,
  });

  // 2. Assign job to TECH
  const issueText = booking.issue_description
    ? `Issue: ${booking.issue_description}\n`
    : '';

  const techMessage = `New job confirmed!

📅 ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}
📍 ${booking.street_address}, ${booking.city}, ${booking.zip_code}
🔧 ${booking.appliance_type}
${issueText}
Customer: ${booking.customer_name}
📞 ${booking.customer_phone}

Call 30 min before arrival. Collect $99 diagnostic fee.

You'll get paid $75 for this job.`;

  await logNotification({
    booking_id: booking.id,
    recipient_phone: technician.phone,
    message_type: 'tech_job_confirmed',
    message_body: techMessage,
  });

  console.log('📱 Confirmation notifications queued');
  // TODO: Actually send via Twilio here
};

/**
 * Send reschedule request notification to admin
 */
export const sendRescheduleNotification = async (booking) => {
  const adminMessage = `🔄 Customer requested reschedule

Customer: ${booking.customer_name}
Phone: ${booking.customer_phone}
Original: ${new Date(booking.preferred_date).toLocaleDateString()} at ${booking.preferred_time}

Call customer to reschedule.`;

  await logNotification({
    booking_id: booking.id,
    recipient_phone: ADMIN_PHONE,
    message_type: 'reschedule_request',
    message_body: adminMessage,
  });

  console.log('📱 Reschedule notification queued');
  // TODO: Actually send via Twilio here
};

/**
 * Send 24-hour reminder to customers
 * Run this daily at 9 AM via cron job
 */
export const send24HourReminders = async () => {
  try {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Get all confirmed bookings for tomorrow
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'confirmed')
      .eq('preferred_date', tomorrowStr);

    if (error) throw error;

    console.log(`📅 Found ${bookings?.length || 0} appointments for tomorrow`);

    // Send reminder to each customer
    for (const booking of bookings || []) {
      const reminderMessage = `Reminder: Appliance repair tomorrow at ${booking.preferred_time}.

Tech will call 30 min before arrival. $99 diagnostic fee due. Reply CANCEL to reschedule.

- Boro Appliance Pros
(615) 555-0123`;

      await logNotification({
        booking_id: booking.id,
        recipient_phone: booking.customer_phone,
        message_type: 'customer_reminder',
        message_body: reminderMessage,
      });

      console.log(`📱 Reminder queued for ${booking.customer_name}`);
      // TODO: Actually send via Twilio here
    }

    return { success: true, count: bookings?.length || 0 };
  } catch (error) {
    console.error('Error sending reminders:', error);
    return { success: false, error };
  }
};

/**
 * Get bookings scheduled for tomorrow
 * Used to preview what reminders will be sent
 */
export const getUpcomingReminders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('bookings')
    .select('*, technicians:assigned_tech_id(*)')
    .eq('status', 'confirmed')
    .eq('preferred_date', tomorrowStr);

  return { data, error };
};

/**
 * Log notification to database
 */
const logNotification = async (notificationData) => {
  const { data, error } = await supabase
    .from('sms_notifications')
    .insert({
      ...notificationData,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error logging notification:', error);
  }

  return { data, error };
};

/**
 * Mark notification as sent
 */
export const markNotificationSent = async (notificationId, twilioSid) => {
  const { data, error } = await supabase
    .from('sms_notifications')
    .update({
      status: 'sent',
      twilio_sid: twilioSid,
      sent_at: new Date().toISOString(),
    })
    .eq('id', notificationId);

  return { data, error };
};

/**
 * Get all pending notifications
 */
export const getPendingNotifications = async () => {
  const { data, error } = await supabase
    .from('sms_notifications')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  return { data, error };
};
