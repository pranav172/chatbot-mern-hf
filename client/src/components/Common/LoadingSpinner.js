import React from 'react';
import './LoadingSpinner.css'; // Make sure this import is here

const LoadingSpinner = ({ small }) => (
  <div className={`spinner-container ${small ? 'small' : ''}`}>
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingSpinner;