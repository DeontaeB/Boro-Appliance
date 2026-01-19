import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const navigate = useNavigate();

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onBookNow: () => navigate('/booking'),
        onBack: () => navigate('/'),
        onNavigate: (page) => navigate(`/${page}`),
        onApplianceSelect: (appliance) => navigate('/booking', { state: { appliance } }),
        onBookingComplete: (booking) => navigate('/confirmation', { state: { booking } }),
        onBackToHome: () => navigate('/')
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default PageWrapper;
