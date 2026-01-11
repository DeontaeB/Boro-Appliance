import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

const WasherRepairPage = ({ onBookNow, onBack }) => {
  return <ServicePageTemplate onBookNow={onBookNow} onBack={onBack} serviceData={servicesData.washer} />;
};

export default WasherRepairPage;
