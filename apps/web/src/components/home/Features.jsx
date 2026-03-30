import React from 'react';
import './Features.css';

export const Features = () => {
  return (
    <section id="about" className="features-section">
      <div className="container">
        
        {/* Top Feature */}
        <div className="feature-row">
          <div className="feature-img-box">
            <img src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chef preparing food" className="img-large" />
          </div>
          <div className="feature-text">
            <span className="text-cursive section-subtitle">About Our Food</span>
            <h2 className="section-title-left">Feel The Taste of Foods</h2>
            <p className="text-gray">Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.</p>
            <div className="since-badge">
              <span className="since-year">Since 2012</span>
            </div>
          </div>
          <div className="feature-img-box secondary">
            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Chef smiling" className="img-small" />
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Dish detail" className="img-round shadow-lg" />
          </div>
        </div>

        {/* Bottom Feature */}
        <div className="feature-row reverse mt-100">
          <div className="feature-text">
            <h2 className="section-title-left">Good Food Steak & Great Restaurant</h2>
            <p className="text-gray mb-20">Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.</p>
            <ul className="feature-list">
              <li><span className="check">✓</span> Fresh Food</li>
              <li><span className="check">✓</span> Premium Quality</li>
              <li><span className="check">✓</span> Best Chef</li>
            </ul>
            <button className="btn-primary mt-30">Discover More</button>
          </div>
          <div className="feature-img-box mixed-blob">
            <div className="discount-badge">
              <strong>20%</strong>
              <span>Discount</span>
            </div>
            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Steak meal" className="main-dish" />
            <div className="blob-yellow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
