import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer mt-5 pt-5 text-light">
      <div className="container">
        <div className="row g-4 pb-4 align-items-start">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="navbar-brand fw-bold footer-brand mb-3 d-block">
              <i className="bi bi-plug-fill me-2"></i>
              KITPLUG Sports
            </Link>
            <p className="footer-copy mb-4">
              Premium sports gear delivered fast. Pay securely with M-Pesa.
              Shop with confidence from Kenya's top store.
            </p>
            <div className="d-flex gap-2">
              <a href="#facebook" className="btn footer-social-btn" title="Facebook" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#instagram" className="btn footer-social-btn" title="Instagram" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#twitter" className="btn footer-social-btn" title="Twitter" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#whatsapp" className="btn footer-social-btn footer-social-btn-success" title="WhatsApp" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="fw-bold mb-3 footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
              <li className="mb-2"><Link to="/cart" className="footer-link">Cart</Link></li>
              <li className="mb-2"><Link to="/addproduct" className="footer-link">Sell</Link></li>
              <li className="mb-2"><Link to="/signup" className="footer-link">Sign Up</Link></li>
              <li className="mb-2"><Link to="/signin" className="footer-link">Login</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="fw-bold mb-3 footer-heading">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#about" className="footer-link">About Us</a></li>
              <li className="mb-2"><a href="#privacy" className="footer-link">Privacy</a></li>
              <li className="mb-2"><a href="#terms" className="footer-link">Terms</a></li>
              <li className="mb-2"><a href="#delivery" className="footer-link">Delivery</a></li>
              <li className="mb-2"><a href="#mpesa" className="footer-link">M-Pesa Secure</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 footer-heading">Contact</h5>
            <p className="footer-contact-item"><i className="bi bi-telephone me-2 text-success"></i>+254 712 345 678</p>
            <p className="footer-contact-item"><i className="bi bi-envelope me-2 text-success"></i>support@kitplug.co.ke</p>
            <p className="footer-contact-item"><i className="bi bi-geo-alt me-2 text-success"></i>Nairobi, Kenya</p>
            <p className="footer-contact-item mb-0"><i className="bi bi-clock me-2 text-success"></i>Mon-Sat 8AM-6PM</p>
          </div>
        </div>

        <hr className="my-4 footer-divider" />

      </div>
      <div className="footer-bottom-strip py-3">
        <div className="container text-center">
          <p className="mb-2 footer-bottom-text small">
            © 2026 KITPLUG Sports | Developed by Ssozi. All rights reserved.
          </p>
          <img src="https://lipis.github.io/flag-icon-css/flags/4x3/ke.svg"
               alt="Kenya" height="25" className="me-3 rounded footer-badge" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/M-Pesa_Logo.svg/512px-M-Pesa_Logo.svg.png"
               alt="M-Pesa" height="30" className="footer-badge" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
