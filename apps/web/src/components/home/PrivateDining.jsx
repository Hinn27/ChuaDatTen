import React from 'react';
import './PrivateDining.css';

export const PrivateDining = () => {
  return (
    <section className="dining-section">
      <div className="container">
        <div className="dining-content">
          <div className="dining-gallery">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Restaurant Interior" className="gallery-img-large" />
            <div className="gallery-column">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Plated food" className="gallery-img-small" />
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="People dining" className="gallery-img-small" />
            </div>
          </div>
          <div className="dining-info">
            <span className="text-cursive section-subtitle">Best Events</span>
            <h2 className="section-title-left">Private Dining and Events</h2>
            <p className="text-gray mb-20">Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.</p>
            <button className="btn-primary mt-30">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};
