import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SportsLoader from "./SportsLoader";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !phone || !password) {
            setError("Please fill all fields");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSuccess("Account created successfully! Redirecting to signin...");
        setTimeout(() => {
            navigate("/signin");
        }, 1500);
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 form-card">
                        <div className="card-body p-4 p-lg-5">
                            <h2 className="text-center mb-4 fw-bold">Create Account</h2>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            {success && <div className="alert alert-success rounded-3">{success}</div>}
                            {loading && (
                                <div className="alert alert-info rounded-3">
                                    <SportsLoader text="Creating account..." compact />
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="pro-form">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-pro"
                                        placeholder="Enter your username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-pro"
                                        placeholder="Enter your email address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-pro"
                                        placeholder="Enter your phone number"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-pro"
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100 btn-pro" disabled={loading}>
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </button>
                            </form>
                            <p className="text-center mt-4 mb-0 text-muted">
                                Already have an account? <Link to="/signin">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
