import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { SiteFooter } from '../components/SiteFooter.jsx'
import '../App.css'

const DEAL_TABS = ['Vegan', 'Sushi', 'Pizza & Fast Food', 'Others']

const DEALS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    discount: '-20%',
    name: 'Chef Burgers London',
    tag: 'Burgers',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    discount: '-10%',
    name: 'Green Bowl Co.',
    tag: 'Salads',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
    discount: '-15%',
    name: 'Tokyo Sushi Bar',
    tag: 'Sushi',
  },
]

const CATEGORIES = [
  { name: 'Burgers', count: 20, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
  { name: 'Salads', count: 14, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
  { name: 'Pasta', count: 32, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
  { name: 'Pizza', count: 45, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
  { name: 'Breakfast', count: 18, img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80' },
  { name: 'Soups', count: 12, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
]

const RESTAURANTS = [
  { name: "McDonald's", bg: '#FFC72C', color: '#DA291C', to: '/restaurant/mcdonalds-east-london' },
  { name: "Papa John's", bg: '#00843D', color: '#fff', to: null },
  { name: 'KFC', bg: '#E4002B', color: '#fff', to: null },
  { name: 'Texas Chicken', bg: '#C8102E', color: '#fff', to: null },
  { name: 'Burger King', bg: '#FDB813', color: '#512DA8', to: null },
  {
    name: 'Tandoori Pizza London',
    bg: '#FF9100',
    color: '#03081F',
    to: '/restaurant/tandoori-pizza-london/order',
  },
]

const FAQ_TABS = ['Frequent Questions', 'Who are we?', 'Partner Program', 'Help Center']

const FAQ_ITEMS = [
  'How does Order.uk work?',
  'What payment methods are accepted?',
  'How do I track my order?',
  'Can I cancel or change my order?',
]

const STATS = [
  { value: '546+', label: 'Registered Riders' },
  { value: '789,900+', label: 'Orders Delivered' },
  { value: '690+', label: 'Restaurants Partnered' },
  { value: '17,457+', label: 'Food Items' },
]

export function HomePage() {
  const [dealTab, setDealTab] = useState('Pizza & Fast Food')
  const [faqTab, setFaqTab] = useState('Frequent Questions')
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="landing">
      <SiteHeader variant="home" />

      <section className="oui-hero" id="home">
        <div className="oui-container oui-hero-grid">
          <div className="oui-hero-copy">
            <h1 className="oui-hero-title">
              Feast Your Senses, <span className="oui-text-orange">Fast and Fresh</span>
            </h1>
            <p className="oui-hero-sub">Enter a postcode to see what we deliver...</p>
            <div className="oui-search">
              <input type="text" placeholder="Enter your postcode" aria-label="Postcode" />
              <button type="button" className="oui-btn-search">
                Search
              </button>
            </div>
          </div>
          <div className="oui-hero-visual">
            <div className="oui-hero-blob" aria-hidden />
            <div className="oui-hero-photos">
              <img
                src="https://images.unsplash.com/photo-1522336572469-5ba054f43317?w=520&q=80"
                alt=""
                className="oui-hero-img oui-hero-img--1"
              />
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=520&q=80"
                alt=""
                className="oui-hero-img oui-hero-img--2"
              />
            </div>
            <div className="oui-notifs">
              <div className="oui-notif">
                <span className="oui-notif-num">1</span>
                <p>Order is being prepared</p>
              </div>
              <div className="oui-notif">
                <span className="oui-notif-num">2</span>
                <p>Order is on the way</p>
              </div>
              <div className="oui-notif">
                <span className="oui-notif-num">3</span>
                <p>Delivered — enjoy!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="oui-section" id="deals">
        <div className="oui-container">
          <h2 className="oui-section-title">
            Up to -40% <span aria-hidden>🎁</span> Order.uk exclusive deals
          </h2>
          <div className="oui-pills" role="tablist">
            {DEAL_TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={dealTab === t}
                className={`oui-pill ${dealTab === t ? 'is-active' : ''}`}
                onClick={() => setDealTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="oui-deals-grid">
            {DEALS.map((d) => (
              <article key={d.id} className="oui-deal-card">
                <div className="oui-deal-img-wrap">
                  <img src={d.img} alt="" loading="lazy" />
                  <span className="oui-badge">{d.discount}</span>
                  <div className="oui-deal-overlay">
                    <strong>{d.name}</strong>
                    <span>{d.tag}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="oui-section oui-section--alt" id="menu">
        <div className="oui-container">
          <h2 className="oui-section-title">
            Order.uk Popular Categories <span aria-hidden>😋</span>
          </h2>
          <div className="oui-cat-row">
            {CATEGORIES.map((c) => (
              <a key={c.name} href={`#cat-${c.name}`} className="oui-cat-card">
                <div className="oui-cat-img">
                  <img src={c.img} alt="" loading="lazy" />
                </div>
                <strong>{c.name}</strong>
                <span>{c.count} Restaurants</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="oui-section" id="restaurants">
        <div className="oui-container">
          <h2 className="oui-section-title">Popular Restaurants</h2>
          <p className="oui-home-hint">
            Demo: <Link to="/restaurant/mcdonalds-east-london">McDonald&apos;s East London</Link> (menu) ·{' '}
            <Link to="/restaurant/tandoori-pizza-london/order">Tandoori Pizza London</Link> (đặt món)
          </p>
          <div className="oui-rest-grid">
            {RESTAURANTS.map((r) => (
              <div key={r.name} className="oui-rest-card">
                {r.to ? (
                  <Link to={r.to} className="oui-rest-link">
                    <div className="oui-rest-logo" style={{ background: r.bg, color: r.color }}>
                      {r.name}
                    </div>
                    <span className="oui-rest-label">{r.name}</span>
                  </Link>
                ) : (
                  <>
                    <div className="oui-rest-logo" style={{ background: r.bg, color: r.color }}>
                      {r.name}
                    </div>
                    <span className="oui-rest-label">{r.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="oui-app-banner">
        <div className="oui-container oui-app-inner">
          <div className="oui-app-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=700&q=80"
              alt=""
              className="oui-app-img"
            />
          </div>
          <div className="oui-app-copy">
            <h2>
              Ordering is more <span className="oui-text-orange">Personalised &amp; Instant</span>
            </h2>
            <p>Download the Order.uk app for faster ordering</p>
            <div className="oui-store-badges">
              <a href="#" className="oui-badge-store" aria-label="Download on the App Store">
                App Store
              </a>
              <a href="#" className="oui-badge-store oui-badge-store--play" aria-label="Get it on Google Play">
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="oui-section">
        <div className="oui-container oui-recruit-grid">
          <article className="oui-recruit-card">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
              alt=""
              loading="lazy"
            />
            <div className="oui-recruit-body">
              <h3>Partner with us</h3>
              <button type="button" className="oui-btn-primary">
                Get started
              </button>
            </div>
          </article>
          <article className="oui-recruit-card">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
              alt=""
              loading="lazy"
            />
            <div className="oui-recruit-body">
              <h3>Ride with us</h3>
              <button type="button" className="oui-btn-primary">
                Get started
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="oui-section oui-section--faq" id="track">
        <div className="oui-container">
          <h2 className="oui-section-title">Know more about us!</h2>
          <div className="oui-faq-tabs" role="tablist">
            {FAQ_TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                className={`oui-faq-tab ${faqTab === t ? 'is-active' : ''}`}
                onClick={() => setFaqTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="oui-faq-split">
            <div className="oui-accordion">
              {FAQ_ITEMS.map((q, i) => (
                <div key={q} className={`oui-acc-item ${openFaq === i ? 'is-open' : ''}`}>
                  <button type="button" className="oui-acc-trigger" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {q}
                    <span className="oui-acc-chevron" aria-hidden />
                  </button>
                  {openFaq === i && (
                    <div className="oui-acc-panel">
                      <p>
                        Order.uk connects you with local restaurants. Browse menus, place your order, and track delivery
                        in real time.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="oui-steps">
              <div className="oui-step">
                <div className="oui-step-icon" aria-hidden>
                  🍽️
                </div>
                <strong>Place an Order!</strong>
              </div>
              <div className="oui-step">
                <div className="oui-step-icon" aria-hidden>
                  📍
                </div>
                <strong>Track Progress</strong>
              </div>
              <div className="oui-step">
                <div className="oui-step-icon" aria-hidden>
                  ✓
                </div>
                <strong>Get your Order!</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="oui-stats" aria-label="Statistics">
        <div className="oui-container oui-stats-inner">
          {STATS.map((s) => (
            <div key={s.label} className="oui-stat">
              <span className="oui-stat-value">{s.value}</span>
              <span className="oui-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
