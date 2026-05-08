import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; // Restored useSearchParams
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import { Products as fallbackProducts } from "../data/products";
import BuildLoader from "./BuildLoader";

const GetProducts = () => {
    const { dispatch } = useCart();
    const { addNotification } = useNotifications();  
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(0);    
    const [sortBy, setSortBy] = useState("relevance");

    // Get Search Term from URL 
    const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();

    // FETCH
    useEffect(() => {
        fetch("https://philipswala.alwaysdata.net/api/get_product_details")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((item, i) => ({
                    id: item.product_id || i,
                    name: item.product_name,
                    description: item.product_description || "",
                    price: Number(item.product_cost || 0),
                    category: "Construction",
                    image: item.product_photo
                    ? `https://philipswala.alwaysdata.net/static/images/${item.product_photo}`
                    : "https://via.placeholder.com/300x200"
                    }));
                setProducts(formatted);
            })
            .catch(() => setProducts(fallbackProducts))
            .finally(() => setLoading(false));
    }, []);

    const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                                 p.description.toLowerCase().includes(searchTerm);
            const matchesCategory = (selectedCategory === "All" || p.category === selectedCategory);
            const matchesPrice = p.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, selectedCategory, maxPrice, searchTerm]);

    useEffect(() => {
        if (products.length > 0) {
            setMaxPrice(Math.max(...products.map(p => p.price || 0), 0));
        }
    }, [products]);

    return (
        <div className="container mt-5">

            {/* TITLE */}
            <h1 className="text-center fw-bold text-light mb-4">
                🏗️ Construction Materials & Tools
            </h1>

            {/* FILTERS (GLASS) */}
            <div className="glass p-3 mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <select
                            className="form-control glass-input"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <input
                            type="range"
                            min="0"
                            max={Math.max(...products.map(p => p.price), 1000)}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-100"
                        />
                        <small className="text-light">Max: KSh {maxPrice}</small>
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-control glass-input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price-asc">Cheap First</option>
                            <option value="price-desc">Expensive First</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <button
                            onClick={() => {
                                setSelectedCategory("All");
                                setMaxPrice(Math.max(...products.map(p => p.price), 0));
                            }}
                            className="btn btn-outline-light w-100"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* PRODUCTS */}
            {loading ? (
                <BuildLoader text="🚧 Loading materials..." />
            ) : (
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="glass-card">
                               <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-img"
                                    style={{
                                        width: "100%",
                                        height: "250px",
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        padding: "10px",
                                        borderTopLeftRadius: "20px",
                                        borderTopRightRadius: "20px",
                                    }}
                                />

                                <div className="p-3">
                                    <h5 className="text-light">{product.name}</h5>
                                    <p className="text-light small">{product.description}</p>

                                    <strong className="text-warning">
                                        KSh {product.price}
                                    </strong>

                                    <button
                                        className="btn btn-success w-100 mt-2"
                                        onClick={() => {
                                            dispatch({ type: "ADD_ITEM", payload: product });
                                            addNotification({
                                                type: "success",
                                                title: "Added",
                                                message: `${product.name} added to cart`,
                                            });
                                        }}
                                    >
                                        🛒 Add to Cart
                                    </button>

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="btn btn-outline-light w-100 mt-2"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && !loading && (
                        <div className="col-12 text-center text-light mt-5">
                            <h4>No products found matching "{searchTerm}"</h4>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetProducts;