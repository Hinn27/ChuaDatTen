import { Link, NavLink } from 'react-router-dom'
import { IconLocation, IconUser, IconCart } from './icons.jsx'

export function SiteHeader({ variant = 'home' }) {
  const homeNav = ({ isActive }) => (isActive ? 'active' : undefined)

  return (
    <header className="oui-header">
      <div className="oui-topbar">
        <div className="oui-container oui-topbar-inner">
          <span className="oui-location">
            <IconLocation />
            EC4M 7RF, London
          </span>
          <div className="oui-topbar-actions">
            <button type="button" className="oui-btn-text">
              My Account
            </button>
            <button type="button" className="oui-btn-cart">
              <IconCart />
              <span>£12.50</span>
            </button>
          </div>
        </div>
      </div>
      <nav className="oui-nav">
        <div className="oui-container oui-nav-inner">
          <Link to="/" className="oui-logo">
            Order<span className="oui-logo-accent">.uk</span>
          </Link>
          {variant === 'home' ? (
            <ul className="oui-nav-links">
              <li>
                <a href="#home" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu">Browse Menu</a>
              </li>
              <li>
                <a href="#deals">Special Offers</a>
              </li>
              <li>
                <a href="#restaurants">Restaurants</a>
              </li>
              <li>
                <a href="#track">Track Order</a>
              </li>
            </ul>
          ) : (
            <ul className="oui-nav-links">
              <li>
                <NavLink to="/" end className={homeNav}>
                  Home
                </NavLink>
              </li>
              <li>
                <Link to="/#deals">Special Offers</Link>
              </li>
              <li>
                <Link to="/#restaurants">Restaurants</Link>
              </li>
              <li>
                <Link to="/#track">Track Order</Link>
              </li>
            </ul>
          )}
          <button type="button" className="oui-btn-login">
            <IconUser />
            Login / Signup
          </button>
        </div>
      </nav>
    </header>
  )
}
