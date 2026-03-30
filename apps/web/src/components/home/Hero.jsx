import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = ({ onLoginClick }) => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            Best Food for <br />
            <span className="highlight">Best Restaurants</span>
          </h1>
          <p className="hero-desc">Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.</p>
          
          <div className="hero-auth-wrapper mt-30">
            <div className="hero-email-box">
              <input type="email" placeholder="Nhập email của bạn..." className="hero-email-input" />
            </div>
            <div className="hero-auth-box">
              <button className="btn-secondary" onClick={onLoginClick}>Đăng Nhập</button>
              <Link to="/register" className="btn-primary">Đăng Ký</Link>
            </div>
          </div>
        </div>
        <div className="hero-images">
          <div className="red-blob"></div>
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Food dish" className="main-img" />
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Steak" className="sub-img" />
          
          <div className="floating-badge">
            <span className="badge-icon">👍</span>
            <div className="badge-text">
              <strong>Quality Food</strong>
              <span>For everyone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
