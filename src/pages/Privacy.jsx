import React from 'react';

const Privacy = () => {
  return (
    <div className="container mt-5 text-light" style={{ padding: '20px' }}>
      <div className="card shadow-lg border-0 p-4 bg-dark text-white">
        <h2 className="mb-3 text-success">
          <i className="bi bi-shield-lock me-2"></i>Privacy Policy
        </h2>
        <p>
          Your privacy is important to us. At BuildTech Hub, we ensure that your personal 
          information and transaction data via M-Pesa are encrypted and completely secure. 
          We do not share your data with third parties.
        </p>
      </div>
    </div>
  );
};

export default Privacy;