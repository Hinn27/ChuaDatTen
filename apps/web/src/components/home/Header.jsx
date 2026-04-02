import React from 'react';
import './Header.css';

export const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">�</span>
          <span className="logo-text">F.A.T</span>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="/#home" className="active">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#menu">Menu</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn cart-btn">🛒<span className="badge">0</span></button>
        </div>
      </div>
    </header>
  );
};
