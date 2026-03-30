import React, { useState } from 'react';
import { Header } from '../components/home/Header';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { MenuSection } from '../components/home/MenuSection';
import { Services } from '../components/home/Services';
import { DealOfTheWeek } from '../components/home/DealOfTheWeek';
import { PrivateDining } from '../components/home/PrivateDining';
import { HighlightFeatures } from '../components/home/HighlightFeatures';
import { RecentNews } from '../components/home/RecentNews';
import { Footer } from '../components/home/Footer';
import { LoginModal } from '../components/auth/LoginModal';

import './HomePage.css'; // Optional: overall layout resets if needed

// Layout chính của trang chủ, chứa tất cả các phần (section)
export const HomePage = () => {
  // Trạng thái quản lý việc ẩn/hiện popup Đăng Nhập
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="home-layout">
      {/* Phần đầu trang: Gọi hành động mở popup nếu người dùng chọn Đăng nhập */}
      <Header onLoginClick={() => setIsLoginOpen(true)} />
      
      {/* Banner chính (Hero): Nơi chứa ô nhập Email và nút Đăng Nhập/Đăng Ký */}
      <Hero onLoginClick={() => setIsLoginOpen(true)} />
      
      {/* Các tính năng nổi bật của nhà hàng */}
      <Features />
      
      {/* Khu vực hiển thị Thực Đơn (Menu) */}
      <MenuSection />
      
      {/* Các dịch vụ đi kèm (Delivery, Catering,...) */}
      <Services />
      
      {/* Món ăn bán chạy nhất (Được tính toán động từ dữ liệu) */}
      <DealOfTheWeek />
      
      {/* Khu vực đặt phòng ăn riêng/VIP */}
      <PrivateDining />
      
      {/* Các đặc điểm nổi bật khác (Highlight) */}
      <HighlightFeatures />
      
      {/* Tin tức/Blog ẩm thực mới nhất */}
      <RecentNews />
      
      {/* Chân trang chứa thông tin liên hệ và bản đồ */}
      <Footer />

      {/* Component Popup Đăng Nhập, đặt ở cuối để đè lên các layout khác khi mở */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
