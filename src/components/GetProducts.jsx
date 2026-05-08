import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import { mockProducts } from "../data/products";
import SportsLoader from "./SportsLoader";

const GetProducts = () => {
    const { dispatch } = useCart();
    const { addNotification } = useNotifications();
    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get("search") || "").trim();
    const categories = useMemo(
        () => ["All", ...new Set(mockProducts.map((product) => product.category || "Sports"))],
        []
    );
    const maxCatalogPrice = useMemo(
        () => Math.max(...mockProducts.map((product) => product.price)),
        []
    );

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState("relevance");
    const [isFiltering, setIsFiltering] = useState(true);

    useEffect(() => {
        setMaxPrice(maxCatalogPrice);
    }, [maxCatalogPrice]);

    useEffect(() => {
        setIsFiltering(true);
        const timer = setTimeout(() => setIsFiltering(false), 420);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, maxPrice, minRating, inStockOnly, sortBy]);

    const searchRankedProducts = useMemo(() => {
        if (!searchQuery) {
            return mockProducts;
        }

        const query = searchQuery.toLowerCase();
        const tokens = query.split(/\s+/).filter(Boolean);

        const scored = mockProducts
            .map((product) => {
                const name = product.name.toLowerCase();
                const category = (product.category || "").toLowerCase();
                const description = product.description.toLowerCase();
                const benefit = (product.benefit || "").toLowerCase();
                const specs = (product.specs || []).join(" ").toLowerCase();
                const delivery = (product.delivery || "").toLowerCase();

                let score = 0;
                if (name === query) score += 120;
                if (name.startsWith(query)) score += 65;
                if (name.includes(query)) score += 40;
                if (category.includes(query)) score += 30;
                if (description.includes(query)) score += 20;
                if (benefit.includes(query)) score += 18;
                if (specs.includes(query)) score += 14;
                if (delivery.includes(query)) score += 10;

                tokens.forEach((token) => {
                    if (name.includes(token)) score += 22;
                    if (category.includes(token)) score += 15;
                    if (description.includes(token)) score += 10;
                    if (benefit.includes(token)) score += 8;
                    if (specs.includes(token)) score += 6;
                });

                return { product, score };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return (b.product.rating ?? 0) - (a.product.rating ?? 0);
            })
            .map((entry) => entry.product);

        return scored;
    }, [searchQuery]);

    const filteredProducts = useMemo(() => {
        const filtered = searchRankedProducts.filter((product) => {
            const matchesCategory =
                selectedCategory === "All" || (product.category || "Sports") === selectedCategory;
            const matchesPrice = product.price <= maxPrice;
            const matchesRating = (product.rating || 0) >= minRating;
            const matchesStock = !inStockOnly || /in stock/i.test(product.stockStatus || "");

            return matchesCategory && matchesPrice && matchesRating && matchesStock;
        });

        const withIndex = filtered.map((product, index) => ({ product, index }));

        withIndex.sort((a, b) => {
            if (sortBy === "price-asc") return a.product.price - b.product.price;
            if (sortBy === "price-desc") return b.product.price - a.product.price;
            if (sortBy === "rating-desc") return (b.product.rating || 0) - (a.product.rating || 0);
            return a.index - b.index;
        });

        return withIndex.map((entry) => entry.product);
    }, [inStockOnly, maxPrice, minRating, searchRankedProducts, selectedCategory, sortBy]);

    const clearFilters = () => {
        setSelectedCategory("All");
        setMaxPrice(maxCatalogPrice);
        setMinRating(0);
        setInStockOnly(false);
        setSortBy("relevance");
    };

    return (
        <div className="container mt-5 products-page">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 text-center fw-bold text-success mb-3 products-heading">KITPLUG Products</h1>
                    <p className="lead text-center text-muted products-subheading">
                        Gear up with elite sports equipment. Shop fast, train hard, and pay securely with M-Pesa.
                    </p>
                    {searchQuery && (
                        <div className="search-summary-chip mx-auto mt-3">
                            <span>
                                Smart results for <strong>"{searchQuery}"</strong> ({filteredProducts.length})
                            </span>
                            <Link to="/" className="search-summary-clear">Clear</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="product-filters card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-lg-2 col-md-6">
                            <label className="form-label fw-semibold mb-1">Category</label>
                            <select
                                className="form-select form-control-pro"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label className="form-label fw-semibold mb-1">
                                Max Price: KSh {maxPrice.toLocaleString()}
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                min="1000"
                                max={maxCatalogPrice}
                                step="500"
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(Number(event.target.value))}
                            />
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <label className="form-label fw-semibold mb-1">Min Rating</label>
                            <select
                                className="form-select form-control-pro"
                                value={minRating}
                                onChange={(event) => setMinRating(Number(event.target.value))}
                            >
                                <option value={0}>Any</option>
                                <option value={4}>4.0+</option>
                                <option value={4.5}>4.5+</option>
                                <option value={4.8}>4.8+</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <label className="form-label fw-semibold mb-1">Sort</label>
                            <select
                                className="form-select form-control-pro"
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Top Rated</option>
                            </select>
                        </div>
                        <div className="col-lg-1 col-md-6">
                            <div className="form-check product-stock-check pt-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="stockOnly"
                                    checked={inStockOnly}
                                    onChange={(event) => setInStockOnly(event.target.checked)}
                                />
                                <label className="form-check-label fw-semibold" htmlFor="stockOnly">
                                    In Stock
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 text-lg-end">
                            <button type="button" className="btn btn-outline-success w-100" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isFiltering ? (
                <div className="search-loading-shell">
                    <SportsLoader text="Loading your sports gear..." />
                </div>
            ) : (
            <div className="row g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm hover-shadow product-card">
                            <img 
                                src={product.image} 
                                className="card-img-top product-image" 
                                alt={product.name}
                                onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = "https://picsum.photos/seed/kitplug-fallback/1000/700";
                                }}
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
                                        onClick={() => {
                                            dispatch({ type: "ADD_ITEM", payload: product });
                                            addNotification({
                                                type: "success",
                                                title: "Added to Cart",
                                                message: `${product.name} is now in your cart.`,
                                            });
                                        }}
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
            )}
            {!isFiltering && searchQuery && filteredProducts.length === 0 && (
                <div className="search-empty-state text-center mt-4 p-4">
                    <h5 className="mb-2">No matching products found</h5>
                    <p className="mb-3">
                        Try broader words like <strong>football</strong>, <strong>training</strong>, or <strong>gloves</strong>.
                    </p>
                    <Link to="/" className="btn btn-outline-success btn-sm">Browse All Products</Link>
                </div>
            )}
        </div>
    );
};

export default GetProducts;
