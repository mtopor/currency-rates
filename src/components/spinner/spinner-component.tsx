import React from 'react';
// import './spinner-component.css';

const SpinnerComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
    <div className="lds-dual-ring" />
  </div>
);

export default SpinnerComponent;
