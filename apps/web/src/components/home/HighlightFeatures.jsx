import React from 'react';
import './HighlightFeatures.css';

export const HighlightFeatures = () => {
  return (
    <section className="highlight-section">
      <div className="container highlight-container">
        <div className="highlight-text">
          <span className="text-cursive highlight-subtitle">Features</span>
          <h2 className="highlight-title">Highlighting its Unique Features and Experiences</h2>
          <div className="play-button-wrap">
            <button className="video-btn">▶</button>
            <span>Watch Video</span>
          </div>
        </div>
        
        <div className="highlight-images">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Special Dish 1" className="hl-img img-1" />
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Special Dish 2" className="hl-img img-2" />
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Restaurant interior" className="hl-img img-3" />
        </div>
      </div>
    </section>
  );
};
