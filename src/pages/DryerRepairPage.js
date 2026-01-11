import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

const DryerRepairPage = ({ onBookNow, onBack }) => {
  return <ServicePageTemplate onBookNow={onBookNow} onBack={onBack} serviceData={servicesData.dryer} />;
};

export default DryerRepairPage;
