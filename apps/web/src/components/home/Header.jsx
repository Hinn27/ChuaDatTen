import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">🍲</span>
          <span className="logo-text">F.A.O</span>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="/#home" className="active">Home</a></li>
            <li><a href="/#menu">Menu</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#news">News</a></li>
            <li><a href="/#about">About</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn cart-btn">🛒<span className="badge">2</span></button>
          <button onClick={onLoginClick} className="btn-secondary" style={{backgroundColor: 'transparent', border: '2px solid var(--secondary-color)'}}>Login</button>
          <Link to="/register" className="btn-primary">Register</Link>
        </div>
      </div>
    </header>
  );
};
