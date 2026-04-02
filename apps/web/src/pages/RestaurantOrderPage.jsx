import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { IconSearch, IconClock, IconPhone } from '../components/common/icons.jsx'
import { Stars } from '../components/common/Stars.jsx'
import '../App.css'
import './restaurant-pages.css'

const SIDEBAR_CATS = [
  'Home',
  'Garlic Bread',
  'Calzones',
  'Kebabs',
  'Salads',
  'Cold Drinks',
  'Desserts',
  'Deals',
]

const PIZZAS = [
  {
    id: 'p1',
    name: 'Farm House Classic Pizza',
    desc: 'Tomato base with mozzarella, peppers, mushrooms and onions.',
    rating: 4.2,
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    sizes: [
      { label: 'Small', price: 9.99 },
      { label: 'Medium', price: 12.99 },
      { label: 'Large', price: 15.99 },
    ],
  },
  {
    id: 'p2',
    name: 'Tandoori Chicken Pizza',
    desc: 'Spiced chicken, red onions, coriander and mint yogurt drizzle.',
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
    sizes: [
      { label: 'Small', price: 10.99 },
      { label: 'Medium', price: 13.99 },
      { label: 'Large', price: 16.99 },
    ],
  },
  {
    id: 'p3',
    name: 'Margherita',
    desc: 'Classic tomato, mozzarella and fresh basil.',
    rating: 4.0,
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
    sizes: [
      { label: 'Small', price: 7.99 },
      { label: 'Medium', price: 9.99 },
      { label: 'Large', price: 11.99 },
    ],
  },
  {
    id: 'p4',
    name: 'Pepperoni Feast',
    desc: 'Loaded with pepperoni and extra cheese.',
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
    sizes: [
      { label: 'Small', price: 10.49 },
      { label: 'Medium', price: 13.49 },
      { label: 'Large', price: 16.49 },
    ],
  },
]

const DELIVERY_HOURS = [
  { day: 'Mon – Sun', time: '11:00 – 23:30' },
]

const OPENING_HOURS = [
  { day: 'Mon – Thu', time: '11:00 – 02:00' },
  { day: 'Fri – Sat', time: '11:00 – 03:00' },
  { day: 'Sunday', time: '12:00 – 01:00' },
]

const ORDER_REVIEWS = [
  {
    id: 1,
    name: 'Priya N.',
    place: 'London',
    date: '20 Mar 2026',
    text: 'Pizza was excellent and arrived in 25 minutes.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    id: 2,
    name: 'Tom W.',
    place: 'Camden',
    date: '15 Mar 2026',
    text: 'Tandoori chicken topping is a must-try.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
]

const SIMILAR = [
  { name: "McDonald's", bg: '#FFC72C', color: '#DA291C' },
  { name: "Papa John's", bg: '#00843D', color: '#fff' },
  { name: 'KFC', bg: '#E4002B', color: '#fff' },
  { name: 'Texas Chicken', bg: '#C8102E', color: '#fff' },
  { name: 'Burger King', bg: '#FDB813', color: '#512DA8' },
  { name: 'Shaarma', bg: '#2E7D32', color: '#fff' },
]

export function RestaurantOrderPage() {
  const [sidebarCat, setSidebarCat] = useState('Home')
  const [sortBy, setSortBy] = useState('price-asc')
  const [basket, setBasket] = useState([])
  const [mode, setMode] = useState('delivery')

  const sortedPizzas = useMemo(() => {
    const copy = [...PIZZAS]
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.sizes[1].price - b.sizes[1].price)
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.sizes[1].price - a.sizes[1].price)
    } else if (sortBy === 'rating') {
      copy.sort((a, b) => b.rating - a.rating)
    }
    return copy
  }, [sortBy])

  const subtotal = basket.reduce((s, l) => s + l.price * l.qty, 0)
  const discount = subtotal > 40 ? 5 : 0
  const deliveryFee = mode === 'delivery' ? 2.49 : 0
  const total = Math.max(0, subtotal - discount + deliveryFee)

  function addToBasket(pizza, size) {
    const label = `${pizza.name} (${size.label})`
    setBasket((prev) => {
      const i = prev.findIndex((l) => l.key === `${pizza.id}-${size.label}`)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + 1 }
        return next
      }
      return [...prev, { key: `${pizza.id}-${size.label}`, label, price: size.price, qty: 1 }]
    })
  }

  function updateQty(key, delta) {
    setBasket((prev) => {
      const next = prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
      return next
    })
  }

  return (
    <div className="rp-page rp-page--order">
      <SiteHeader variant="inner" />

      <section className="rp-hero rp-hero--pizza">
        <div className="rp-hero-bg rp-hero-bg--pizza" />
        <div className="oui-container rp-hero-inner rp-hero-inner--order">
          <div className="rp-hero-top">
            <div>
              <h1 className="rp-title">Tandoori Pizza London</h1>
              <div className="rp-hero-meta">
                <div className="rp-rating-box">
                  <span className="rp-rating-num">3.4</span>
                  <Stars value={3.4} size="sm" />
                  <span className="rp-reviews-count">1,300+ reviews</span>
                </div>
                <div className="rp-pills">
                  <span className="rp-pill">Minimum Order: £10.00</span>
                  <span className="rp-pill">Delivery in 20–30 minutes</span>
                </div>
              </div>
            </div>
            <label className="rp-search rp-search--hero">
              <IconSearch />
              <input type="search" placeholder="Search for items..." aria-label="Search items" />
            </label>
          </div>
          <div className="rp-status-banner">Open until 3:00 AM</div>
          <p className="rp-demo-link">
            <Link to="/">← Về trang chủ</Link>
            {' · '}
            <Link to="/restaurant/mcdonalds-east-london">Trang menu McDonald&apos;s (demo)</Link>
          </p>
        </div>
      </section>

      <div className="oui-container rp-order-layout">
        <aside className="rp-sidebar" aria-label="Menu categories">
          <nav>
            {SIDEBAR_CATS.map((c) => (
              <button
                key={c}
                type="button"
                className={`rp-side-item ${sidebarCat === c ? 'is-active' : ''}`}
                onClick={() => setSidebarCat(c)}
              >
                {c}
              </button>
            ))}
          </nav>
        </aside>

        <main className="rp-order-main">
          <div className="rp-pizzas-head">
            <h2 className="rp-h2 rp-h2--orange">Pizzas</h2>
            <label className="rp-sort">
              Sort by
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price-asc">Price (low to high)</option>
                <option value="price-desc">Price (high to low)</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
          <div className="rp-pizza-grid">
            {sortedPizzas.map((p) => (
              <article key={p.id} className="rp-pizza-card">
                <img src={p.img} alt="" loading="lazy" />
                <div className="rp-pizza-body">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="rp-pizza-rating">
                    <Stars value={p.rating} size="sm" />
                    <span>{p.rating}</span>
                  </div>
                  <div className="rp-sizes">
                    {p.sizes.map((s) => (
                      <div key={s.label} className="rp-size-row">
                        <span>
                          {s.label} — £{s.price.toFixed(2)}
                        </span>
                        <button type="button" className="rp-btn-add-basket" onClick={() => addToBasket(p, s)}>
                          Add to basket
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className="rp-basket" aria-label="Basket">
          <div className="rp-basket-head">My Basket</div>
          <div className="rp-basket-body">
            {basket.length === 0 ? (
              <p className="rp-basket-empty">Your basket is empty. Add items from the menu.</p>
            ) : (
              <ul className="rp-basket-lines">
                {basket.map((l) => (
                  <li key={l.key}>
                    <div className="rp-line-info">
                      <span>{l.label}</span>
                      <span>£{(l.price * l.qty).toFixed(2)}</span>
                    </div>
                    <div className="rp-qty">
                      <button type="button" aria-label="Decrease" onClick={() => updateQty(l.key, -1)}>
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => updateQty(l.key, 1)}>
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="rp-basket-summary">
              <div className="rp-sum-row">
                <span>Sub total</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="rp-sum-row">
                <span>Discounts</span>
                <span>-£{discount.toFixed(2)}</span>
              </div>
              <div className="rp-sum-row">
                <span>Delivery fee</span>
                <span>£{deliveryFee.toFixed(2)}</span>
              </div>
            </div>
            <div className="rp-mode-toggle">
              <button
                type="button"
                className={mode === 'delivery' ? 'is-on' : ''}
                onClick={() => setMode('delivery')}
              >
                Delivery
              </button>
              <button
                type="button"
                className={mode === 'collection' ? 'is-on' : ''}
                onClick={() => setMode('collection')}
              >
                Collection
              </button>
            </div>
            <div className="rp-total-pay">
              <span>Total to pay</span>
              <strong>£{total.toFixed(2)}</strong>
            </div>
            <button type="button" className="rp-checkout">
              Checkout
            </button>
          </div>
        </aside>
      </div>

      <section className="rp-section rp-section--muted">
        <div className="oui-container rp-info-grid">
          <div className="rp-info-card">
            <h3>
              <IconClock /> Delivery information
            </h3>
            <ul>
              {DELIVERY_HOURS.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rp-info-card">
            <h3>
              <IconPhone /> Contact information
            </h3>
            <p>88 Brick Lane, London, E1 6QL</p>
            <p>
              <a href="tel:+442055500123">+44 20 5550 0123</a>
            </p>
            <p>
              <a href="https://example.com" target="_blank" rel="noreferrer">
                tandooripizza.co.uk
              </a>
            </p>
          </div>
          <div className="rp-info-card rp-info-card--dark">
            <h3>
              <IconClock /> Operational times
            </h3>
            <ul>
              {OPENING_HOURS.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rp-map-section">
        <iframe
          title="Restaurant location"
          className="rp-map-frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.095%2C51.515%2C-0.065%2C51.535&amp;layer=mapnik&amp;marker=51.525%2C-0.08"
        />
        <div className="oui-container rp-map-overlay-wrap">
          <div className="rp-map-card">
            <h3>Tandoori Pizza London</h3>
            <p>88 Brick Lane, London, E1 6QL</p>
            <p>+44 20 5550 0123</p>
            <a href="https://example.com" target="_blank" rel="noreferrer">
              tandooripizza.co.uk
            </a>
          </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="oui-container">
          <div className="rp-reviews-head">
            <h2 className="rp-h2">Customer reviews</h2>
          </div>
          <div className="rp-reviews-row">
            {ORDER_REVIEWS.map((r) => (
              <article key={r.id} className="rp-review-card">
                <div className="rp-review-top">
                  <img src={r.avatar} alt="" className="rp-avatar" />
                  <div>
                    <strong>{r.name}</strong>
                    <span className="rp-review-meta">
                      {r.place} · {r.date}
                    </span>
                  </div>
                </div>
                <Stars value={4} size="sm" />
                <p>{r.text}</p>
              </article>
            ))}
          </div>
          <p className="rp-overall-rating">
            Overall rating <strong>3.4</strong>
          </p>
        </div>
      </section>

      <section className="rp-section rp-section--muted">
        <div className="oui-container">
          <h2 className="rp-h2">Similar restaurants</h2>
          <div className="rp-similar-row">
            {SIMILAR.map((r) => (
              <div key={r.name} className="rp-similar-card">
                <div className="rp-similar-logo" style={{ background: r.bg, color: r.color }}>
                  {r.name}
                </div>
                <span className="rp-similar-label">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
