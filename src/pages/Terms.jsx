import React from 'react';

const Terms = () => {
  return (
    <div className="container mt-5 text-light" style={{ padding: '20px' }}>
      <div className="card shadow-lg border-0 p-4 bg-dark text-white">
        <h2 className="mb-3 text-success">
          <i className="bi bi-file-earmark-text me-2"></i>Terms & Conditions
        </h2>
        <p>
          By purchasing from BuildTech Hub, you agree to our terms of service. All materials 
          ordered must be confirmed via our secured M-Pesa payment portal before delivery 
          dispatch.
        </p>
      </div>
    </div>
  );
};

export default Terms;