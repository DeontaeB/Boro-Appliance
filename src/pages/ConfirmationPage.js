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
      alert('Failed to request reschedule. Please call us at (615) 555-0123');
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your appointment has been successfully scheduled.
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                <p className="font-semibold text-gray-800">{booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  Pending Assignment
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Service Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Appliance:</span>{' '}
                    <span className="font-medium capitalize">
                      {booking.appliance_type || booking.appliance}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>{' '}
                    <span className="font-medium">
                      {new Date(booking.preferred_date || booking.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time:</span>{' '}
                    <span className="font-medium">{booking.preferred_time || booking.time}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>{' '}
                    <span className="font-medium">{booking.customer_name || booking.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>{' '}
                    <span className="font-medium">{booking.customer_phone || booking.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>{' '}
                    <span className="font-medium">{booking.customer_email || booking.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Service Address</h3>
              <p className="text-sm text-gray-700">
                {booking.street_address || booking.address}<br />
                {booking.city}, {booking.zip_code || booking.zip}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="font-semibold text-blue-800 mb-1">$99 Diagnostic Fee - Payable to Tech</p>
                <p className="text-sm text-blue-700">
                  No payment has been collected online. You will pay the $99 diagnostic fee directly to the technician when they arrive. Payment can be made by cash or card.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* What Happens Next */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Tech Gets Notified</h3>
                <p className="text-sm text-gray-600">
                  Your assigned technician has been notified with your appointment details (address, time, appliance type).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">30-Minute Call</h3>
                <p className="text-sm text-gray-600">
                  Your tech will call you 30 minutes before arrival to confirm they're on the way.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Diagnosis & Quote</h3>
                <p className="text-sm text-gray-600">
                  The technician will diagnose the issue, provide a repair quote, and collect the $99 diagnostic fee (cash or card). If you approve the repair, they'll complete the work and collect payment directly.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <Card className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span>📱</span>
              <span>Check your phone for a confirmation text message</span>
            </li>
            <li className="flex gap-2">
              <span>📧</span>
              <span>A confirmation email has been sent to {booking.customer_email || booking.email}</span>
            </li>
            <li className="flex gap-2">
              <span>🛡️</span>
              <span>All repairs come with a 90-day warranty on parts and labor</span>
            </li>
            <li className="flex gap-2">
              <span>📞</span>
              <span>Need to reschedule? Call us at (615) 555-0123</span>
            </li>
          </ul>
        </Card>

        {/* Reschedule Notice */}
        {rescheduleRequested && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-800">Reschedule Request Received</p>
                <p className="text-sm text-green-700">
                  We'll call you within 2 hours to reschedule your appointment.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onBackToHome} variant="primary" size="lg">
            Return to Home
          </Button>
          <Button onClick={() => window.print()} variant="outline" size="lg">
            Print Confirmation
          </Button>
        </div>

        {/* Reschedule/Cancel Option */}
        {!rescheduleRequested && (
          <div className="mt-6 text-center">
            <button
              onClick={handleReschedule}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
            >
              {loading ? 'Requesting...' : 'Need to reschedule or cancel? Click here'}
            </button>
          </div>
        )}

        {/* Trust Signals */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Questions? Call us at (615) 555-0123 or email info@boroappliancepros.com
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>⭐ 4.9/5 Rating</span>
            <span>🛡️ Licensed & Insured</span>
            <span>✅ 90-Day Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
