import React from 'react';
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
          <p className="hero-desc">Enjoy our signature dishes with friends and family in a warm and inviting atmosphere.</p>
          
          <div className="hero-buttons">
            <button className="btn-yellow">Đăng nhập</button>
            <button className="btn-primary">Đăng ký ngay</button>
          </div>
        </div>
        <div className="hero-images">
          <div className="top-rated-badge">⭐ Top Rated</div>
          <div className="red-blob"></div>
          <div className="food-image-circle">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Food dish" />
          </div>
        </div>
      </div>
    </section>
  );
};
