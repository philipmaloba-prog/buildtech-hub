import React from "react";

const MpesaSecure = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4">
        <h2 className="text-success mb-3">
          <i className="bi bi-phone me-2"></i>M-Pesa Secure Payments
        </h2>

        <p>
          All payments on BuildTech Hub are processed securely via M-Pesa STK Push.
        </p>

        <ul>
          <li>✔ You receive a prompt on your phone</li>
          <li>✔ Enter your PIN securely on your device</li>
          <li>✔ We never store your PIN or sensitive data</li>
        </ul>

        <p className="mt-3">
          Payments are only confirmed after Safaricom verification, ensuring 
          maximum security for every transaction.
        </p>
      </div>
    </div>
  );
};

export default MpesaSecure;