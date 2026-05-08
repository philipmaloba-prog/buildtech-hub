import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const linkClass = ({ isActive }) =>
        isActive 
            ? 'nav-link sports-nav-link active fw-semibold text-success' 
            : 'nav-link sports-nav-link';

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.trim();
        navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
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
                        <li className="nav-item">
                            <NavLink to="/" className={linkClass}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/addproduct" className={linkClass}>
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                    <form
                        className="d-flex align-items-center mx-lg-4 mb-3 mb-lg-0 pro-form"
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
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button className="btn btn-success rounded-end-pill px-4 btn-pro" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/signup" className={linkClass}>
                                Sign Up
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signin" className={linkClass}>
                                Sign In
                            </NavLink>
                        </li>
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
