import React from 'react';
import Button from '../components/Button';

const LandingPage = ({ onBookNow, onApplianceSelect }) => {
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

      {/* Local Trust Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-sm md:text-base flex items-center justify-center gap-2">
            <span className="text-xl">📍</span>
            Proudly Serving Rutherford County Since 2020 - Your Local Appliance Experts
          </p>
        </div>
      </div>

      {/* Hero Section - Conversion Optimized */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 shadow-lg border border-white/30">
              <span className="text-yellow-300 mr-3 text-lg">★★★★★</span>
              <span className="text-sm font-semibold">4.9/5 Rating • 200+ Happy Customers in Rutherford County</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Appliance Broken?<br />
              <span className="text-yellow-300">We Fix It Today.</span>
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-blue-50 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-white">Murfreesboro • Smyrna • LaVergne • Eagleville</span>
            </p>
            <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Fast response. Expert techs. Upfront pricing.<br />
              <span className="font-bold text-white text-2xl">Only $99 Diagnostic Fee</span>
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl transform hover:scale-105 transition-transform">
                📅 Book Your Repair - $99
              </Button>
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm text-yellow-300 font-semibold">
                  ⚡ Available TODAY in Rutherford County
                </p>
                <p className="text-xs text-blue-200">
                  Most appointments within 2-4 hours
                </p>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: '✓', text: 'Licensed & Insured', subtext: 'TN State Certified' },
                { icon: '⚡', text: 'Fast Response', subtext: '2-4 Hour Arrival' },
                { icon: '💰', text: 'Upfront Pricing', subtext: 'No Hidden Fees' },
                { icon: '🛡️', text: '90-Day Warranty', subtext: 'Parts & Labor' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
                  <div className="text-4xl font-bold mb-2 text-yellow-300">{item.icon}</div>
                  <p className="text-sm font-bold mb-1">{item.text}</p>
                  <p className="text-xs text-blue-200">{item.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-base md:text-lg flex items-center justify-center gap-2">
            <span className="animate-pulse">⚡</span>
            Only 3 Priority Slots Left in Rutherford County Today!
            <span className="animate-pulse">⚡</span>
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              We Fix Every Major Appliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serving homeowners across <span className="font-bold text-blue-600">Murfreesboro, Smyrna, LaVergne & Eagleville</span> with expert repairs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[
              { name: 'Refrigerators', icon: '❄️', popular: true, desc: 'Cooling issues, leaks' },
              { name: 'Washers & Dryers', icon: '🔄', popular: true, desc: 'Not spinning, draining' },
              { name: 'Dishwashers', icon: '🍽️', popular: false, desc: 'Not cleaning, leaking' },
              { name: 'Ovens & Stoves', icon: '🔥', popular: false, desc: 'Not heating, igniters' },
              { name: 'Microwaves', icon: '⚡', popular: false, desc: 'Not heating, sparking' },
              { name: 'Garbage Disposals', icon: '🔧', popular: false, desc: 'Jammed, leaking' },
              { name: 'Ice Makers', icon: '🧊', popular: false, desc: 'Not making ice' },
              { name: 'Range Hoods', icon: '💨', popular: false, desc: 'Fan, lights issues' },
            ].map((service, index) => (
              <div
                key={index}
                onClick={() => onApplianceSelect && onApplianceSelect(service.name.toLowerCase().replace(' & ', '-').replace(' ', '-'))}
                className="relative text-center p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                {service.popular && (
                  <span className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                )}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Don't see your appliance? We likely fix it!</p>
            <Button onClick={onBookNow} size="lg">
              Book Your Repair Now
            </Button>
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
                title: 'Book Online in 60 Seconds',
                description: 'Choose your appliance, pick a time that works for you. $99 diagnostic fee - pay cash or card at appointment.',
                time: 'Takes 1 minute',
              },
              {
                step: '2',
                title: 'We Call to Confirm',
                description: 'We will call within 2 hours to confirm your appointment and answer any questions. Real person, not a robot!',
                time: 'Within 2 hours',
              },
              {
                step: '3',
                title: 'Fast Repair Service',
                description: 'Licensed tech arrives on time, diagnoses the problem, gives upfront quote, and fixes it on the spot.',
                time: 'Usually same day',
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
                text: 'My refrigerator stopped cooling on a Sunday. They had someone out within 3 hours and fixed it fast. Amazing service for Rutherford County!',
                date: '2 days ago',
              },
              {
                name: 'John D.',
                location: 'Smyrna, TN',
                rating: 5,
                text: 'Finally found a local company I can trust! Upfront pricing with no surprises. The tech was professional and explained everything. Will definitely use again.',
                date: '1 week ago',
              },
              {
                name: 'Lisa K.',
                location: 'LaVergne, TN',
                rating: 5,
                text: 'Fixed my washer in under an hour. The booking process was so easy and they actually showed up on time. Best appliance repair in Rutherford County!',
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
                title: 'Fast Response Time',
                description: 'Most appointments within 24 hours. We understand urgency and respond quickly.',
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
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Don't Let a Broken Appliance<br />
            <span className="text-yellow-300">Ruin Your Day</span>
          </h2>
          <p className="text-2xl mb-4 text-blue-50 font-semibold">
            📍 Fast Service Available in Rutherford County
          </p>
          <p className="text-lg mb-8 text-blue-100">
            Murfreesboro • Smyrna • LaVergne • Eagleville
          </p>
          <div className="bg-orange-500 text-white py-3 px-6 rounded-lg mb-8 inline-block">
            <p className="font-bold text-lg">
              ⏰ Only 3 Slots Left for TODAY
            </p>
          </div>
          <div className="mb-8">
            <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl transform hover:scale-105 transition-transform">
              📅 Book Your Repair - Only $99
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2">✓ Licensed & Insured</span>
            <span className="flex items-center gap-2">✓ 90-Day Warranty</span>
            <span className="flex items-center gap-2">✓ 4.9/5 Rating</span>
          </div>
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
              <p className="text-yellow-400 font-semibold text-sm mb-2">Rutherford County Only:</p>
              <p className="text-gray-400 text-sm">Murfreesboro, TN</p>
              <p className="text-gray-400 text-sm">Smyrna, TN</p>
              <p className="text-gray-400 text-sm">LaVergne, TN</p>
              <p className="text-gray-400 text-sm">Eagleville, TN</p>
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
