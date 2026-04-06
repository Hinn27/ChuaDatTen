import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { IconSearch, IconClock, IconPhone } from '../components/icons.jsx'
import { Stars } from '../components/Stars.jsx'
import { useProductsQuery } from '../hooks/useShopQueries.js'
import useCartStore from '../stores/useCartStore.js'
import '../App.css'
import './restaurant-pages.css'

const CATEGORIES = ['Offers', 'Burgers', 'Fries', 'Snacks', 'Salads', 'Cold drinks', 'Desserts']

const OFFERS = [
  {
    id: 1,
    title: 'First Order Discount',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&q=80',
  },
  {
    id: 2,
    title: 'Free Delivery Weekend',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80',
  },
  {
    id: 3,
    title: 'Bundle & Save',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&q=80',
  },
]

const DEFAULT_MENU_SECTIONS = [
  {
    title: 'Burgers',
    items: [
      {
        id: 'b1',
        name: 'Big Mac® Meal',
        desc: 'Two beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame bun.',
        price: '£6.49',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
      },
      {
        id: 'b2',
        name: 'Quarter Pounder™',
        desc: 'Quarter pound of 100% beef with cheese, onions, pickles, ketchup and mustard.',
        price: '£5.79',
        img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80',
      },
      {
        id: 'b3',
        name: 'McChicken®',
        desc: 'Crispy chicken breast with lettuce and mayo in a toasted bun.',
        price: '£4.99',
        img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80',
      },
      {
        id: 'b4',
        name: 'Filet-O-Fish®',
        desc: 'Fish fillet with tartar sauce and cheese in a steamed bun.',
        price: '£4.49',
        img: 'https://images.unsplash.com/photo-1543339308-43e59d06b73d?w=400&q=80',
      },
    ],
  },
  {
    title: 'Fries',
    items: [
      {
        id: 'f1',
        name: 'Large Fries',
        desc: 'Golden fries, perfectly salted.',
        price: '£1.89',
        img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
      },
      {
        id: 'f2',
        name: 'Cheesy Bacon Fries',
        desc: 'Fries topped with cheese sauce and bacon bits.',
        price: '£3.29',
        img: 'https://images.unsplash.com/photo-1630384069609-50bbab7c7f63?w=400&q=80',
      },
    ],
  },
  {
    title: 'Cold drinks',
    items: [
      {
        id: 'd1',
        name: 'Coca-Cola®',
        desc: '500ml chilled bottle.',
        price: '£1.99',
        img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
      },
      {
        id: 'd2',
        name: 'Sprite®',
        desc: '500ml chilled bottle.',
        price: '£1.99',
        img: 'https://images.unsplash.com/photo-1622483767028-2f1e81e0e3b0?w=400&q=80',
      },
    ],
  },
]

const DELIVERY_HOURS = [
  { day: 'Mon – Thu', time: '11:00 – 23:00' },
  { day: 'Fri – Sat', time: '11:00 – 02:00' },
  { day: 'Sunday', time: '12:00 – 22:00' },
]

const OPENING_HOURS = [
  { day: 'Mon – Thu', time: '07:00 – 24:00' },
  { day: 'Fri – Sat', time: '07:00 – 03:00' },
  { day: 'Sunday', time: '08:00 – 23:00' },
]

const REVIEWS = [
  {
    id: 1,
    name: 'Alex M.',
    place: 'East London',
    date: '12 Mar 2026',
    text: 'Quick delivery and food arrived hot. Packaging was solid.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
  },
  {
    id: 2,
    name: 'Sara K.',
    place: 'Stratford',
    date: '8 Mar 2026',
    text: 'Great for late night cravings. Driver was polite.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
  {
    id: 3,
    name: 'James P.',
    place: 'Hackney',
    date: '2 Mar 2026',
    text: 'Order was correct. Fries could be crispier but overall fine.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
  },
]

const SIMILAR = [
  { name: "McDonald's", bg: '#FFC72C', color: '#DA291C' },
  { name: "Papa John's", bg: '#00843D', color: '#fff' },
  { name: 'KFC', bg: '#E4002B', color: '#fff' },
  { name: 'Texas Chicken', bg: '#C8102E', color: '#fff' },
  { name: 'Burger King', bg: '#FDB813', color: '#512DA8' },
  { name: 'Shaurma 1', bg: '#2E7D32', color: '#fff' },
]

export function RestaurantMenuPage() {
  const [cat, setCat] = useState('Offers')
  const [reviewIdx, setReviewIdx] = useState(0)
  const addItem = useCartStore((state) => state.addItem)
  const { data, isLoading, isError } = useProductsQuery({ page: 1, limit: 30 })

  const menuSections = useMemo(() => {
    const apiItems = data?.items || []
    if (!apiItems.length) {
      return DEFAULT_MENU_SECTIONS
    }

    const grouped = apiItems.reduce((acc, item) => {
      const categoryName = item.category_name || item.category || 'Menu'
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push({
        id: item.id,
        name: item.name,
        desc: item.description || 'Mon ngon trong ngay',
        price: `£${Number(item.price || 0).toFixed(2)}`,
        img:
          item.image_url ||
          item.image ||
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
      })
      return acc
    }, {})

    return Object.entries(grouped).map(([title, items]) => ({ title, items }))
  }, [data])

  const visibleReviews = 3
  const maxStart = Math.max(0, REVIEWS.length - visibleReviews)

  function handleAddToCart(item) {
    const priceNumber = Number(String(item.price).replace(/[£,$]/g, '')) || 0
    addItem({
      id: item.id,
      name: item.name,
      price: priceNumber,
      image: item.img,
    })
  }

  return (
    <div className="rp-page">
      <SiteHeader variant="inner" />

      <section className="rp-hero">
        <div className="rp-hero-bg" />
        <div className="oui-container rp-hero-inner">
          <div className="rp-hero-top">
            <div>
              <h1 className="rp-title">McDonald&apos;s East London</h1>
              <div className="rp-hero-meta">
                <div className="rp-rating-box">
                  <span className="rp-rating-num">3.4</span>
                  <Stars />
                  <span className="rp-reviews-count">1,342 reviews</span>
                </div>
                <div className="rp-pills">
                  <span className="rp-pill">Minimum order £20</span>
                  <span className="rp-pill">Delivery in 20–30 mins</span>
                </div>
              </div>
            </div>
            <p className="rp-demo-link">
              <Link to="/restaurant/tandoori-pizza-london/order">Xem trang đặt món (demo)</Link>
            </p>
          </div>
          <div className="rp-status-banner">Open until 3:00 AM</div>
        </div>
      </section>

      <div className="rp-cat-search oui-container">
        <div className="rp-cat-scroll" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              className={`rp-cat-tab ${cat === c ? 'is-active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="rp-search">
          <IconSearch />
          <input type="search" placeholder="Search menu..." aria-label="Search menu" />
        </label>
      </div>

      <section className="rp-section rp-section--muted">
        <div className="oui-container">
          <h2 className="rp-h2">Promotional offers</h2>
          <div className="rp-offers-row">
            {OFFERS.map((o) => (
              <article key={o.id} className="rp-offer-card">
                <img src={o.img} alt="" loading="lazy" />
                <div className="rp-offer-bar">
                  <strong>{o.title}</strong>
                  <button type="button" className="rp-icon-add" aria-label="Add offer">
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isLoading && (
        <section className="rp-section">
          <div className="oui-container">
            <p>Dang tai danh sach san pham...</p>
          </div>
        </section>
      )}

      {isError && (
        <section className="rp-section">
          <div className="oui-container">
            <p>Khong the tai san pham tu API, hien thi du lieu mau.</p>
          </div>
        </section>
      )}

      {menuSections.map((section) => (
        <section key={section.title} className="rp-section" id={section.title.toLowerCase().replace(/\s+/g, '-')}>
          <div className="oui-container">
            <h2 className="rp-h2 rp-h2--orange">{section.title}</h2>
            <div className="rp-menu-grid">
              {section.items.map((item) => (
                <article key={item.id} className="rp-menu-card">
                  <div className="rp-menu-card-text">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <span className="rp-price">{item.price}</span>
                  </div>
                  <div className="rp-menu-card-img">
                    <img src={item.img} alt="" loading="lazy" />
                    <button type="button" className="rp-img-add" aria-label={`Add ${item.name}`} onClick={() => handleAddToCart(item)}>
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

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
            <p>123 High Street, East London, E1 6AN</p>
            <p>
              <a href="tel:+442012345678">+44 20 1234 5678</a>
            </p>
            <p>
              <a href="https://mcdonalds.co.uk" target="_blank" rel="noreferrer">
                mcdonalds.co.uk
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
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.085%2C51.505%2C-0.055%2C51.525&amp;layer=mapnik&amp;marker=51.515%2C-0.07"
        />
        <div className="oui-container rp-map-overlay-wrap">
          <div className="rp-map-card">
            <h3>McDonald&apos;s East London</h3>
            <p>123 High Street, East London, E1 6AN</p>
            <p>+44 20 1234 5678</p>
            <a href="https://mcdonalds.co.uk" target="_blank" rel="noreferrer">
              mcdonalds.co.uk
            </a>
          </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="oui-container">
          <div className="rp-reviews-head">
            <h2 className="rp-h2">Customer reviews</h2>
            <div className="rp-carousel-nav">
              <button
                type="button"
                className="rp-arrow"
                aria-label="Previous reviews"
                disabled={reviewIdx <= 0}
                onClick={() => setReviewIdx((i) => Math.max(0, i - 1))}
              >
                ‹
              </button>
              <button
                type="button"
                className="rp-arrow"
                aria-label="Next reviews"
                disabled={reviewIdx >= maxStart}
                onClick={() => setReviewIdx((i) => Math.min(maxStart, i + 1))}
              >
                ›
              </button>
            </div>
          </div>
          <div className="rp-reviews-row">
            {REVIEWS.slice(reviewIdx, reviewIdx + visibleReviews).map((r) => (
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
                <Stars />
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
