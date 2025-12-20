import { supabase, isMockMode } from './supabase';

// Mock data for development
const mockPayouts = [];

/**
 * Create tech payout record when job is completed
 * @param {string} bookingId
 * @param {string} technicianId
 * @returns {Promise<Object>}
 */
export const createTechPayout = async (bookingId, technicianId) => {
  if (isMockMode) {
    const mockPayout = {
      id: `payout-${Date.now()}`,
      booking_id: bookingId,
      technician_id: technicianId,
      amount_owed: 75.0,
      payout_status: 'pending',
      created_at: new Date().toISOString(),
    };
    mockPayouts.push(mockPayout);
    return { data: mockPayout, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('tech_payouts')
      .insert({
        booking_id: bookingId,
        technician_id: technicianId,
        amount_owed: 75.0,
        payout_status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating tech payout:', error);
    return { data: null, error };
  }
};

/**
 * Mark payout as paid
 * @param {string} payoutId
 * @param {string} method - 'venmo', 'zelle', or 'check'
 * @param {string} reference - Transaction ID or check number
 * @returns {Promise<Object>}
 */
export const markPayoutPaid = async (payoutId, method, reference) => {
  if (isMockMode) {
    const payout = mockPayouts.find((p) => p.id === payoutId);
    if (payout) {
      payout.payout_status = 'paid';
      payout.payout_method = method;
      payout.payout_reference = reference;
      payout.paid_at = new Date().toISOString();
    }
    return { data: payout, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('tech_payouts')
      .update({
        payout_status: 'paid',
        payout_method: method,
        payout_reference: reference,
        paid_at: new Date().toISOString(),
      })
      .eq('id', payoutId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error marking payout paid:', error);
    return { data: null, error };
  }
};

/**
 * Get weekly payout report for a technician
 * @param {string} technicianId
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<Object>}
 */
export const getTechWeeklyReport = async (technicianId, startDate, endDate) => {
  if (isMockMode) {
    return {
      data: {
        jobs: [],
        total_owed: 0,
        jobs_count: 0,
      },
      error: null,
    };
  }

  try {
    // Get completed jobs for the period
    const { data: jobs, error: jobsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('assigned_tech_id', technicianId)
      .eq('status', 'completed')
      .gte('completed_at', startDate.toISOString())
      .lte('completed_at', endDate.toISOString())
      .order('completed_at', { ascending: false });

    if (jobsError) throw jobsError;

    // Get pending payouts for this tech
    const { data: payouts, error: payoutsError } = await supabase
      .from('tech_payouts')
      .select('*')
      .eq('technician_id', technicianId)
      .eq('payout_status', 'pending');

    if (payoutsError) throw payoutsError;

    const totalOwed = (jobs?.length || 0) * 75;
    const previousBalance = payouts?.reduce(
      (sum, p) => sum + parseFloat(p.amount_owed),
      0
    ) || 0;

    return {
      data: {
        jobs: jobs || [],
        payouts: payouts || [],
        jobs_count: jobs?.length || 0,
        total_owed: totalOwed,
        previous_balance: previousBalance,
        total_due: totalOwed + previousBalance,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error getting tech weekly report:', error);
    return { data: null, error };
  }
};

/**
 * Get all technicians with pending payouts
 * Used for admin dashboard
 */
export const getTechsWithPendingPayouts = async () => {
  if (isMockMode) {
    return { data: [], error: null };
  }

  try {
    const { data, error } = await supabase
      .from('tech_payouts')
      .select(
        `
        *,
        technicians (
          id,
          name,
          phone,
          email
        ),
        bookings (
          id,
          preferred_date,
          appliance_type,
          customer_name
        )
      `
      )
      .eq('payout_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by technician
    const groupedByTech = {};
    data.forEach((payout) => {
      const techId = payout.technician_id;
      if (!groupedByTech[techId]) {
        groupedByTech[techId] = {
          technician: payout.technicians,
          payouts: [],
          total_owed: 0,
        };
      }
      groupedByTech[techId].payouts.push(payout);
      groupedByTech[techId].total_owed += parseFloat(payout.amount_owed);
    });

    return { data: Object.values(groupedByTech), error: null };
  } catch (error) {
    console.error('Error getting techs with pending payouts:', error);
    return { data: null, error };
  }
};

/**
 * Generate weekly payout summary for all techs
 * Run this on Monday mornings to generate reports for previous week
 */
export const generateWeeklyPayoutReports = async () => {
  if (isMockMode) {
    return { data: { reports: [] }, error: null };
  }

  try {
    // Get last week's date range (Monday to Sunday)
    const today = new Date();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - today.getDay() - 6);
    lastMonday.setHours(0, 0, 0, 0);

    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
    lastSunday.setHours(23, 59, 59, 999);

    // Get all active techs
    const { data: techs, error: techsError } = await supabase
      .from('technicians')
      .select('*')
      .eq('status', 'active');

    if (techsError) throw techsError;

    const reports = [];

    // Generate report for each tech
    for (const tech of techs || []) {
      const { data: report, error: reportError } = await getTechWeeklyReport(
        tech.id,
        lastMonday,
        lastSunday
      );

      if (!reportError && report && report.jobs_count > 0) {
        reports.push({
          technician: tech,
          report,
          period: {
            start: lastMonday,
            end: lastSunday,
          },
        });
      }
    }

    return { data: { reports }, error: null };
  } catch (error) {
    console.error('Error generating weekly payout reports:', error);
    return { data: null, error };
  }
};

/**
 * Send weekly payout reminder SMS to tech
 */
export const sendPayoutReminder = async (technicianId) => {
  if (isMockMode) {
    console.log('📱 Mock: Payout reminder sent');
    return { success: true };
  }

  try {
    // Get tech details
    const { data: tech } = await supabase
      .from('technicians')
      .select('*')
      .eq('id', technicianId)
      .single();

    // Get pending payouts
    const { data: payouts } = await supabase
      .from('tech_payouts')
      .select('*')
      .eq('technician_id', technicianId)
      .eq('payout_status', 'pending');

    const totalOwed = payouts?.reduce(
      (sum, p) => sum + parseFloat(p.amount_owed),
      0
    ) || 0;
    const jobsCount = payouts?.length || 0;

    const message = `💰 Weekly payout due - ${tech.name}

Jobs completed: ${jobsCount}
Amount owed to you: $${totalOwed.toFixed(2)}

Pay to: [Your Venmo/Zelle]

Deadline: This Friday

Reply PAID when you've sent payment.`;

    // Log notification
    await supabase.from('sms_notifications').insert({
      recipient_phone: tech.phone,
      message_type: 'tech_payout_reminder',
      message_body: message,
      status: 'pending',
    });

    console.log(`📱 Payout reminder queued for ${tech.name}`);
    // TODO: Actually send via Twilio

    return { success: true };
  } catch (error) {
    console.error('Error sending payout reminder:', error);
    return { success: false, error };
  }
};
