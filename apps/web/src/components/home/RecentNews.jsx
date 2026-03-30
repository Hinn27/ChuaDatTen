import React from 'react';
import './RecentNews.css';

const newsItems = [
  {
    img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 01, 2023',
    title: 'Discover Unique Menu',
    author: 'Admin'
  },
  {
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 03, 2023',
    title: 'A Fine Baker',
    author: 'Admin'
  },
  {
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 05, 2023',
    title: 'Excellent Food Promo',
    author: 'Admin'
  }
];

export const RecentNews = () => {
  return (
    <section id="news" className="news-section">
      <div className="container">
        <div className="section-title">
          <span className="text-cursive">Our Blog</span>
          <h2>Recent News</h2>
        </div>
        
        <div className="news-grid">
          {newsItems.map((news, idx) => (
            <div key={idx} className="news-card">
              <div className="news-img-wrap">
                <img src={news.img} alt={news.title} />
              </div>
              <div className="news-content">
                <div className="news-date">{news.date}</div>
                <h3 className="news-title">{news.title}</h3>
                <div className="news-author">
                  <span className="author-icon">👤</span>
                  {news.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
