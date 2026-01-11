import React from 'react';
import SEO from '../components/SEO';
import Button from '../components/Button';

const ChristianaPage = ({ onBookNow, onBack }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Boro Appliance Pros - Christiana Location",
    "image": "https://boroappliancepros.com/logo.png",
    "description": "Professional appliance repair service in Christiana, TN. Same-day service available. Licensed & insured.",
    "@id": "https://boroappliancepros.com/christiana",
    "url": "https://boroappliancepros.com/christiana",
    "telephone": "(615) 379-9576",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Christiana",
      "addressRegion": "TN",
      "addressCountry": "US",
      "postalCode": "37037"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7111,
      "longitude": -86.3989
    },
    "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-17:00",
    "areaServed": {
      "@type": "City",
      "name": "Christiana",
      "containedInPlace": "Rutherford County, TN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Appliance Repair Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refrigerator Repair Christiana" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dishwasher Repair Christiana" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Washer Repair Christiana" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dryer Repair Christiana" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oven Repair Christiana" } }
      ]
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "200" }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Appliance Repair Christiana TN | Same-Day Service | Boro Appliance Pros"
        description="Appliance repair in Christiana, TN. Book online in 60 seconds. Same-day service available. $79 diagnostic (waived with repair). Licensed & insured."
        keywords="appliance repair christiana, appliance repair christiana tn, christiana appliance repair, refrigerator repair christiana, dishwasher repair christiana"
        canonical="/christiana"
        schema={schema}
      />

      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={onBack} className="text-2xl font-bold text-primary hover:text-blue-700 transition">
              Boro Appliance Pros
            </button>
            <Button onClick={onBookNow} size="md">Book Now</Button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Appliance Repair in Christiana, TN</h1>
          <p className="text-2xl mb-8 text-blue-50 max-w-3xl mx-auto">
            Fast, reliable appliance repair for Christiana residents. Book online in 60 seconds.
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
            Book Christiana Repair Now
          </Button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-700 mb-8">
            Christiana homeowners trust Boro Appliance Pros for fast, reliable appliance repair services. We bring modern convenience
            and transparent pricing to Christiana, TN with online booking and same-day service availability.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Boro Appliance Pros for Christiana Appliance Repair?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '📱', title: 'Book Online in 60 Seconds', desc: 'No phone calls needed. Book anytime from anywhere.' },
              { icon: '⚡', title: 'Same-Day Service', desc: 'Fast response times. Most appointments within 24 hours.' },
              { icon: '💰', title: '$79 Diagnostic Fee', desc: 'Launch special pricing. Waived if you approve the repair.' },
              { icon: '🛡️', title: '90-Day Warranty', desc: 'All repairs backed by our comprehensive warranty.' }
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Appliance Services in Christiana, TN</h2>

          <div className="space-y-4 mb-12">
            {[
              { name: 'Refrigerator Repair Christiana', issues: 'Not cooling, ice maker issues, water leaks' },
              { name: 'Dishwasher Repair Christiana', issues: 'Not cleaning, not draining, water leaks' },
              { name: 'Washer Repair Christiana', issues: 'Not spinning, not draining, loud noises' },
              { name: 'Dryer Repair Christiana', issues: 'Not heating, taking too long to dry' },
              { name: 'Oven/Stove Repair Christiana', issues: 'Not heating, igniter problems' }
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">{service.name}</h3>
                <p className="text-gray-600">Common issues: {service.issues}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Average Repair Costs in Christiana</h2>

          <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
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

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Also Serving Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Murfreesboro', 'Smyrna', 'La Vergne', 'Eagleville'].map((city, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Get Your Appliance Fixed?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 200+ happy Christiana customers who chose the modern way to book appliance repair.
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
            Book Christiana Appliance Repair
          </Button>
          <p className="mt-6 text-blue-200">Same-day service • $79 diagnostic • 90-day warranty</p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 Boro Appliance Pros. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Serving Christiana, Murfreesboro, Smyrna & Rutherford County, TN</p>
        </div>
      </footer>
    </div>
  );
};

export default ChristianaPage;
