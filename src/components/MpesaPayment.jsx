import React, { useState } from "react";
import { useCart } from '../context/CartContext';
import { useNotifications } from "../context/NotificationContext";
import BuildLoader from "./BuildLoader";

const MpesaPayment = () => {

    const { cart } = useCart();

    useNotifications();

    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    const [phone, setPhone] = useState("");

    const [loading] = useState(false);

    const [status] = useState("");

    const handlePayment = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("phone", phone);

            formData.append("amount", total);

            const response = await fetch(
                "https://philipswala.alwaysdata.net/api/mpesa_payments",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            console.log(data);

            alert(data.ResponseDescription || data.message);

        } catch (error) {

            console.error(error);

            alert("Payment failed");
        }
    };

    return (
        <div className="container mt-5">

            <div
                className="card shadow-lg p-4 mx-auto"
                style={{ maxWidth: '500px' }}
            >

                <h2 className="text-success mb-4">
                    M-Pesa Payment
                </h2>

                {status && (
                    <div className="alert alert-info">
                        {status}
                    </div>
                )}

                <form onSubmit={handlePayment}>

                    <div className="mb-3">

                        <label className="form-label">
                            Phone Number (+254)
                        </label>

                        <input
                            type="tel"
                            className="form-control"
                            placeholder="7XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Total Amount: KSh {total.toLocaleString()}
                        </label>

                    </div>

                    <button
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {loading ? (
                            <BuildLoader text="Processing..." compact />
                        ) : (
                            "Pay Now"
                        )}

                    </button>

                </form>

            </div>

        </div>
    );
};

export default MpesaPayment;