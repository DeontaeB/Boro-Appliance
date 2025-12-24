import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { requestReschedule } from '../services/bookingService';

const ConfirmationPage = ({ booking, onBackToHome }) => {
  const [rescheduleRequested, setRescheduleRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReschedule = async () => {
    if (!booking?.id) return;

    setLoading(true);
    const { error } = await requestReschedule(booking.id);

    if (!error) {
      setRescheduleRequested(true);
    } else {
      alert('Failed to request reschedule. Please contact us to reschedule your appointment.');
    }
    setLoading(false);
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <p>No booking found.</p>
          <Button onClick={onBackToHome}>Return Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <span className="text-6xl">✅</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-2xl text-blue-600 font-semibold mb-2">
            We'll call you today to confirm.
          </p>
          <p className="text-lg text-gray-600">
            Keep your phone handy!
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Appointment</h2>

            <div className="space-y-6 text-center">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Service</p>
                <p className="text-2xl font-bold text-gray-800 capitalize">
                  {booking.appliance_type || booking.appliance}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(booking.preferred_date || booking.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {booking.preferred_time || booking.time}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-base font-medium text-gray-800">
                  {booking.street_address || booking.address}<br />
                  {booking.city}, {booking.zip_code || booking.zip}
                </p>
              </div>
            </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-500 rounded-lg p-6 text-center mt-6">
            <div className="inline-block bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
              🎉 LAUNCH SPECIAL
            </div>
            <p className="text-4xl font-bold text-green-700 mb-2">$79 Diagnostic Fee</p>
            <p className="text-lg text-gray-600 line-through mb-2">Regular $99 - You Save $20!</p>
            <p className="text-base text-green-800 mb-3">
              Pay the tech when they arrive (cash or card)
            </p>
            <p className="text-base text-green-900 font-semibold">
              ✨ Waived if you approve the repair!
            </p>
          </div>
        </Card>

        {/* What Happens Next - Simplified */}
        <Card className="mb-8 bg-blue-50 border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">What Happens Next?</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <p className="text-base text-gray-800">
                <strong>We call you same day</strong> to confirm your appointment
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <p className="text-base text-gray-800">
                <strong>Tech arrives at scheduled time</strong> and diagnoses the issue
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <p className="text-base text-gray-800">
                <strong>You pay $99 diagnostic fee</strong> and approve the repair
              </p>
            </div>
          </div>
        </Card>

        {/* Reschedule Notice */}
        {rescheduleRequested && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-800">Reschedule Request Received</p>
                <p className="text-sm text-green-700">
                  We'll call you same day to reschedule your appointment.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="text-center">
          <Button onClick={onBackToHome} variant="primary" size="lg" className="mb-6">
            ← Return to Home
          </Button>

          <p className="text-gray-600 mb-2">
            Questions? Email us at <strong>info@boroappliancepros.com</strong>
          </p>

          <div className="flex justify-center gap-6 text-sm text-gray-500 mt-4">
            <span>⭐ 4.9/5 Rating</span>
            <span>🛡️ 90-Day Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
