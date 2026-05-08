import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

const MpesaPayment = () => {
    const { cart, dispatch } = useCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const [amount] = useState(total.toLocaleString());
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        const numAmount = parseFloat(amount.replace(/,/g, ''));
        if (!amount || !phone || numAmount < 10) {
            setStatus("Amount must be at least KSh 10 and phone required");
            return;
        }

        setLoading(true);
        setStatus("");

        // Mock M-Pesa STK Push simulation
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Simulate success (90% chance)
        if (Math.random() > 0.1) {
            setStatus("Payment successful! STK Push sent to " + phone + ". Check M-Pesa.");
            dispatch({ type: 'CLEAR_CART' });
            dispatch({ type: 'TOGGLE_PAYMENT' });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            setStatus("Payment failed. Insufficient balance or timeout.");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 form-card">
                        <div className="card-header bg-success text-white text-center">
                            <h2 className="mb-0">
                                <i className="bi bi-phone-vibrate me-2"></i>
                                M-Pesa Payment
                            </h2>
                        </div>
                        <div className="card-body p-4">
                            <p className="text-center text-muted mb-4">
                                Secure payment via Safaricom M-Pesa. Enter details to receive STK Push.
                            </p>
                            {status && (
                                <div className={`alert ${status.includes("successful") ? "alert-success" : "alert-danger"}`}>
                                    {status}
                                </div>
                            )}
                            {loading && (
                                <div className="alert alert-info">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-credit-card spinner-border spinner-border-sm me-2"></i>
                                        <span>Processing payment...</span>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handlePayment} className="pro-form">
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text">+254</span>
                                        <input 
                                            type="tel" 
                                            className="form-control form-control-pro" 
                                            placeholder="7xxxxxxxx" 
                                            pattern="[0-9]{9}"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g,'').slice(-9))} 
                                        />
                                    </div>
                                    <small className="text-muted">Cart total: KSh {total.toLocaleString()}</small>
                                    <small className="text-muted">Enter 9 digits (e.g., 712345678)</small>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Amount (KSh)</label>
                                    <input 
                                        type="number" 
                                        className="form-control form-control-pro" 
                                        placeholder="Cart total" 
                                        min="10"
                                        step="1"
                                        required 
                                        value={amount} 
                                        readOnly 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-success w-100 btn-lg btn-pro" 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <i className="bi bi-arrow-repeat spinner-border spinner-border-sm me-2"></i>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-lock-fill me-2"></i>
                                            Pay Now with M-Pesa
                                        </>
                                    )}
                                </button>
                            </form>
                            <div className="text-center mt-3 p-3 bg-light rounded">
                                <small className="text-muted">
                                    <i className="bi bi-shield-check me-1"></i>
                                    Demo Mode - Simulates real M-Pesa STK Push
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MpesaPayment;
