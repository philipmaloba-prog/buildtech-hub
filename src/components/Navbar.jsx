import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/products';
import { useNotifications } from '../context/NotificationContext';

const Navbar = ({ darkMode, onToggleDarkMode }) => {
    const { cart } = useCart();
    const { notifications, unreadCount, markAllAsRead, markNotificationAsRead, removeNotification } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const linkClass = ({ isActive }) =>
        isActive 
            ? 'nav-link sports-nav-link active fw-semibold text-success' 
            : 'nav-link sports-nav-link';

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.trim();
        setShowSuggestions(false);
        navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
    };

    useEffect(() => {
        if (location.pathname !== '/') {
            return;
        }
        const searchQuery = new URLSearchParams(location.search).get('search') || '';
        setSearchTerm(searchQuery);
        setShowSuggestions(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        setShowNotifications(false);
    }, [location.pathname, location.search]);

    const suggestions = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (query.length < 2) {
            return [];
        }

        return mockProducts
            .map((product) => {
                const name = product.name.toLowerCase();
                const category = (product.category || '').toLowerCase();
                const description = product.description.toLowerCase();
                const benefit = (product.benefit || '').toLowerCase();
                const specs = (product.specs || []).join(' ').toLowerCase();

                let score = 0;
                if (name === query) score += 100;
                if (name.startsWith(query)) score += 55;
                if (name.includes(query)) score += 32;
                if (category.includes(query)) score += 18;
                if (description.includes(query)) score += 14;
                if (benefit.includes(query)) score += 12;
                if (specs.includes(query)) score += 10;

                return { product, score };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((entry) => entry.product);
    }, [searchTerm]);

    const handleSuggestionSelect = (productName) => {
        setSearchTerm(productName);
        setShowSuggestions(false);
        navigate(`/?search=${encodeURIComponent(productName)}`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top sports-navbar">
            <div className="container">
                <NavLink to="/" className="navbar-brand fw-bold text-success sports-brand">
                    KITPLUG
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link sports-nav-link dropdown-toggle btn btn-link text-decoration-none"
                                id="mainMenuDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                type="button"
                            >
                                Menu
                            </button>
                            <ul className="dropdown-menu shadow border-0" aria-labelledby="mainMenuDropdown">
                                <li>
                                    <NavLink to="/" className="dropdown-item">
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/addproduct" className="dropdown-item">
                                        Add Product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signin" className="dropdown-item">
                                        Sign In
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup" className="dropdown-item">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form
                        className="d-flex align-items-center mx-lg-4 mb-3 mb-lg-0 pro-form position-relative smart-search-wrap"
                        role="search"
                        onSubmit={handleSearchSubmit}
                    >
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 rounded-start-pill input-group-text-pro">
                                <i className="bi bi-search text-secondary"></i>
                            </span>
                            <input
                                type="search"
                                className="form-control form-control-pro border-start-0 border-end-0 shadow-none"
                                placeholder="Search products..."
                                aria-label="Search products"
                                value={searchTerm}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => {
                                    setTimeout(() => setShowSuggestions(false), 120);
                                }}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    setShowSuggestions(true);
                                }}
                            />
                            <button className="btn btn-success rounded-end-pill px-4 btn-pro" type="submit">
                                Search
                            </button>
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="smart-search-dropdown shadow">
                                {suggestions.map((product) => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        className="smart-search-item"
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => handleSuggestionSelect(product.name)}
                                    >
                                        <span className="smart-search-name">{product.name}</span>
                                        <span className="smart-search-meta">{product.category || 'Sports'}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item position-relative">
                            <NavLink to="/cart" className={linkClass}>
                                <i className="bi bi-cart3"></i>
                                {itemCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {itemCount}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/orders" className={linkClass} title="Order History" aria-label="Order History">
                                <span aria-hidden="true">🧾</span>
                            </NavLink>
                        </li>
                        <li className="nav-item d-flex align-items-center ms-lg-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-success rounded-pill"
                                onClick={onToggleDarkMode}
                                aria-label="Toggle dark mode"
                            >
                                <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-stars-fill"} me-1`}></i>
                                {darkMode ? "Light" : "Dark"}
                            </button>
                        </li>
                        <li className="nav-item position-relative">
                            <button
                                type="button"
                                className="btn nav-link sports-nav-link position-relative notification-bell-btn"
                                onClick={() => setShowNotifications((prev) => !prev)}
                            >
                                <i className="bi bi-bell"></i>
                                {unreadCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div className="notification-panel shadow">
                                    <div className="notification-panel-header">
                                        <span>Notifications</span>
                                        <button type="button" onClick={markAllAsRead}>
                                            Mark all read
                                        </button>
                                    </div>
                                    <div className="notification-panel-list">
                                        {notifications.length === 0 ? (
                                            <p className="notification-empty">No notifications yet.</p>
                                        ) : (
                                            notifications.slice(0, 8).map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`notification-item ${item.read ? "read" : "unread"}`}
                                                    onClick={() => markNotificationAsRead(item.id)}
                                                >
                                                    <div className="notification-item-main">
                                                        <p className="notification-item-title">{item.title}</p>
                                                        <p className="notification-item-text">{item.message}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            removeNotification(item.id);
                                                        }}
                                                        className="notification-item-remove"
                                                        aria-label="Remove notification"
                                                    >
                                                        <i className="bi bi-x"></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
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
