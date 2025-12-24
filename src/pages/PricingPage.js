import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const PricingPage = ({ onBack, onBookNow }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="text-primary hover:text-primary-dark mb-2 flex items-center transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            No hidden fees. No surprises. Just honest pricing for quality repairs.
          </p>
        </div>
      </section>

      {/* Diagnostic Fee Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-500 p-10">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-500 text-white text-sm font-bold px-6 py-2 rounded-full mb-4">
                🎉 LAUNCH SPECIAL - LIMITED TIME
              </div>
              <h2 className="text-6xl font-extrabold text-gray-900 mb-4">
                $79 Diagnostic Fee
              </h2>
              <p className="text-2xl text-gray-600 line-through mb-2">Regular $99</p>
              <p className="text-xl text-gray-700 mb-6">Save $20 - First 50 Customers Only!</p>
            </div>

            <div className="bg-white rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What You Get:</h3>
              <ul className="space-y-4">
                {[
                  'Complete 30-point appliance inspection',
                  'Identification of ALL issues (not just the obvious problem)',
                  'Written repair estimate with parts breakdown',
                  'Expert recommendations (repair vs replace)',
                  'No-obligation quote - your choice to proceed',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-8 text-center">
              <p className="text-3xl font-extrabold text-gray-900 mb-3">
                💰 IMPORTANT: Diagnostic Fee Waived!
              </p>
              <p className="text-xl text-gray-700">
                If you approve the repair, the $79 diagnostic fee is <span className="font-bold text-green-600">completely waived</span>.
                You only pay for the repair itself.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Average Repair Costs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900">
            Average Repair Costs
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            These are typical ranges. Your actual cost will depend on the specific issue and parts needed.
          </p>

          {/* Refrigerator */}
          <Card className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">❄️</div>
              <h3 className="text-3xl font-bold text-gray-900">Refrigerator Issues</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { issue: 'Not cooling', cost: '$150-$250' },
                { issue: 'Ice maker broken', cost: '$120-$200' },
                { issue: 'Compressor replacement', cost: '$300-$600' },
                { issue: 'Thermostat repair', cost: '$100-$180' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{item.issue}</span>
                  <span className="text-blue-600 font-bold text-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Dishwasher */}
          <Card className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🍽️</div>
              <h3 className="text-3xl font-bold text-gray-900">Dishwasher Issues</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { issue: 'Not draining', cost: '$120-$200' },
                { issue: 'Not cleaning properly', cost: '$100-$180' },
                { issue: 'Door latch broken', cost: '$80-$150' },
                { issue: 'Pump replacement', cost: '$200-$350' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{item.issue}</span>
                  <span className="text-blue-600 font-bold text-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Washer */}
          <Card className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🔄</div>
              <h3 className="text-3xl font-bold text-gray-900">Washer Issues</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { issue: 'Won\'t spin', cost: '$130-$250' },
                { issue: 'Leaking water', cost: '$100-$200' },
                { issue: 'Won\'t drain', cost: '$120-$220' },
                { issue: 'Motor replacement', cost: '$250-$400' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{item.issue}</span>
                  <span className="text-blue-600 font-bold text-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Dryer */}
          <Card className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">💨</div>
              <h3 className="text-3xl font-bold text-gray-900">Dryer Issues</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { issue: 'Not heating', cost: '$120-$220' },
                { issue: 'Won\'t start', cost: '$100-$180' },
                { issue: 'Making loud noise', cost: '$120-$200' },
                { issue: 'Belt replacement', cost: '$130-$200' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{item.issue}</span>
                  <span className="text-blue-600 font-bold text-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* No Hidden Fees */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            NO HIDDEN FEES
          </h2>
          <Card>
            <p className="text-xl text-gray-700 mb-8 text-center">
              What you see is what you pay. We <span className="font-bold">don't charge</span>:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Extra "service fees"',
                '"Emergency" surcharges',
                'Weekend/evening fees',
                'Travel fees within Murfreesboro',
                'Diagnostic fee (if you do the repair)',
                'Hidden parts markup',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-red-50 p-4 rounded-lg border-2 border-red-200">
                  <span className="text-red-600 font-bold text-2xl">✗</span>
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* 90-Day Warranty */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10">
            <div className="text-center">
              <div className="text-7xl mb-6">🛡️</div>
              <h2 className="text-4xl font-extrabold mb-6">90-Day Warranty</h2>
              <p className="text-2xl text-blue-100 mb-8">
                All repairs include a comprehensive 90-day parts and labor warranty.
              </p>
              <p className="text-xl">
                If the same issue happens again within 90 days, <span className="font-bold text-yellow-300">we fix it free</span>.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Book Your Repair?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Lock in the $79 launch special before it's gone!
          </p>
          <Button onClick={onBookNow} size="lg" className="mb-6">
            Book Now - $79 Diagnostic
          </Button>
          <p className="text-sm text-gray-500">
            ✓ 60-second booking ✓ Same day confirmation ✓ Real-time tracking
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
