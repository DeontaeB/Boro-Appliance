import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminConfirmationPage from './pages/AdminConfirmationPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
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
        <LandingPage onBookNow={() => navigateTo('booking')} />
      )}
      {currentPage === 'booking' && (
        <BookingPage
          onBack={() => navigateTo('landing')}
          onBookingComplete={handleBookingComplete}
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
    </div>
  );
}

export default App;
