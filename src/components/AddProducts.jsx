import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCost, setProductCost] = useState("");
    const [productPhoto, setProductPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!productName || !productDescription || !productCost || !productPhoto) {
            setError("Please fill all fields and select a photo");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("productName", productName);
            data.append("productCost", productCost);
            data.append("productDescription", productDescription);
            data.append("productPhoto", productPhoto);

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.8) {
                        reject(new Error("Upload failed"));
                    } else {
                        resolve({ data: "success" });
                    }
                }, 2500);
            });

            setSuccess("Product uploaded successfully! Redirecting to home...");
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            setError(err.message || "Error uploading product, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-8">
                    <div className="card shadow-lg border-0 form-card">
                        <div className="card-body p-4 p-lg-5">
                            <h2 className="text-center mb-4 fw-bold">Upload Product</h2>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            {success && <div className="alert alert-success rounded-3">{success}</div>}
                            {loading && (
                                <div className="alert alert-info rounded-3">
                                    <i className="bi bi-upload spinner-border spinner-border-sm me-2"></i>
                                    Uploading product...
                                </div>
                            )}
                            <form onSubmit={submit} className="pro-form">
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-pro"
                                        placeholder="Enter product name"
                                        required
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control form-control-pro"
                                        rows="4"
                                        placeholder="Describe your product"
                                        required
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price (KSh)</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-pro"
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={productCost}
                                        onChange={(e) => setProductCost(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Product Photo</label>
                                    <input
                                        type="file"
                                        className="form-control form-control-pro"
                                        accept="image/*"
                                        required
                                        onChange={(e) => setProductPhoto(e.target.files[0])}
                                    />
                                    {productPhoto && (
                                        <small className="text-muted d-block mt-2">Selected: {productPhoto.name}</small>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-success w-100 btn-pro" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <i className="bi bi-upload spinner-border spinner-border-sm me-2"></i>
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Product"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
