import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import {
  getPendingConfirmations,
  confirmBooking,
  getAvailableTechnicians,
} from '../services/bookingService';

const AdminConfirmationPage = ({ onBack }) => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState({});
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [bookingsResult, techsResult] = await Promise.all([
      getPendingConfirmations(),
      getAvailableTechnicians(),
    ]);

    if (bookingsResult.data) setPendingBookings(bookingsResult.data);
    if (techsResult.data) setTechnicians(techsResult.data);
    setLoading(false);
  };

  const handleConfirm = async (bookingId) => {
    const techId = selectedTech[bookingId];
    if (!techId) {
      alert('Please select a technician');
      return;
    }

    setConfirming(bookingId);
    const { error } = await confirmBooking(bookingId, techId, 'Admin');

    if (!error) {
      // Reload data to update list
      await loadData();
      alert('Booking confirmed! Tech has been notified.');
    } else {
      alert('Failed to confirm booking');
    }
    setConfirming(null);
  };

  const handleTechSelect = (bookingId, techId) => {
    setSelectedTech({ ...selectedTech, [bookingId]: techId });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <p>Loading pending confirmations...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-primary hover:text-primary-dark mb-4 flex items-center transition"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pending Confirmations
          </h1>
          <p className="text-gray-600">
            Call customers to confirm appointments, then assign a technician
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-yellow-50 border-yellow-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {pendingBookings.length}
              </p>
              <p className="text-sm text-gray-600">Pending Confirmation</p>
            </div>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {technicians.length}
              </p>
              <p className="text-sm text-gray-600">Available Techs</p>
            </div>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">2 hrs</p>
              <p className="text-sm text-gray-600">Confirmation Deadline</p>
            </div>
          </Card>
        </div>

        {/* Pending Bookings List */}
        {pendingBookings.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">✅</span>
              <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
              <p className="text-gray-600">
                No bookings pending confirmation at this time.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Booking Details */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {booking.customer_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Booking ID: {booking.id.slice(0, 8)}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Contact</p>
                        <p className="text-sm font-medium">
                          📞 {booking.customer_phone}
                        </p>
                        <p className="text-sm font-medium">
                          📧 {booking.customer_email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Appointment</p>
                        <p className="text-sm font-medium">
                          📅{' '}
                          {new Date(booking.preferred_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium">
                          🕐 {booking.preferred_time}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Service Details</p>
                      <p className="text-sm font-medium capitalize">
                        🔧 {booking.appliance_type}
                      </p>
                      <p className="text-sm text-gray-600">
                        📍 {booking.street_address}, {booking.city},{' '}
                        {booking.zip_code}
                      </p>
                      {booking.issue_description && (
                        <p className="text-sm text-gray-600 mt-2">
                          💬 {booking.issue_description}
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-xs text-blue-800 font-semibold mb-1">
                        ⏰ Action Required
                      </p>
                      <p className="text-xs text-blue-700">
                        Call customer within 2 hours to confirm appointment. Then
                        assign a technician below.
                      </p>
                    </div>
                  </div>

                  {/* Tech Assignment */}
                  <div className="border-l border-gray-200 pl-6">
                    <h4 className="font-semibold mb-3">Assign Technician</h4>

                    <div className="space-y-2 mb-4">
                      {technicians.map((tech) => (
                        <button
                          key={tech.id}
                          onClick={() => handleTechSelect(booking.id, tech.id)}
                          className={`w-full text-left p-3 border-2 rounded-lg transition ${
                            selectedTech[booking.id] === tech.id
                              ? 'border-primary bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="font-medium text-sm">{tech.name}</p>
                          <p className="text-xs text-gray-600">{tech.phone}</p>
                          {tech.specialties && (
                            <p className="text-xs text-gray-500 mt-1">
                              {tech.specialties.slice(0, 2).join(', ')}
                            </p>
                          )}
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleConfirm(booking.id)}
                      disabled={!selectedTech[booking.id] || confirming === booking.id}
                      fullWidth
                    >
                      {confirming === booking.id
                        ? 'Confirming...'
                        : 'Confirm & Notify Tech'}
                    </Button>

                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Tech will receive SMS notification
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8 bg-gray-50">
          <h3 className="font-semibold mb-3">Confirmation Workflow:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>
                Call customer to verify appointment details and confirm they're
                serious about the booking
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>
                Select an available technician based on location and specialty
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>
                Click "Confirm & Notify Tech" - this will send SMS to the
                technician with job details
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>
                Booking status changes to "Confirmed" and tech is assigned
              </span>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default AdminConfirmationPage;
