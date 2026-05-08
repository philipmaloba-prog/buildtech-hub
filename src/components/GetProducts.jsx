import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockProducts } from "../data/products";

const GetProducts = () => {
    const { dispatch } = useCart();

    return (
        <div className="container mt-5 products-page">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 text-center fw-bold text-success mb-3 products-heading">KITPLUG Products</h1>
                    <p className="lead text-center text-muted products-subheading">
                        Gear up with elite sports equipment. Shop fast, train hard, and pay securely with M-Pesa.
                    </p>
                </div>
            </div>
            <div className="row g-4">
                {mockProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm hover-shadow product-card">
                            <img 
                                src={product.image} 
                                className="card-img-top product-image" 
                                alt={product.name}
                            />
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="product-category-badge">{product.category || "Sports"}</span>
                                    <span className="product-rating">
                                        <i className="bi bi-star-fill me-1"></i>
                                        {(product.rating ?? 4.7).toFixed(1)} • {product.reviews ?? 0}
                                    </span>
                                </div>
                                <h5 className="card-title fw-bold product-title">{product.name}</h5>
                                <p className="card-text flex-grow-1 product-desc">{product.description}</p>
                                {product.benefit && (
                                    <p className="product-benefit mb-2">
                                        <i className="bi bi-lightning-charge-fill me-1"></i>
                                        {product.benefit}
                                    </p>
                                )}
                                <div className="product-specs mb-3">
                                    {(product.specs || []).slice(0, 2).map((spec) => (
                                        <span key={spec} className="product-spec-chip">{spec}</span>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="product-trust-signal">
                                        <i className="bi bi-patch-check-fill me-1"></i>
                                        {product.stockStatus || "In Stock"}
                                    </span>
                                    <span className="product-delivery">{product.delivery || "Fast Delivery"}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center gap-2 mt-auto">
                                    <div className="text-start">
                                        <h4 className="text-success mb-0 product-price">KSh {product.price.toLocaleString()}</h4>
                                        {product.oldPrice && (
                                            <small className="product-old-price">Was KSh {product.oldPrice.toLocaleString()}</small>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-success btn-sm btn-pro"
                                        onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
                                    >
                                        <i className="bi bi-cart-plus me-1"></i>Add to Cart
                                    </button>
                                </div>
                                <Link to={`/product/${product.id}`} className="btn btn-outline-secondary btn-sm mt-3 product-details-btn">
                                    <i className="bi bi-eye me-1"></i>View Product Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-5">
                <a href="/addproduct" className="btn btn-outline-primary btn-lg product-cta-btn">
                    <i className="bi bi-plus-circle me-2"></i>Sell Your Product
                </a>
            </div>
        </div>
    );
};

export default GetProducts;
