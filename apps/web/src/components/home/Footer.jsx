import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <div className="logo footer-logo">
              <span className="logo-icon">🍲</span>
              <span className="logo-text">F.A.O</span>
            </div>
            <p className="text-gray mt-20">Best Food for Best Restaurants in the world.</p>
            <div className="social-links mt-30">
              <a href="#">F</a>
              <a href="#">T</a>
              <a href="#">I</a>
              <a href="#">Y</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3>About</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Menu</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">News & Blogs</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Menu</h3>
            <ul>
              <li><a href="#">Burger</a></li>
              <li><a href="#">Pizza</a></li>
              <li><a href="#">Steak</a></li>
              <li><a href="#">Pasta</a></li>
            </ul>
          </div>
          
          <div className="footer-col newsletter-col">
            <h3>Newsletter</h3>
            <p className="text-gray mb-20">Get recent news and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email Address" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 F.A.O Restaurant. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
