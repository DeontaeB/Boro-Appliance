import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Boro Appliance Pros</h3>
            <p className="text-gray-400 text-sm mb-4">
              Modern appliance repair serving Rutherford County, TN.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Phone:</strong> (615) 379-9576
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Email:</strong> contact@boroappliancepros.com
            </p>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('murfreesboro')}
                  className="hover:text-white transition"
                >
                  Murfreesboro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('smyrna')}
                  className="hover:text-white transition"
                >
                  Smyrna
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('la-vergne')}
                  className="hover:text-white transition"
                >
                  La Vergne
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('eagleville')}
                  className="hover:text-white transition"
                >
                  Eagleville
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('christiana')}
                  className="hover:text-white transition"
                >
                  Christiana
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('refrigerator-repair')}
                  className="hover:text-white transition"
                >
                  Refrigerator Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('dishwasher-repair')}
                  className="hover:text-white transition"
                >
                  Dishwasher Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('washer-repair')}
                  className="hover:text-white transition"
                >
                  Washer Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('dryer-repair')}
                  className="hover:text-white transition"
                >
                  Dryer Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('oven-repair')}
                  className="hover:text-white transition"
                >
                  Oven Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('landing')}
                  className="hover:text-white transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('how-it-works')}
                  className="hover:text-white transition"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('pricing')}
                  className="hover:text-white transition"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('booking')}
                  className="hover:text-white transition"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; 2025 Boro Appliance Pros. All rights reserved.</p>
          <p>
            Serving Murfreesboro, Smyrna, La Vergne, Eagleville, Christiana & all of Rutherford County, TN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
