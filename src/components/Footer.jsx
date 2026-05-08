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
                BuildTech Hub
            </Link>
            <p className="footer-copy mb-4">
              Great building and construction stores. Pay securely with M-Pesa.
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
             <a  
              href="https://wa.me/254742609633?text=Hi%20BuildTech%20Hub,%20I'm%20visiting%20your%20website%20and%20I'd%20like%20to%20ask%20about%20current%20prices%20and%20delivery." 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-success fs-4 me-3"
            >
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
             <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/mpesa-secure">M-Pesa Secure</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 footer-heading">Contact</h5>
            <p className="footer-contact-item"><i className="bi bi-telephone me-2 text-success"></i>+254 42 609 633</p>
            <p className="footer-contact-item"><i className="bi bi-envelope me-2 text-success"></i>support@BuildTech Hub.co.ke</p>
            <p className="footer-contact-item"><i className="bi bi-geo-alt me-2 text-success"></i>Nairobi, Kenya</p>
            <p className="footer-contact-item mb-0"><i className="bi bi-clock me-2 text-success"></i>Mon-Sat 8AM-6PM</p>
          </div>
        </div>

        <hr className="my-4 footer-divider" />

      </div>
      <div className="footer-bottom-strip py-3">
        <div className="container text-center">
          <p className="mb-2 footer-bottom-text small">
            © 2026 BuildTech Hub | Developed by Maloba. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
