import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

const RefrigeratorRepairPage = ({ onBookNow, onBack }) => {
  return <ServicePageTemplate onBookNow={onBookNow} onBack={onBack} serviceData={servicesData.refrigerator} />;
};

export default RefrigeratorRepairPage;
