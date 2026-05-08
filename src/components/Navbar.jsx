import React, { useEffect, useMemo, useState } from 'react';
import {
    NavLink,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { Products as fallbackProducts } from '../data/products';
import { useNotifications } from '../context/NotificationContext';

const Navbar = ({ darkMode, onToggleDarkMode }) => {

    const { cart } = useCart();

    const {
        notifications,
        unreadCount,
        markAllAsRead,
        removeNotification
    } = useNotifications();

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [showSuggestions, setShowSuggestions] = useState(false);

    const [showNotifications, setShowNotifications] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    // CART COUNT
    const itemCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // ACTIVE LINK STYLE
    const linkClass = ({ isActive }) =>
        isActive
            ? 'nav-link fw-semibold text-success'
            : 'nav-link text-light';

    // FETCH PRODUCTS
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await fetch(
                    "https://philipswala.alwaysdata.net/api/get_product_details"
                );

                if (!res.ok)
                    throw new Error("API failed");

                const data = await res.json();

                const formatted = data.map((item) => ({

                    id: Number(item.product_id),

                    name:
                        item.product_name ||
                        "Unnamed Product",

                    description:
                        item.product_description ||
                        "",

                    image:
                        item.product_photo
                            ? `https://philipswala.alwaysdata.net/static/images/${item.product_photo}`
                            : "https://via.placeholder.com/100",

                    price:
                        Number(item.product_cost || 0),

                    category:
                        item.product_category ||
                        "Construction"

                }));

                setProducts(formatted);

            } catch (err) {

                console.error(
                    "Navbar API failed",
                    err
                );

                setProducts(fallbackProducts);

            }
        };

        fetchProducts();

    }, []);

    // SEARCH SUBMIT
    const handleSearchSubmit = (e) => {

        e.preventDefault();

        const query = searchTerm.trim();

        setShowSuggestions(false);

        navigate(
            query
                ? `/?search=${encodeURIComponent(query)}`
                : '/'
        );
    };

    // URL SEARCH SYNC
    useEffect(() => {

        if (location.pathname !== '/')
            return;

        const searchQuery =
            new URLSearchParams(location.search)
                .get('search') || '';

        setSearchTerm(searchQuery);

    }, [location.pathname, location.search]);

    // LIVE SUGGESTIONS
    const suggestions = useMemo(() => {

        const query =
            searchTerm.trim().toLowerCase();

        if (query.length < 1)
            return [];

        return products

            .filter((p) =>
                p.name
                    ?.toLowerCase()
                    .includes(query)
            )

            .slice(0, 6);

    }, [searchTerm, products]);

    return (

        <nav className="navbar navbar-expand-lg sticky-top glass-navbar">

            <div className="container">

                {/* BRAND */}
                <NavLink
                    to="/"
                    className="navbar-brand fw-bold text-light"
                >
                    🏗️ BuildTech
                    <span className="text-success">
                        Hub
                    </span>
                </NavLink>

                {/* MOBILE TOGGLE */}
                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >

                    {/* MENU */}
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item dropdown">

                            <button
                                className="nav-link dropdown-toggle btn btn-link text-light"
                                data-bs-toggle="dropdown"
                            >
                                Menu
                            </button>

                            <ul className="dropdown-menu glass border-0">

                                <li>
                                    <NavLink
                                        to="/"
                                        className="dropdown-item"
                                    >
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin"
                                        className="dropdown-item"
                                    >
                                        Admin Panel
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/signin"
                                        className="dropdown-item"
                                    >
                                        Sign In
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/signup"
                                        className="dropdown-item"
                                    >
                                        Sign Up
                                    </NavLink>
                                </li>

                            </ul>

                        </li>

                    </ul>

                    {/* SEARCH */}
                    <form
                        className="position-relative mx-lg-4"
                        onSubmit={handleSearchSubmit}
                    >

                        <div
                            className="d-flex align-items-center"
                            style={{
                                gap: "10px",
                                position: "relative",
                            }}
                        >

                            {/* INPUT */}
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search cement, steel, tools..."
                                value={searchTerm}
                                onFocus={() =>
                                    setShowSuggestions(true)
                                }
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowSuggestions(false),
                                        150
                                    )
                                }
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                style={{
                                    minWidth: "340px",
                                    height: "46px",
                                    borderRadius: "12px",
                                    border: "none",
                                    padding: "0 18px",
                                    background: "rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(10px)",
                                    color: "white",
                                }}
                            />

                            {/* BUTTON */}
                            <button
                                className="btn btn-success"
                                style={{
                                    height: "46px",
                                    borderRadius: "12px",
                                    padding: "0 22px",
                                    whiteSpace: "nowrap",
                                    fontWeight: "600",
                                }}
                            >
                                Search
                            </button>

                            {/* SUGGESTIONS */}
                            {showSuggestions &&
                                suggestions.length > 0 && (

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "58px",
                                            left: "0",
                                            width: "340px",
                                            background: "#fff",
                                            borderRadius: "14px",
                                            overflow: "hidden",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                            zIndex: 999,
                                        }}
                                    >

                                        {suggestions.map((p) => (

                                            <button
                                                key={p.id}
                                                type="button"
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() => {

                                                    setSearchTerm('');

                                                    setShowSuggestions(false);

                                                    navigate(`/product/${p.id}`);

                                                }}
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    background: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "12px",
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                }}
                                            >

                                                {/* IMAGE */}
                                                <img
                                                    src={p.image}
                                                    alt={p.name}
                                                    style={{
                                                        width: "55px",
                                                        height: "55px",
                                                        objectFit: "contain",
                                                        background: "#fff",
                                                        borderRadius: "10px",
                                                        padding: "5px",
                                                    }}
                                                />

                                                {/* INFO */}
                                                <div
                                                    style={{
                                                        textAlign: "left",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            fontWeight: "600",
                                                            color: "#222",
                                                        }}
                                                    >
                                                        {p.name}
                                                    </div>

                                                    <small
                                                        style={{
                                                            color: "#666",
                                                        }}
                                                    >
                                                        KSh {p.price}
                                                    </small>

                                                </div>

                                            </button>

                                        ))}

                                    </div>

                                )}

                        </div>

                    </form>

                    {/* RIGHT SECTION */}
                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* CART */}
                        <li className="nav-item position-relative">

                            <NavLink
                                to="/cart"
                                className={linkClass}
                            >
                                🛒

                                {itemCount > 0 && (

                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                        {itemCount}
                                    </span>

                                )}

                            </NavLink>

                        </li>

                        {/* ADMIN */}
                        <li className="nav-item">

                            <NavLink
                                to="/admin"
                                className={linkClass}
                            >
                                ⚙️
                            </NavLink>

                        </li>

                        {/* ORDERS */}
                        <li className="nav-item">

                            <NavLink
                                to="/orders"
                                className={linkClass}
                            >
                                🧾
                            </NavLink>

                        </li>

                        {/* DARK MODE */}
                        <li className="nav-item ms-2">

                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={onToggleDarkMode}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>

                        </li>

                        {/* NOTIFICATIONS */}
                        <li className="nav-item position-relative">

                            <button
                                className="btn nav-link text-light"
                                onClick={() =>
                                    setShowNotifications(p => !p)
                                }
                            >
                                🔔

                                {unreadCount > 0 && (

                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                        {unreadCount}
                                    </span>

                                )}

                            </button>

                            {showNotifications && (

                                <div className="notifications-box">

                                    <div className="d-flex justify-content-between mb-2">

                                        <strong>
                                            Notifications
                                        </strong>

                                        <button
                                            onClick={markAllAsRead}
                                            className="btn btn-sm btn-link"
                                        >
                                            Mark all
                                        </button>

                                    </div>

                                    {notifications.length === 0 ? (

                                        <p>No notifications</p>

                                    ) : (

                                        notifications.map((n) => (

                                            <div
                                                key={n.id}
                                                className="mb-2"
                                            >

                                                <strong>
                                                    {n.title}
                                                </strong>

                                                <p>
                                                    {n.message}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        removeNotification(n.id)
                                                    }
                                                >
                                                    ❌
                                                </button>

                                            </div>

                                        ))

                                    )}

                                </div>

                            )}

                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;