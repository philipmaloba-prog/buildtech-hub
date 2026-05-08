import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
            <h2 className="mb-3">Your cart is empty</h2>
            <p className="lead text-muted mb-4">Start shopping from our products!</p>
            <Link to="/" className="btn btn-success btn-lg">
              <i className="bi bi-shop me-2"></i>Continue Shopping
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
            <i className="bi bi-basket3-fill text-success me-3"></i>
            Shopping Cart ({itemCount} items)
          </h1>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.id} className="row align-items-center border-bottom py-3">
              <div className="col-md-2">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: '80px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-4">
                <h5 className="fw-bold">{item.name}</h5>
                <p className="text-muted mb-1">{item.description}</p>
                <small className="badge bg-success">KSh {item.price.toLocaleString()}</small>
              </div>
              <div className="col-md-3">
                <div className="input-group w-75 mx-auto">
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="form-control text-center fw-bold" 
                    min="1"
                    value={item.quantity}
                    readOnly
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-md-2 text-end">
                <h5>KSh {(item.price * item.quantity).toLocaleString()}</h5>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
                    addNotification({
                      type: 'warning',
                      title: 'Item Removed',
                      message: `${item.name} was removed from your cart.`,
                    });
                  }}
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow sticky-top" style={{ top: '2rem' }}>
            <div className="card-body">
              <h4 className="card-title mb-3">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({itemCount}):</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-4 fw-bold">Total:</span>
                <span className="fs-3 fw-bold text-success">KSh {total.toLocaleString()}</span>
              </div>
              <button 
                className="btn btn-success w-100 mb-2 btn-lg"
                onClick={() => {
                  dispatch({ type: 'TOGGLE_PAYMENT' });
                  addNotification({
                    type: 'info',
                    title: 'Checkout Started',
                    message: 'Proceeding to M-Pesa payment.',
                  });
                  navigate('/mpesapayment');
                }}
                disabled={itemCount === 0}
              >
                <i className="bi bi-lock-fill me-2"></i>
                Proceed to M-Pesa Payment
              </button>
              <Link to="/" className="btn btn-outline-secondary w-100">
                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
              </Link>
              <button 
                className="btn btn-outline-danger w-100 mt-2"
                onClick={() => {
                  dispatch({ type: 'CLEAR_CART' });
                  addNotification({
                    type: 'warning',
                    title: 'Cart Cleared',
                    message: 'All items were removed from your cart.',
                  });
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
