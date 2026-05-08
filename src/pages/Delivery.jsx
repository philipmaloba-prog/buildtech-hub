import React from "react";

const Delivery = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4">
        <h2 className="text-info mb-3">
          <i className="bi bi-truck me-2"></i>Delivery Information
        </h2>

        <p>
          We offer reliable and timely delivery services across Kenya.
        </p>

        <ul>
          <li>Delivery within Nairobi: 1–2 days</li>
          <li>Outside Nairobi: 2–5 days</li>
          <li>Delivery charges vary by location</li>
        </ul>

        <p className="mt-3">
          Our team will contact you after order confirmation to arrange delivery.
        </p>
      </div>
    </div>
  );
};

export default Delivery;