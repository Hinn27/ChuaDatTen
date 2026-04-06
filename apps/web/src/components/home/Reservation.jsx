import React from 'react';
import './Reservation.css';

export const Reservation = () => {
  return (
    <section id="reservation" className="reservation-section">
      <div className="container">
        <div className="reservation-content">
          <div className="reservation-info">
            <span className="text-cursive section-subtitle">Reservation</span>
            <h2 className="section-title-left">Reservation Table & Enjoy Dining Table</h2>
            
            <div className="contact-info mt-30">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <span>Call Booking</span>
                  <strong>+123 - 456 - 7890</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-text">
                  <span>Email Address</span>
                  <strong>info@restaurant.com</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <span>Location</span>
                  <strong>123 Main St, New York</strong>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reservation-form">
            <form>
              <div className="form-row">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Phone Number" />
                <select defaultValue="">
                  <option value="" disabled>Persons</option>
                  <option>1 Person</option>
                  <option>2 Persons</option>
                  <option>3+ Persons</option>
                </select>
              </div>
              <div className="form-row">
                <input type="date" />
                <input type="time" />
              </div>
              <button type="button" className="btn-primary form-submit">Book Table</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
