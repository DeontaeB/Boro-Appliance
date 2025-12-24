import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const HowItWorksPage = ({ onBack, onBookNow }) => {
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
            How Boro Appliance Pros Works
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            The Modern Way to Book Appliance Repair
          </p>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Step 1 */}
          <Card className="mb-10 border-l-8 border-blue-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Book Online (60 seconds)</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600">→</span>
                    Select your appliance
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600">→</span>
                    Choose your time slot
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600">→</span>
                    Enter your details
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600">→</span>
                    Done. <span className="font-bold">No phone call needed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="mb-10 border-l-8 border-green-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Get Confirmed (Same Day)</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">→</span>
                    We review your booking
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">→</span>
                    Assign the best tech for your appliance
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">→</span>
                    You get SMS: <span className="font-semibold">"Your tech is John. He'll arrive Tuesday 2-4pm"</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="mb-10 border-l-8 border-purple-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Get Ready (Day Before)</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">→</span>
                    Automated reminder: "Repair tomorrow at 2pm"
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">→</span>
                    Text to confirm: "Reply YES to confirm"
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">→</span>
                    Morning of: "John will call 30 min before arrival"
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="mb-10 border-l-8 border-orange-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Track Your Tech (Real-Time)</h2>
                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <p className="text-gray-700 mb-2">📱 <span className="font-semibold">"John is on his way"</span></p>
                  <p className="text-gray-700 mb-2">📍 <span className="font-semibold">"John is 15 minutes away"</span></p>
                  <p className="text-gray-700">✅ <span className="font-semibold">"John has arrived"</span></p>
                </div>
                <p className="text-gray-600">
                  No more guessing or waiting around all day!
                </p>
              </div>
            </div>
          </Card>

          {/* Step 5 */}
          <Card className="mb-10 border-l-8 border-yellow-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Get Diagnosed</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">→</span>
                    Tech performs comprehensive 30-point diagnostic
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">→</span>
                    Identifies <span className="font-bold">all issues</span> (not just the obvious one)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">→</span>
                    Provides written estimate
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">→</span>
                    <span className="font-bold">You decide:</span> repair or not
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 6 */}
          <Card className="mb-10 border-l-8 border-red-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                6
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Repair Same-Day</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-red-600">→</span>
                    If approved, tech has parts on truck (90% of the time)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-600">→</span>
                    Repair completed same visit
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-600">→</span>
                    You pay tech directly (cash or card)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-600">→</span>
                    <span className="font-bold text-green-600">$79 diagnostic fee waived!</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 7 */}
          <Card className="border-l-8 border-teal-600">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                7
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Follow Up</h2>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">→</span>
                    SMS: "How was your service? Leave a review"
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">→</span>
                    90-day warranty on all repairs
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">→</span>
                    One-click rebooking if you need us again
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why This Process Works Better
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Faster</h3>
                <p className="text-gray-700">
                  Book in 60 seconds vs 10+ minutes on the phone. Same-day confirmation vs "we'll call you back."
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Informed</h3>
                <p className="text-gray-700">
                  Get SMS updates every step. Know exactly when your tech is arriving. No more waiting around.
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Transparent</h3>
                <p className="text-gray-700">
                  Upfront pricing. Written estimates. No hidden fees. You know exactly what you're paying.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Modern Way?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your repair in 60 seconds. $79 diagnostic (launch special).
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="mb-6">
            Book Now - $79 Diagnostic
          </Button>
          <p className="text-sm text-blue-200">
            ✓ No phone calls ✓ Same day confirmation ✓ Real-time tracking
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
