import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './HomePage.css';

export function HomePage() {
  const [showNavBtns, setShowNavBtns] = React.useState(false);
  const { user } = useAuthStore();

  React.useEffect(() => {
    const handleScroll = () => {
      // Khi lướt qua Hero section (tầm 500px), hiển thị các nút trên Header
      if (window.scrollY > 500) {
        setShowNavBtns(true);
      } else {
        setShowNavBtns(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hm-page">
      {/* 1. HEADER */}
      <header className="hm-header">
        <div className="hm-container hm-header-inner">
          <Link to="/" className="hm-logo">
            <img src="https://cdn-icons-png.flaticon.com/512/3268/3268807.png" alt="Logo" className="hm-logo-icon" />
            F.A.T
          </Link>
          <ul className="hm-nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#reservation">Contact</a></li>
          </ul>
          <div className="hm-header-actions">
            <button className="hm-icon-btn" aria-label="Search">🔍</button>
            <button className="hm-icon-btn" aria-label="Cart">🛒</button>
            <div style={{
              display: 'flex', 
              gap: '1rem', 
              opacity: showNavBtns ? 1 : 0, 
              visibility: showNavBtns ? 'visible' : 'hidden', 
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              alignItems: 'center'
             }}>
              {user ? (
                <strong style={{ fontSize: '1.2rem', color: 'var(--hm-dark)' }}>
                  Xin chào, {user.name} 👋
                </strong>
              ) : (
                <>
                  <button className="hm-btn hm-btn-yellow">Đăng nhập</button>
                  <button className="hm-btn hm-btn-red">Đăng ký</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="hm-hero" id="home">
        <div className="hm-container hm-hero-wrap">
          <div className="hm-hero-content">
            <h1 className="hm-hero-title">
              Best Food for <br />
              <span className="hm-highlight">Best Restaurants</span>
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Enjoy our signature dishes with friends and family in a warm <br />
              and inviting atmosphere.
            </p>
            <div className="hm-hero-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="hm-btn hm-btn-yellow">Đăng nhập</button>
              <button className="hm-btn hm-btn-red">Đăng ký ngay</button>
            </div>
          </div>
          <div className="hm-hero-visual">
            <div className="hm-hero-blob"></div>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80" 
              alt="Steak Plate" 
              className="hm-hero-plate" 
            />
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" 
              alt="Pizza Slice" 
              className="hm-hero-plate-small" 
            />
            <div className="hm-hero-badge">
              <span>★</span> Top Rated
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT */}
      <section className="hm-about hm-container" id="about">
        <div className="hm-about-grid">
          <div className="hm-about-visual">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" 
              alt="Chef cooking" 
              className="hm-about-img-arch" 
            />
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80" 
              alt="Chef plating" 
              className="hm-about-img-circle" 
            />
          </div>
          <div className="hm-about-content">
            <span className="hm-subheading">About Us</span>
            <h2 className="hm-heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Feel The Taste of Foods</h2>
            <p>
              We bring you the freshest ingredients and authentic recipes passed down 
              through generations. Our chefs craft every meal with precision and passion 
              to ensure a delightful dining experience.
            </p>
            <button className="hm-btn hm-btn-red">Read More</button>
          </div>
        </div>

        <div className="hm-good-food">
          <div className="hm-about-content">
            <h2 className="hm-heading" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: '2.5rem' }}>
              Good Food Steak & <br />
              Great Restaurant
            </h2>
            <ul className="hm-features-list">
              <li><span className="hm-check">✔</span> Authentic Family Recipes</li>
              <li><span className="hm-check">✔</span> Fresh, Local Ingredients</li>
              <li><span className="hm-check">✔</span> Unforgettable Atmosphere</li>
            </ul>
            <button className="hm-btn hm-btn-red">Discover</button>
          </div>
          <div className="hm-good-food-plate">
            <div className="hm-badge-circle">
              20%
              <span>Off</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80" 
              alt="Big Steak Plate" 
              className="hm-plate-img" 
            />
          </div>
        </div>

        <div className="hm-pots-row">
          <img src="https://cdn-icons-png.flaticon.com/128/3133/3133391.png" alt="Decor" className="hm-pot-img" />
          <img src="https://cdn-icons-png.flaticon.com/128/3133/3133367.png" alt="Decor" className="hm-pot-img" />
          <img src="https://cdn-icons-png.flaticon.com/128/3133/3133405.png" alt="Decor" className="hm-pot-img" />
          <img src="https://cdn-icons-png.flaticon.com/128/3133/3133413.png" alt="Decor" className="hm-pot-img" />
        </div>
      </section>

      {/* 4. MENU */}
      <section className="hm-menu-section" id="menu">
        <div className="hm-container">
          <h2 className="hm-heading"><span className="hm-highlight">Delicious Menus</span></h2>
          <div className="hm-menu-cols">
            {/* Breakfast */}
            <div className="hm-menu-card">
              <h3>Breakfast</h3>
              {[
                { name: 'Oatmeal Bowl', price: '$12', desc: 'Fresh fruits, honey, chia seeds' },
                { name: 'Pancakes', price: '$10', desc: 'Maple syrup, butter, berries' },
                { name: 'Avocado Toast', price: '$14', desc: 'Poached eggs, sourdough' }
              ].map(i => (
                <div className="hm-menu-item" key={i.name}>
                  <div className="hm-mi-top">
                    <span className="hm-mi-name">{i.name}</span>
                    <span className="hm-mi-price">{i.price}</span>
                  </div>
                  <div className="hm-mi-desc">{i.desc}</div>
                </div>
              ))}
            </div>
            {/* Lunch */}
            <div className="hm-menu-card">
              <h3>Lunch</h3>
              {[
                { name: 'Caesar Salad', price: '$16', desc: 'Grilled chicken, croutons' },
                { name: 'Beef Burger', price: '$22', desc: 'Cheddar, fries, BBQ sauce' },
                { name: 'Pasta Carbonara', price: '$18', desc: 'Pancetta, egg, parmesan' }
              ].map(i => (
                <div className="hm-menu-item" key={i.name}>
                  <div className="hm-mi-top">
                    <span className="hm-mi-name">{i.name}</span>
                    <span className="hm-mi-price">{i.price}</span>
                  </div>
                  <div className="hm-mi-desc">{i.desc}</div>
                </div>
              ))}
            </div>
            {/* Dinner */}
            <div className="hm-menu-card">
              <h3>Dinner</h3>
              {[
                { name: 'Grilled Ribeye', price: '$35', desc: 'Mashed potatoes, asparagus' },
                { name: 'Salmon Fillet', price: '$28', desc: 'Lemon butter, quinoa' },
                { name: 'Mushroom Risotto', price: '$24', desc: 'Truffle oil, parmesan' }
              ].map(i => (
                <div className="hm-menu-item" key={i.name}>
                  <div className="hm-mi-top">
                    <span className="hm-mi-name">{i.name}</span>
                    <span className="hm-mi-price">{i.price}</span>
                  </div>
                  <div className="hm-mi-desc">{i.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="hm-services" id="services">
        <div className="hm-container hm-serv-wrap">
          <div className="hm-serv-text">
            <span className="hm-subheading">Our Features</span>
            <h2 className="hm-heading" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              We Provide Best Services
            </h2>
            <p>We are dedicated to making every dining experience memorable with top-tier hospitality and ambiance.</p>
          </div>
          <div className="hm-serv-grid">
            <div className="hm-serv-box">
              <div className="hm-serv-icon">🍽️</div>
              <h4>Fine Dining</h4>
              <p>Top level culinary arts</p>
            </div>
            <div className="hm-serv-box">
              <div className="hm-serv-icon">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Hot food in 30 mins</p>
            </div>
            <div className="hm-serv-box">
              <div className="hm-serv-icon">👨‍🍳</div>
              <h4>Master Chefs</h4>
              <p>Passionate creators</p>
            </div>
            <div className="hm-serv-box">
              <div className="hm-serv-icon">🎉</div>
              <h4>Event Hosting</h4>
              <p>Perfect for parties</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEAL OF THE WEEK */}
      <section className="hm-deal hm-container">
        <h2 className="hm-heading" style={{ display: 'block', marginBottom: '4rem' }}>
          <span className="hm-highlight">Deal of the Week</span>
        </h2>
        <div className="hm-deal-wrap">
          <div className="hm-deal-info">
            <span className="hm-subheading">Special Offer</span>
            <h2>Shroom Bacon Burger</h2>
            <ul className="hm-features-list" style={{ columns: 2 }}>
              <li><span className="hm-check">✔</span> Double Beef</li>
              <li><span className="hm-check">✔</span> Truffle Sauce</li>
              <li><span className="hm-check">✔</span> Crispy Bacon</li>
              <li><span className="hm-check">✔</span> Soft Brioche</li>
            </ul>
            <div className="hm-deal-price">
              <del>$24.00</del>
              <span>$14.50</span>
            </div>
            <button className="hm-btn hm-btn-red">Order Now</button>
          </div>
          <div className="hm-deal-visual">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" 
              alt="Deal Burger" 
              className="hm-burger-img" 
            />
            <div className="hm-deal-stickers">
              <div className="hm-deal-sticker">🍔</div>
              <div className="hm-deal-sticker">🔥</div>
              <div className="hm-deal-sticker">🍟</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EVENTS */}
      <section className="hm-events hm-container" style={{ marginBottom: '6rem' }}>
        <div className="hm-events-card">
          <div className="hm-events-grid">
            <img src="https://images.unsplash.com/photo-1545657803-b0eec8eaafba?w=400&q=80" alt="Event 1" className="hm-events-img" />
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" alt="Event 2" className="hm-events-img" />
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80" alt="Event 3" className="hm-events-img" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" alt="Event 4" className="hm-events-img" />
          </div>
          <div className="hm-events-content">
            <h2>Private Dining and Events</h2>
            <p style={{ marginBottom: '2rem' }}>
              Host your next corporate or personal celebration in our luxurious private spaces.
              We offer bespoke menus and dedicated service.
            </p>
            <button className="hm-btn hm-btn-red">Book Events</button>
          </div>
        </div>
      </section>

      {/* 8. RED BANNER */}
      <section className="hm-red-banner">
        <div className="hm-container hm-red-banner-inner">
          <div>
            <span className="hm-subheading" style={{ color: '#fff', opacity: 0.8 }}>Special Features</span>
            <h2>Highlighting its Unique Features and Experiences</h2>
            <button className="hm-btn hm-btn-yellow">Read More</button>
          </div>
          <div className="hm-red-gallery">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" alt="Pizza" className="hm-red-img hm-red-img-1" />
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" alt="Dish 2" className="hm-red-img hm-red-img-2" />
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" alt="Dish 3" className="hm-red-img hm-red-img-3" />
          </div>
        </div>
      </section>

      {/* 9. RECENT NEWS */}
      <section className="hm-news hm-container">
        <h2 className="hm-heading"><span className="hm-highlight">Recent News</span></h2>
        <div className="hm-news-grid">
          {[
            { img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80', title: 'Grand Opening Menu Series', date: 'Oct 24, 2026', author: 'Mark S.', avt: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
            { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', title: '5 Course Dinner Special', date: 'Oct 20, 2026', author: 'Chef Anna', avt: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
            { img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', title: 'Excellent Food Pairings', date: 'Oct 15, 2026', author: 'Lisa R.', avt: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
          ].map(n => (
            <article className="hm-news-card" key={n.title}>
              <img src={n.img} alt={n.title} className="hm-news-img" />
              <div className="hm-news-body">
                <span className="hm-news-date">{n.date}</span>
                <h3 className="hm-news-title">{n.title}</h3>
                <div className="hm-news-author">
                  <img src={n.avt} alt={n.author} className="hm-author-avt" />
                  <span className="hm-author-name">{n.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10. RESERVATION */}
      <section className="hm-reservation hm-container" id="reservation">
        <div className="hm-res-grid">
          <div className="hm-res-info">
            <span className="hm-subheading">Tham gia cộng đồng</span>
            <h2>Đăng ký thành viên & <br/> Tận hưởng ngập tràn ưu đãi</h2>
            <p style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Bạn chưa có tài khoản? Hãy tạo ngay một tài khoản để thỏa sức khám phá những món ăn hấp dẫn, nhận các khuyến mãi độc quyền và theo dõi đơn hàng dễ dàng.
            </p>
          </div>
          <div className="hm-res-form" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Bắt đầu trải nghiệm ngay</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {!user ? (
                <>
                  <button className="hm-btn hm-btn-red">Tham gia ngay</button>
                  <button className="hm-btn hm-btn-yellow">Đăng nhập</button>
                </>
              ) : (
                <h3 style={{ fontSize: '1.5rem', color: 'var(--hm-red)' }}>Bạn đã là thành viên vip của chúng tôi!</h3>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="hm-footer hm-container">
        <div className="hm-footer-grid">
          <div className="hm-footer-brand">
            <div className="hm-footer-logo">F.A.T</div>
            <p>We serve the best and freshest ingredients straight from the farm to your table.</p>
          </div>
          <div className="hm-footer-col">
            <h4>Quick Links</h4>
            <ul className="hm-footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#reservation">Contact</a></li>
            </ul>
          </div>
          <div className="hm-footer-col">
            <h4>Sign up for newsletter</h4>
            <p>Get the latest updates and special offers directly in your inbox.</p>
            <div className="hm-footer-sub">
              <input type="email" placeholder="Email Address..." className="hm-sub-input" />
              <button className="hm-sub-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="hm-footer-bottom">
          &copy; 2026 FAT Restaurant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
