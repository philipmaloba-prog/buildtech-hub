import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockProducts } from "../data/products";

const ProductDetails = () => {
    const { id } = useParams();
    const { dispatch } = useCart();
    const product = mockProducts.find((item) => item.id === Number(id));

    if (!product) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="fw-bold mb-3">Product Not Found</h2>
                <p className="text-muted mb-4">This product does not exist or was removed.</p>
                <Link to="/" className="btn btn-success">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-lg border-0 overflow-hidden">
                        <div className="row g-0">
                            <div className="col-md-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid h-100 w-100"
                                    style={{ objectFit: "cover", minHeight: "320px" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body p-4 p-lg-5 d-flex flex-column h-100">
                                    <h2 className="fw-bold mb-3">{product.name}</h2>
                                    <p className="text-muted mb-4">{product.description}</p>
                                    <h3 className="text-success fw-bold mb-4">KSh {product.price.toLocaleString()}</h3>
                                    <div className="mt-auto d-flex gap-2 flex-wrap">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
                                        >
                                            <i className="bi bi-cart-plus me-1"></i>Add to Cart
                                        </button>
                                        <Link to="/" className="btn btn-outline-secondary">
                                            <i className="bi bi-arrow-left me-1"></i>Back to Products
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
