import React from 'react';
import {
  Header,
  Hero,
  About,
  Menu,
  Services,
  DealOfWeek,
  Events,
  HighlightFeatures,
  RecentNews,
  Footer
} from '../components';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="hm-page">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Services />
      <DealOfWeek />
      <Events />
      <HighlightFeatures />
      <RecentNews />
      <Footer />
    </div>
  );
}
