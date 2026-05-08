import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderHistory = () => {
  const { orders } = useCart();

  if (!orders || orders.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <i className="bi bi-receipt-cutoff display-1 text-muted mb-4"></i>
            <h2 className="mb-3">No Orders Yet</h2>
            <p className="lead text-muted mb-4">
              Your completed purchases will appear here once payment is successful.
            </p>
            <Link to="/" className="btn btn-success btn-lg">
              <i className="bi bi-shop me-2"></i>Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="display-5 fw-bold mb-4">
            <i className="bi bi-clock-history text-success me-2"></i>
            Order History
          </h1>
        </div>
      </div>

      <div className="row g-4">
        {orders.map((order) => (
          <div key={order.id} className="col-12">
            <div className="card shadow-sm border-0 form-card">
              <div className="card-body text-start">
                <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                  <div>
                    <h5 className="mb-1 fw-bold">{order.id}</h5>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success mb-2 d-inline-block">{order.status}</span>
                    <p className="mb-0 text-muted small">Phone: {order.phone}</p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={`${order.id}-${item.id}`}>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">KSh {item.price.toLocaleString()}</td>
                          <td className="text-end">
                            KSh {(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <span className="text-muted">Payment: {order.paymentMethod}</span>
                  <strong className="text-success">Total: KSh {order.total.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
