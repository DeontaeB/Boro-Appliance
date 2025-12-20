import React from 'react';
import Button from '../components/Button';

const LandingPage = ({ onBookNow }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Boro Appliance Pros</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition">How It Works</a>
              <a href="#reviews" className="text-gray-700 hover:text-primary transition">Reviews</a>
            </div>
            <Button onClick={onBookNow} size="md">
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Conversion Optimized */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-yellow-300 mr-2">⭐⭐⭐⭐⭐</span>
              <span className="text-sm">4.9/5 from 200+ customers</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Appliance Broken? <br />Fixed Today.
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Book in 60 seconds. Expert tech at your door same-day. <br />
              <span className="font-semibold text-white">$99 diagnostic fee. No hidden charges.</span>
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={onBookNow} size="lg" variant="secondary">
                Schedule Repair - $99
              </Button>
              <p className="text-sm text-blue-200">
                ⚡ Most appointments within 24 hours
              </p>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: '✅', text: 'Licensed & Insured' },
                { icon: '🛡️', text: '90-Day Warranty' },
                { icon: '💰', text: 'Upfront Pricing' },
                { icon: '⏰', text: 'Same-Day Service' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-yellow-400 text-gray-900 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold">
            ⚡ Limited slots available today! Book now to secure your same-day appointment.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Appliances We Repair
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From refrigerators to dishwashers, we fix all major home appliances quickly and affordably.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[
              { name: 'Refrigerators', icon: '🧊', popular: true },
              { name: 'Washers & Dryers', icon: '🌀', popular: true },
              { name: 'Dishwashers', icon: '🍽️', popular: false },
              { name: 'Ovens & Stoves', icon: '🔥', popular: false },
              { name: 'Microwaves', icon: '📻', popular: false },
              { name: 'Garbage Disposals', icon: '🗑️', popular: false },
              { name: 'Ice Makers', icon: '🧊', popular: false },
              { name: 'Range Hoods', icon: '💨', popular: false },
            ].map((service, index) => (
              <div
                key={index}
                className="relative text-center p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition cursor-pointer"
              >
                {service.popular && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    POPULAR
                  </span>
                )}
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-base font-semibold text-gray-800">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Getting your appliance fixed is as easy as 1-2-3
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Book Online',
                description: 'Choose your appliance, date, and time. Pay $99 diagnostic fee securely with your card.',
                time: '60 seconds',
              },
              {
                step: '2',
                title: 'We Assign a Pro',
                description: 'Our system instantly matches you with the best available certified technician in your area.',
                time: 'Instant',
              },
              {
                step: '3',
                title: 'Get It Fixed',
                description: 'Tech diagnoses the issue, provides upfront quote, and completes repair on the spot.',
                time: 'Same day',
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-primary/20" style={{ width: '100%', left: '50%' }} />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-4 relative z-10">
                  {item.step}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <span className="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                location: 'Murfreesboro, TN',
                rating: 5,
                text: 'My refrigerator stopped cooling on a Sunday. They had someone out within 3 hours and fixed it the same day. Amazing service!',
                date: '2 days ago',
              },
              {
                name: 'John D.',
                location: 'Smyrna, TN',
                rating: 5,
                text: 'Upfront pricing with no surprises. The tech was professional and explained everything. Will definitely use again.',
                date: '1 week ago',
              },
              {
                name: 'Lisa K.',
                location: 'Murfreesboro, TN',
                rating: 5,
                text: 'Fixed my washer in under an hour. The booking process was so easy. Highly recommend!',
                date: '2 weeks ago',
              },
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Boro Appliance Pros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Same-Day Service',
                description: 'Most appointments available within 24 hours. We understand urgency.',
                icon: '⚡',
              },
              {
                title: 'Transparent Pricing',
                description: '$99 diagnostic fee. Quote before work begins. No hidden charges ever.',
                icon: '💰',
              },
              {
                title: 'Certified Techs',
                description: 'Background-checked professionals with 10+ years average experience.',
                icon: '✅',
              },
              {
                title: '90-Day Warranty',
                description: 'All repairs backed by our comprehensive parts and labor warranty.',
                icon: '🛡️',
              },
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Scarcity */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Let a Broken Appliance Ruin Your Day
          </h2>
          <p className="text-xl mb-2 text-blue-100">
            Book your same-day appointment now while slots are still available.
          </p>
          <p className="text-sm mb-8 text-blue-200">
            ⏰ Only 3 slots left for today
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary">
            Book Your Repair Now - $99
          </Button>
          <p className="mt-4 text-sm text-blue-200">
            💳 Secure payment • 🛡️ 90-day warranty • ⭐ 4.9/5 rating
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Boro Appliance Pros</h3>
              <p className="text-gray-400 text-sm">
                Fast, reliable appliance repair you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#reviews" className="hover:text-white transition">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Phone: (615) 555-0123</p>
              <p className="text-gray-400 text-sm">Email: info@boroappliancepros.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Area</h4>
              <p className="text-gray-400 text-sm">Murfreesboro, TN</p>
              <p className="text-gray-400 text-sm">Smyrna, TN</p>
              <p className="text-gray-400 text-sm">& surrounding areas</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Boro Appliance Pros. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
