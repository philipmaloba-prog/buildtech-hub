import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill email and password");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (email === "demo@kitplug.com" && password === "demo123") {
            setSuccess("Login successful! Welcome to KITPLUG.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            setError("Invalid credentials. Try demo@kitplug.com / demo123");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 form-card">
                        <div className="card-body p-4 p-lg-5">
                            <h2 className="text-center mb-4 fw-bold">Sign In</h2>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            {success && <div className="alert alert-success rounded-3">{success}</div>}
                            {loading && <div className="alert alert-info rounded-3">Signing in...</div>}
                            <form onSubmit={handleSubmit} className="pro-form">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-pro"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-pro"
                                        placeholder="Enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success w-100 btn-pro"
                                    disabled={loading}
                                >
                                    {loading ? "Signing In..." : "Sign In"}
                                </button>
                            </form>
                            <p className="text-center mt-4 mb-0 text-muted">
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
