import { supabase, isMockMode } from './supabase';

// Mock data for development without Supabase
const mockBookings = [];

/**
 * Create a new booking
 * @param {Object} bookingData - Booking details
 * @returns {Promise<Object>} Created booking
 */
export const createBooking = async (bookingData) => {
  if (isMockMode) {
    // Mock mode - just store in memory
    const mockBooking = {
      id: `mock-${Date.now()}`,
      ...bookingData,
      status: 'pending_confirmation',
      diagnostic_fee: 99.00,
      created_at: new Date().toISOString(),
    };
    mockBookings.push(mockBooking);
    console.log('📋 Mock Booking Created:', mockBooking);
    return { data: mockBooking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          street_address: bookingData.address,
          city: bookingData.city,
          zip_code: bookingData.zip,
          appliance_type: bookingData.appliance,
          issue_description: bookingData.issue || null,
          preferred_date: bookingData.date,
          preferred_time: bookingData.time,
          status: 'pending_confirmation',
          diagnostic_fee: 99.00,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }
};

/**
 * Get all bookings
 * @returns {Promise<Array>} List of bookings
 */
export const getAllBookings = async () => {
  if (isMockMode) {
    return { data: mockBookings, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        technicians:assigned_tech_id (
          id,
          name,
          phone,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { data: null, error };
  }
};

/**
 * Get booking by ID
 * @param {string} bookingId
 * @returns {Promise<Object>} Booking details
 */
export const getBookingById = async (bookingId) => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    return { data: booking || null, error: booking ? null : 'Not found' };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, technicians:assigned_tech_id(*)')
      .eq('id', bookingId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return { data: null, error };
  }
};

/**
 * Update booking status
 * @param {string} bookingId
 * @param {string} status
 * @returns {Promise<Object>} Updated booking
 */
export const updateBookingStatus = async (bookingId, status) => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = status;
      booking.updated_at = new Date().toISOString();
    }
    return { data: booking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { data: null, error };
  }
};

/**
 * Update job payment details (collected by tech)
 * @param {string} bookingId
 * @param {Object} paymentDetails - {repair_cost, total_collected_by_tech, payment_method}
 * @returns {Promise<Object>} Updated booking
 */
export const updateJobPayment = async (bookingId, paymentDetails) => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      Object.assign(booking, paymentDetails);
      booking.updated_at = new Date().toISOString();
    }
    return { data: booking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update(paymentDetails)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating job payment:', error);
    return { data: null, error };
  }
};

/**
 * Assign technician to booking
 * @param {string} bookingId
 * @param {string} technicianId
 * @returns {Promise<Object>} Updated booking
 */
export const assignTechnician = async (bookingId, technicianId) => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.assigned_tech_id = technicianId;
      booking.status = 'assigned';
      booking.updated_at = new Date().toISOString();
    }
    return { data: booking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        assigned_tech_id: technicianId,
        status: 'assigned',
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error assigning technician:', error);
    return { data: null, error };
  }
};

/**
 * Get available technicians
 * @returns {Promise<Array>} List of available technicians
 */
export const getAvailableTechnicians = async () => {
  if (isMockMode) {
    return {
      data: [
        { id: '1', name: 'Mike Johnson', specialties: ['refrigerator', 'washer'] },
        { id: '2', name: 'Sarah Williams', specialties: ['dishwasher', 'oven'] },
      ],
      error: null,
    };
  }

  try {
    const { data, error } = await supabase
      .from('technicians')
      .select('*')
      .eq('status', 'active')
      .eq('available', true);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return { data: null, error };
  }
};

/**
 * Confirm a booking and assign technician (admin function)
 * @param {string} bookingId
 * @param {string} technicianId
 * @param {string} confirmedBy - Name of admin/staff confirming
 * @returns {Promise<Object>} Updated booking
 */
export const confirmBooking = async (bookingId, technicianId, confirmedBy = 'Admin') => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = 'confirmed';
      booking.assigned_tech_id = technicianId;
      booking.confirmed_at = new Date().toISOString();
      booking.confirmed_by = confirmedBy;
      booking.updated_at = new Date().toISOString();
    }
    return { data: booking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        assigned_tech_id: technicianId,
        confirmed_at: new Date().toISOString(),
        confirmed_by: confirmedBy,
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error confirming booking:', error);
    return { data: null, error };
  }
};

/**
 * Get bookings pending confirmation
 * @returns {Promise<Array>} List of pending bookings
 */
export const getPendingConfirmations = async () => {
  if (isMockMode) {
    const pending = mockBookings.filter((b) => b.status === 'pending_confirmation');
    return { data: pending, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending_confirmation')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching pending confirmations:', error);
    return { data: null, error };
  }
};

/**
 * Request reschedule for a booking
 * @param {string} bookingId
 * @returns {Promise<Object>} Updated booking
 */
export const requestReschedule = async (bookingId) => {
  if (isMockMode) {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = 'reschedule_requested';
      booking.updated_at = new Date().toISOString();
    }
    return { data: booking, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'reschedule_requested' })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error requesting reschedule:', error);
    return { data: null, error };
  }
};
