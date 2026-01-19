import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Wrapper component to inject navigation props
const PageWithNav = ({ Component }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Component
      onBookNow={() => navigate('/booking')}
      onBack={() => navigate('/')}
      onNavigate={(page) => navigate(`/${page}`)}
      onApplianceSelect={(appliance) => navigate('/booking', { state: { appliance } })}
      onBookingComplete={(booking) => navigate('/confirmation', { state: { booking } })}
      onBackToHome={() => navigate('/')}
      booking={location.state?.booking}
      preSelectedAppliance={location.state?.appliance}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Loading...</div></div>}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<PageWithNav Component={LandingPage} />} />
            <Route path="/booking" element={<PageWithNav Component={BookingPage} />} />
            <Route path="/confirmation" element={<PageWithNav Component={ConfirmationPage} />} />
            <Route path="/admin" element={<PageWithNav Component={AdminConfirmationPage} />} />
            <Route path="/pricing" element={<PageWithNav Component={PricingPage} />} />
            <Route path="/how-it-works" element={<PageWithNav Component={HowItWorksPage} />} />

            {/* Location Pages */}
            <Route path="/murfreesboro" element={<PageWithNav Component={MurfreesboroPage} />} />
            <Route path="/smyrna" element={<PageWithNav Component={SmyrnaPage} />} />
            <Route path="/la-vergne" element={<PageWithNav Component={LaVergnePage} />} />
            <Route path="/eagleville" element={<PageWithNav Component={EaglevillePage} />} />
            <Route path="/christiana" element={<PageWithNav Component={ChristianaPage} />} />

            {/* Service Pages */}
            <Route path="/refrigerator-repair" element={<PageWithNav Component={RefrigeratorRepairPage} />} />
            <Route path="/dishwasher-repair" element={<PageWithNav Component={DishwasherRepairPage} />} />
            <Route path="/washer-repair" element={<PageWithNav Component={WasherRepairPage} />} />
            <Route path="/dryer-repair" element={<PageWithNav Component={DryerRepairPage} />} />
            <Route path="/oven-repair" element={<PageWithNav Component={OvenRepairPage} />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
