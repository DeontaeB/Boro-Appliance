import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { createBooking } from '../services/bookingService';

const BookingPage = ({ onBack, onBookingComplete, preSelectedAppliance }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    appliance: preSelectedAppliance || '',
    issue: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Murfreesboro',
    zip: '',
    date: '',
    time: '',
  });

  const appliances = [
    { id: 'refrigerator', name: 'Refrigerator', icon: '🧊' },
    { id: 'washer', name: 'Washer', icon: '🌀' },
    { id: 'dryer', name: 'Dryer', icon: '💨' },
    { id: 'dishwasher', name: 'Dishwasher', icon: '🍽️' },
    { id: 'oven', name: 'Oven/Stove', icon: '🔥' },
    { id: 'microwave', name: 'Microwave', icon: '📻' },
    { id: 'disposal', name: 'Garbage Disposal', icon: '🗑️' },
    { id: 'other', name: 'Other', icon: '🔧' },
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleApplianceSelect = (applianceId) => {
    setFormData({
      ...formData,
      appliance: applianceId,
    });
    setError(null);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create booking in database
      const { data: booking, error: bookingError } = await createBooking(formData);

      if (bookingError) {
        throw new Error('Failed to create booking');
      }

      // Navigate to confirmation page
      if (onBookingComplete) {
        onBookingComplete(booking);
      }
    } catch (err) {
      console.error('Booking creation error:', err);
      setError('Unable to confirm booking. Please refresh the page and try again, or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-primary hover:text-primary-dark mb-4 flex items-center transition"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Repair</h1>
          <p className="text-gray-600">Complete the form below to schedule your appointment</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-4">
            {['Appliance', 'Contact', 'Schedule', 'Review'].map((label, index) => (
              <div key={index} className="text-center flex-1">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 transition ${
                    index + 1 <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs ${index + 1 <= currentStep ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Card>
          {/* Step 1: Appliance Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">What appliance needs repair?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {appliances.map((appliance) => (
                  <button
                    key={appliance.id}
                    onClick={() => handleApplianceSelect(appliance.id)}
                    className={`p-6 border-2 rounded-lg transition ${
                      formData.appliance === appliance.id
                        ? 'border-primary bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{appliance.icon}</div>
                    <div className="text-sm font-medium">{appliance.name}</div>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the issue (optional)
                </label>
                <textarea
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  placeholder="e.g., Not cooling, making noise, won't start..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={!formData.appliance}
                fullWidth
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Contact Information</h2>
              <div className="space-y-4 mb-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Smith"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(615) 555-0123"
                />
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Main Street"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    placeholder="37129"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handlePrevious} variant="outline" fullWidth>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.zip}
                  fullWidth
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Choose Your Appointment</h2>

              <div className="mb-6">
                <Input
                  label="Preferred Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Time Slot <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`w-full p-4 border-2 rounded-lg text-left transition ${
                        formData.time === slot
                          ? 'border-primary bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{slot}</span>
                        {formData.time === slot && (
                          <span className="text-primary text-xl">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>📱 Quick Confirmation:</strong> We'll confirm your exact appointment time via text message within 1 hour of booking.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handlePrevious} variant="outline" fullWidth>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.date || !formData.time}
                  fullWidth
                >
                  Continue to Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Appliance:</span>
                    <span className="font-medium capitalize">{formData.appliance.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Fee Notice */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">💵</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">$99 Diagnostic Fee - Pay at Appointment</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      No payment is required now. You will pay the $99 diagnostic fee directly to the technician when they arrive.
                    </p>
                    <p className="text-sm text-gray-700">
                      The tech will diagnose your appliance, provide a repair quote, and if you choose to proceed, the diagnostic fee will be applied to your total repair cost.
                    </p>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">What Happens Next:</h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Your tech will call you 30 minutes before arrival</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Tech diagnoses the issue and provides repair quote</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Pay $99 diagnostic fee to tech (cash or card accepted)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>If you approve repair, tech completes work and collects payment</span>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleBookingSubmit}
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Confirming Booking...' : 'Confirm Booking'}
                </Button>

                <Button onClick={handlePrevious} variant="outline" fullWidth disabled={loading}>
                  Back
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                By confirming, you agree to our terms of service and cancellation policy.
              </p>
            </div>
          )}
        </Card>

        {/* Trust Badges Below Form */}
        <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>90-Day Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
