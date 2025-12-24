import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminConfirmationPage from './pages/AdminConfirmationPage';
import PricingPage from './pages/PricingPage';
import HowItWorksPage from './pages/HowItWorksPage';

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
    </div>
  );
}

export default App;
