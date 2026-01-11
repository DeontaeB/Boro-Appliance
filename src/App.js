import React, { useState, lazy, Suspense } from 'react';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminConfirmationPage from './pages/AdminConfirmationPage';
import PricingPage from './pages/PricingPage';
import HowItWorksPage from './pages/HowItWorksPage';

// Lazy load location pages for better performance
const MurfreesboroPage = lazy(() => import('./pages/MurfreesboroPage'));
const SmyrnaPage = lazy(() => import('./pages/SmyrnaPage'));
const LaVergnePage = lazy(() => import('./pages/LaVergnePage'));
const EaglevillePage = lazy(() => import('./pages/EaglevillePage'));
const ChristianaPage = lazy(() => import('./pages/ChristianaPage'));

// Lazy load service pages
const RefrigeratorRepairPage = lazy(() => import('./pages/RefrigeratorRepairPage'));
const DishwasherRepairPage = lazy(() => import('./pages/DishwasherRepairPage'));
const WasherRepairPage = lazy(() => import('./pages/WasherRepairPage'));
const DryerRepairPage = lazy(() => import('./pages/DryerRepairPage'));
const OvenRepairPage = lazy(() => import('./pages/OvenRepairPage'));

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [selectedAppliance, setSelectedAppliance] = useState(null);

  const navigateTo = (page, appliance = null) => {
    setCurrentPage(page);
    if (appliance) {
      setSelectedAppliance(appliance);
    }
    window.scrollTo(0, 0);
  };

  // Check URL hash for admin access
  React.useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);

  const handleBookingComplete = (booking) => {
    setConfirmedBooking(booking);
    navigateTo('confirmation');
  };

  const handleBackToHome = () => {
    setConfirmedBooking(null);
    navigateTo('landing');
  };

  return (
    <div className="App">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Loading...</div></div>}>
        {currentPage === 'landing' && (
          <LandingPage
            onBookNow={() => navigateTo('booking')}
            onApplianceSelect={(appliance) => navigateTo('booking', appliance)}
            onNavigate={(page) => navigateTo(page)}
          />
        )}
        {currentPage === 'booking' && (
          <BookingPage
            onBack={() => navigateTo('landing')}
            onBookingComplete={handleBookingComplete}
            preSelectedAppliance={selectedAppliance}
          />
        )}
        {currentPage === 'confirmation' && (
          <ConfirmationPage
            booking={confirmedBooking}
            onBackToHome={handleBackToHome}
          />
        )}
        {currentPage === 'admin' && (
          <AdminConfirmationPage onBack={() => navigateTo('landing')} />
        )}
        {currentPage === 'pricing' && (
          <PricingPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'how-it-works' && (
          <HowItWorksPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}

        {/* Location Pages */}
        {currentPage === 'murfreesboro' && (
          <MurfreesboroPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'smyrna' && (
          <SmyrnaPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'la-vergne' && (
          <LaVergnePage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'eagleville' && (
          <EaglevillePage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'christiana' && (
          <ChristianaPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}

        {/* Service Pages */}
        {currentPage === 'refrigerator-repair' && (
          <RefrigeratorRepairPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'dishwasher-repair' && (
          <DishwasherRepairPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'washer-repair' && (
          <WasherRepairPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'dryer-repair' && (
          <DryerRepairPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
        {currentPage === 'oven-repair' && (
          <OvenRepairPage
            onBack={() => navigateTo('landing')}
            onBookNow={() => navigateTo('booking')}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
