import React from 'react';
import './MenuSection.css';

const menuItems = [
  { name: 'Oatmeal', desc: 'Fresh meal', price: '$12', highlight: true },
  { name: 'Avocado Toast', desc: 'Fresh meal', price: '$8', highlight: false },
  { name: 'Pancakes', desc: 'Fresh meal', price: '$15', highlight: false },
  { name: 'Waffles', desc: 'Fresh meal', price: '$10', highlight: false },
];

export const MenuSection = () => {
  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="section-title">
          <h2>Delicious Menus</h2>
          <span className="text-cursive">Our Menus</span>
        </div>
        
        <div className="menu-grid">
          {/* Breakfast */}
          <div className="menu-column">
            <h3 className="menu-time">Breakfast</h3>
            <ul className="menu-items">
              {menuItems.map((item, idx) => (
                <li key={idx} className={`menu-item ${item.highlight ? 'highlight-item' : ''}`}>
                  <div className="menu-info">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="menu-price">{item.price}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Lunch */}
          <div className="menu-column active-col">
            <h3 className="menu-time">Lunch</h3>
            <ul className="menu-items">
              {menuItems.map((item, idx) => (
                <li key={idx} className={`menu-item ${idx === 0 ? 'highlight-item' : ''}`}>
                  <div className="menu-info">
                    <h4>{item.name.replace('Oatmeal', 'Burger')}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="menu-price">{item.price}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Dinner */}
          <div className="menu-column">
            <h3 className="menu-time">Dinner</h3>
            <ul className="menu-items">
              {menuItems.map((item, idx) => (
                <li key={idx} className={`menu-item ${item.highlight ? 'highlight-item' : ''}`}>
                  <div className="menu-info">
                    <h4>{item.name.replace('Oatmeal', 'Steak')}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="menu-price">{item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
