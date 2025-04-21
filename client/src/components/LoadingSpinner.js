import React from 'react';
import './LoadingSpinner.css'; // Create this CSS file

const LoadingSpinner = ({ small }) => (
  <div className={`spinner-container ${small ? 'small' : ''}`}>
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingSpinner;