import React from 'react';
import './Services.css';

export const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <span className="text-cursive">Our Features</span>
          <h2>We Provide Best Services</h2>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon mb-20">🏍️</div>
            <h3>Fast Delivery</h3>
            <p className="text-gray">Quisque ullamcorper mattis elit, euismod feugiat tellus.</p>
          </div>
          <div className="service-card active">
            <div className="service-icon mb-20">🍲</div>
            <h3>Fresh Food</h3>
            <p className="text-gray">Quisque ullamcorper mattis elit, euismod feugiat tellus.</p>
          </div>
          <div className="service-card">
            <div className="service-icon mb-20">👩‍🍳</div>
            <h3>Best Chef</h3>
            <p className="text-gray">Quisque ullamcorper mattis elit, euismod feugiat tellus.</p>
          </div>
          <div className="service-card">
            <div className="service-icon mb-20">📞</div>
            <h3>24/7 Support</h3>
            <p className="text-gray">Quisque ullamcorper mattis elit, euismod feugiat tellus.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
