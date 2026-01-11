import React from 'react';
import SEO from '../components/SEO';
import Button from '../components/Button';

const MurfreesboroPage = ({ onBookNow, onBack }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Boro Appliance Pros - Murfreesboro Location",
    "image": "https://boroappliancepros.com/logo.png",
    "description": "Professional appliance repair service in Murfreesboro, TN. Same-day service available. Licensed & insured.",
    "@id": "https://boroappliancepros.com/murfreesboro",
    "url": "https://boroappliancepros.com/murfreesboro",
    "telephone": "(615) 379-9576",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Murfreesboro",
      "addressRegion": "TN",
      "addressCountry": "US",
      "postalCode": "37129"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.8456,
      "longitude": -86.3903
    },
    "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-17:00",
    "areaServed": {
      "@type": "City",
      "name": "Murfreesboro",
      "containedInPlace": "Rutherford County, TN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Appliance Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Refrigerator Repair Murfreesboro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dishwasher Repair Murfreesboro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Washer Repair Murfreesboro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dryer Repair Murfreesboro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Oven Repair Murfreesboro"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200"
    }
  };

  const neighborhoods = [
    'Indian Park', 'Blackman', 'MTSU Area', 'The Avenue',
    'Gateway', 'Stones River', 'Medical Center', 'Veterans Parkway',
    'Old Fort', 'Northwest Murfreesboro', 'Southeast Murfreesboro'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Appliance Repair Murfreesboro TN | Same-Day Service | Boro Appliance Pros"
        description="Appliance repair in Murfreesboro, TN. Book online in 60 seconds. Same-day service available. $79 diagnostic (waived with repair). Licensed & insured. Serving all Murfreesboro neighborhoods."
        keywords="appliance repair murfreesboro, appliance repair murfreesboro tn, murfreesboro appliance repair, refrigerator repair murfreesboro, dishwasher repair murfreesboro, washer repair murfreesboro, dryer repair murfreesboro, same day appliance repair murfreesboro"
        canonical="/murfreesboro"
        schema={schema}
      />

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={onBack} className="text-2xl font-bold text-primary hover:text-blue-700 transition">
                Boro Appliance Pros
              </button>
            </div>
            <Button onClick={onBookNow} size="md">
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Appliance Repair in Murfreesboro, TN
            </h1>
            <p className="text-2xl mb-8 text-blue-50 max-w-3xl mx-auto">
              Fast, reliable appliance repair for Murfreesboro residents. Book online in 60 seconds.
            </p>
            <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
              Book Murfreesboro Repair Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              When your appliances break down in Murfreesboro, you need fast, reliable service from local experts who understand the urgency.
              Boro Appliance Pros serves all of Murfreesboro, Tennessee with modern, hassle-free appliance repair services that put you in control.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Why Choose Boro Appliance Pros for Murfreesboro Appliance Repair?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              {[
                { icon: '📱', title: 'Book Online in 60 Seconds', desc: 'No phone calls needed. Book from your couch at 11pm if you want.' },
                { icon: '⚡', title: 'Same-Day Service in Murfreesboro', desc: 'Most appointments within 24 hours. We respond fast to your repair needs.' },
                { icon: '💰', title: '$79 Diagnostic Fee', desc: 'Launch special pricing. Completely waived if you approve the repair.' },
                { icon: '📍', title: 'Serving All Murfreesboro Neighborhoods', desc: 'From MTSU to Gateway, Blackman to Indian Park - we cover it all.' }
              ].map((item, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Neighborhoods We Serve in Murfreesboro
            </h2>

            <p className="text-gray-700 mb-4">
              We provide fast appliance repair service to all Murfreesboro neighborhoods, including:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6 not-prose">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <span className="text-gray-800 font-medium">✓ {neighborhood}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Appliance Services in Murfreesboro, TN
            </h2>

            <p className="text-gray-700 mb-6">
              Our certified technicians repair all major appliances in Murfreesboro homes:
            </p>

            <div className="space-y-4 my-8">
              {[
                { name: 'Refrigerator Repair Murfreesboro', issues: 'Not cooling, ice maker issues, water leaks, strange noises' },
                { name: 'Dishwasher Repair Murfreesboro', issues: 'Not cleaning, not draining, door latch problems, water leaks' },
                { name: 'Washer Repair Murfreesboro', issues: 'Not spinning, not draining, loud noises, door won\'t open' },
                { name: 'Dryer Repair Murfreesboro', issues: 'Not heating, not turning, taking too long to dry' },
                { name: 'Oven/Stove Repair Murfreesboro', issues: 'Not heating, burner issues, igniter problems, temperature control' }
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">{service.name}</h3>
                  <p className="text-gray-600">Common issues: {service.issues}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Average Repair Costs in Murfreesboro
            </h2>

            <p className="text-gray-700 mb-6">
              We believe in transparent pricing. Here's what most Murfreesboro residents pay for appliance repairs:
            </p>

            <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 my-8 not-prose">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Diagnostic Fee</h4>
                  <p className="text-3xl font-extrabold text-blue-600 mb-2">$79</p>
                  <p className="text-sm text-gray-600">Launch special (regular $99)<br/>Waived if you approve repair</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Average Repair Costs</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Refrigerator: $150-$300</li>
                    <li>• Dishwasher: $120-$250</li>
                    <li>• Washer/Dryer: $130-$280</li>
                    <li>• Oven/Stove: $140-$320</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              What Makes Us Different?
            </h2>

            <p className="text-gray-700 mb-6">
              We're not your typical Murfreesboro appliance repair company. We've built a modern booking platform that puts you in control:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>No Phone Tag:</strong> Book online anytime, day or night. No waiting on hold.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>Confirmed Same Day:</strong> We call you the same day to confirm your appointment and answer questions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>Real-Time Updates:</strong> Get SMS updates when your tech is on the way.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>Upfront Pricing:</strong> Know what you'll pay before work begins. No surprise fees.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>Licensed & Insured:</strong> Tennessee state certified technicians with background checks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span><strong>90-Day Warranty:</strong> All repairs backed by our comprehensive parts and labor warranty.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Serving Murfreesboro & Surrounding Areas
            </h2>

            <p className="text-gray-700 mb-4">
              Based in Murfreesboro, we also proudly serve the greater Rutherford County area:
            </p>

            <div className="flex flex-wrap gap-3 my-6 not-prose">
              {['Smyrna', 'La Vergne', 'Eagleville', 'Christiana'].map((city, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Get Your Appliance Fixed?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 200+ happy Murfreesboro customers who chose the modern way to book appliance repair.
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
            Book Murfreesboro Appliance Repair
          </Button>
          <p className="mt-6 text-blue-200">
            Same-day service • $79 diagnostic • 90-day warranty
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 Boro Appliance Pros. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Serving Murfreesboro, Smyrna, La Vergne & Rutherford County, TN</p>
        </div>
      </footer>
    </div>
  );
};

export default MurfreesboroPage;
