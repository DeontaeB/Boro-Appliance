import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

const OvenRepairPage = ({ onBookNow, onBack }) => {
  return <ServicePageTemplate onBookNow={onBookNow} onBack={onBack} serviceData={servicesData.oven} />;
};

export default OvenRepairPage;
