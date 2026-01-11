import React from 'react';
import SEO from './SEO';
import Button from './Button';

const ServicePageTemplate = ({ onBookNow, onBack, serviceData }) => {
  const { name, slug, icon, commonIssues, repairCostRange, troubleshootingTips, whenToCall, schema, seoTitle, seoDescription, seoKeywords } = serviceData;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`/${slug}`}
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
          <div className="text-7xl mb-6">{icon}</div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            {name} Repair in Murfreesboro, TN
          </h1>
          <p className="text-2xl mb-8 text-blue-50 max-w-3xl mx-auto">
            Fast, professional {name.toLowerCase()} repair. Book online in 60 seconds.
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
            Book {name} Repair Now
          </Button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-700 mb-8">
            When your {name.toLowerCase()} breaks down, you need fast, reliable service from local experts. Boro Appliance Pros provides
            professional {name.toLowerCase()} repair services throughout Murfreesboro, Smyrna, La Vergne, and all of Rutherford County, TN.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common {name} Problems We Fix</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {commonIssues.map((issue, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 flex items-start">
                <span className="text-red-500 font-bold mr-3">✗</span>
                <span className="text-gray-800">{issue}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-xl border-2 border-orange-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Is Your {name} Acting Up?</h3>
            <p className="text-gray-700 mb-4">
              Don't wait until it completely fails! Book a diagnostic appointment now for just $79 (launch special - regular $99).
              If you approve the repair, we waive the diagnostic fee completely.
            </p>
            <Button onClick={onBookNow} size="md">Book Diagnostic Now</Button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Average {name} Repair Costs</h2>

          <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Diagnostic Fee</h4>
                <p className="text-3xl font-extrabold text-blue-600 mb-2">$79</p>
                <p className="text-sm text-gray-600">Launch special (regular $99)<br/>Waived if you approve repair</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Typical Repair Cost</h4>
                <p className="text-3xl font-extrabold text-blue-600 mb-2">{repairCostRange}</p>
                <p className="text-sm text-gray-600">Parts + labor included<br/>90-day warranty on all repairs</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">DIY Troubleshooting Tips</h2>

          <p className="text-gray-700 mb-4">
            Before calling a pro, try these quick troubleshooting steps:
          </p>

          <div className="space-y-3 mb-8">
            {troubleshootingTips.map((tip, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800"><strong>{i + 1}.</strong> {tip}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Call a Professional</h2>

          <p className="text-gray-700 mb-4">
            You should call Boro Appliance Pros when:
          </p>

          <div className="space-y-3 mb-12">
            {whenToCall.map((reason, i) => (
              <div key={i} className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-gray-800">{reason}</span>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Long Does {name} Repair Take?</h2>

          <p className="text-gray-700 mb-8">
            Most {name.toLowerCase()} repairs are completed in a single visit, typically within 1-2 hours. Our technicians carry
            common parts on their trucks, so we can often fix your appliance the same day. If we need to order a specialized part,
            we'll give you an exact timeline and keep you updated via SMS.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Boro Appliance Pros for {name} Repair?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '⚡', title: 'Same-Day Service', desc: 'Most appointments within 24 hours' },
              { icon: '💰', title: 'Upfront Pricing', desc: 'Know costs before we start work' },
              { icon: '🛠️', title: 'Expert Technicians', desc: '10+ years average experience' },
              { icon: '🛡️', title: '90-Day Warranty', desc: 'Parts and labor guaranteed' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Areas</h2>

          <p className="text-gray-700 mb-4">
            We provide {name.toLowerCase()} repair services throughout Rutherford County, TN:
          </p>

          <div className="flex flex-wrap gap-3">
            {['Murfreesboro', 'Smyrna', 'La Vergne', 'Eagleville', 'Christiana'].map((city, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Fix Your {name}?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Book online in 60 seconds. Same-day service available.
          </p>
          <Button onClick={onBookNow} size="lg" variant="secondary" className="shadow-2xl">
            Book {name} Repair Now
          </Button>
          <p className="mt-6 text-blue-200">
            $79 diagnostic (waived with repair) • 90-day warranty • Licensed & insured
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 Boro Appliance Pros. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Serving Murfreesboro, Smyrna, La Vergne & Rutherford County, TN</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicePageTemplate;
