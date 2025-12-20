import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
