import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

const DishwasherRepairPage = ({ onBookNow, onBack }) => {
  return <ServicePageTemplate onBookNow={onBookNow} onBack={onBack} serviceData={servicesData.dishwasher} />;
};

export default DishwasherRepairPage;
