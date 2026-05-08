// src/components/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";

const ProductDetails = () => {
    const { id } = useParams();

    const { dispatch } = useCart();
    const { addNotification } = useNotifications();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://philipswala.alwaysdata.net/api/get_product_details")
            .then((res) => res.json())
            .then((data) => {

                const formattedProducts = data.map((product, index) => ({
                    id: product.product_id || index,

                    name: product.product_name || "Unnamed Product",

                    description:
                        product.product_description ||
                        "No description available.",

                    price: Number(product.product_cost || 0),

                    category:
                        product.product_category || "Construction Material",

                    image: product.product_photo
                        ? `https://philipswala.alwaysdata.net/static/images/${product.product_photo}`
                        : "https://picsum.photos/seed/construction/900/700",

                    stockStatus:
                        product.stock_status || "In Stock",

                    delivery:
                        product.delivery || "Available for delivery",

                    rating:
                        Number(product.rating || 4.5),

                    reviews:
                        Number(product.reviews || 12),

                    specs: product.specs || [
                        "High quality material",
                        "Durable construction",
                        "Suitable for all projects",
                    ],
                }));

                const foundProduct = formattedProducts.find(
                    (p) => Number(p.id) === Number(id)
                );
                console.log("found product",foundProduct)
               

                setItem(foundProduct || null);
            })
            .catch((error) => {
                console.error("Failed to fetch product:", error);
                setItem(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    // LOADING STATE
    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-success mb-3" />
                <h4>Loading product details...</h4>
            </div>
        );
    }

    // NOT FOUND
    if (!item) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="fw-bold mb-3">
                    Product Not Found
                </h2>

                <p className="text-muted">
                    This product may have been removed.
                </p>

                <Link
                    to="/"
                    className="btn btn-success mt-3"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-11">

                    <div className="card border-0 shadow-lg overflow-hidden">

                        <div className="row g-0">

                            {/* PRODUCT IMAGE */}
                            <div className="col-md-6">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid w-100 h-100"
                                    style={{
                                        objectFit: "cover",
                                        minHeight: "500px",
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://picsum.photos/seed/building/900/700";
                                    }}
                                />

                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className="col-md-6">

                                <div className="card-body p-4 d-flex flex-column h-100">

                                    {/* CATEGORY */}
                                    <span className="badge bg-secondary mb-3 w-auto">
                                        {item.category}
                                    </span>

                                    {/* TITLE */}
                                    <h1 className="fw-bold mb-3">
                                        {item.name}
                                    </h1>

                                    {/* DESCRIPTION */}
                                    <p className="text-muted fs-5">
                                        {item.description}
                                    </p>

                                    {/* RATING */}
                                    <div className="mb-3">
                                        <span className="text-warning fs-5">
                                            ⭐ {item.rating.toFixed(1)}
                                        </span>

                                        <span className="text-muted ms-2">
                                            ({item.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* STOCK */}
                                    <p className="mb-2">
                                        <strong>Status:</strong>{" "}
                                        <span className="text-success">
                                            {item.stockStatus}
                                        </span>
                                    </p>

                                    {/* DELIVERY */}
                                    <p className="mb-4">
                                        <strong>Delivery:</strong>{" "}
                                        {item.delivery}
                                    </p>

                                    {/* SPECIFICATIONS */}
                                    <div className="mb-4">

                                        <h5 className="fw-bold">
                                            Specifications
                                        </h5>

                                        <ul className="list-group list-group-flush">

                                            {Array.isArray(item.specs) &&
                                                 item.specs.map((spec, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item"
                                                >
                                                    ✅ {spec}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    {/* PRICE */}
                                    <h2 className="text-success fw-bold mb-4">
                                        KSh {item.price.toLocaleString()}
                                    </h2>

                                    {/* ACTION BUTTONS */}
                                    <div className="mt-auto d-flex gap-2 flex-wrap">

                                        <button
                                            className="btn btn-success btn-lg"
                                            onClick={() => {

                                                dispatch({
                                                    type: "ADD_ITEM",
                                                    payload: item,
                                                });

                                                addNotification({
                                                    type: "success",
                                                    title: "Added to Cart",
                                                    message:
                                                        `${item.name} added successfully`,
                                                });
                                            }}
                                        >
                                            🛒 Add to Cart
                                        </button>

                                        <Link
                                            to="/"
                                            className="btn btn-outline-secondary btn-lg"
                                        >
                                            ← Back to Products
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