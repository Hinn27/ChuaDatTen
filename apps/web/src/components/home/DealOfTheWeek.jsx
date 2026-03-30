import React from 'react';
import './DealOfTheWeek.css';

/**
 * Mảng dữ liệu mẫu (Mock data) cho phần "Best Seller" (Bán chạy nhất).
 * Dữ liệu này giả lập phản hồi từ cơ sở dữ liệu chứa danh sách các món ăn.
 * Hệ thống sẽ tự động phân tích mảng này và hiển thị món có thuộc tính `sales` cao nhất.
 * Nếu bạn tải lại trang sau khi thay đổi `sales` của món khác (hoặc khi gọi API thật),
 * giao diện sẽ tự động chuyển sang hiển thị món bán chạy nhất mới đó.
 */
const mockProducts = [
  {
    id: 1,
    name: 'Classic Steak',
    oldPrice: '$45.00',
    currentPrice: '$35.00',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 125, // Số lượng đã bán hiện tại
    tagline: 'HOT SALE 20% OFF',
    ingredients: ['🥩 Premium Beef', '🥦 Veggies', '🥔 Potato', '🍷 Sauce']
  },
  {
    id: 2,
    name: 'Truffle Pasta',
    oldPrice: '$32.00',
    currentPrice: '$25.00',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 310, // Số lượng đã bán hiện tại
    tagline: 'HOT SALE 15% OFF',
    ingredients: ['🍝 Pasta', '🍄 Truffle', '🧀 Parmesan', '🌿 Herbs']
  },
  {
    id: 3,
    name: 'Chicken Bacon Burger',
    oldPrice: '$29.99',
    currentPrice: '$19.90',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 850, // <--- Lượt mua cao nhất hiện tại, đối tượng này sẽ được kết xuất động (render) thành món Best Seller
    tagline: 'HOT SALE 33% OFF',
    ingredients: ['🍗 Meat', '🥬 Lettuce', '🧀 Cheese', '🍞 Bun']
  }
];

export const DealOfTheWeek = () => {
  /**
   * Truy xuất ra món ăn có lượt `sales` lớn nhất trong mảng `mockProducts`.
   * Sử dụng vòng lặp chuẩn của JS là reduce() để so sánh và ghi đè giá trị `sales` tuỳ ý.
   * `bestSeller` cuối cùng sẽ ôm toàn bộ dữ liệu (object) của món bán chạy nhất.
   */
  const bestSeller = mockProducts.reduce((prev, current) => (prev.sales > current.sales) ? prev : current);

  return (
    <section className="deal-section">
      <div className="container">
        {/* Khu vực Tiêu đề (Header) cho khối Bán chạy nhất */}
        <div className="section-title">
          <span className="text-cursive">Most Popular</span>
          <h2>Best Seller</h2>
        </div>
        
        {/* Nội dung hiển thị tự động lấy từ chuỗi dữ liệu chứa trong bestSeller object */}
        <div className="deal-content">
          <div className="deal-info">
            <span className="badge-promo">{bestSeller.tagline}</span>
            <h3 className="section-title-left mt-30">{bestSeller.name}</h3>
            
            <div className="sales-banner mb-20" style={{ fontWeight: 600, color: 'var(--text-gray)' }}>
              🔥 {bestSeller.sales} people bought this recently!
            </div>

            <ul className="feature-list deal-features">
              <li><span className="check">✓</span> Fresh Ingredients</li>
              <li><span className="check">✓</span> Tasty Meals</li>
              <li><span className="check">✓</span> Quick Delivery</li>
            </ul>
            
            {/* Hiển thị Giá Gốc và Giá Đã Giảm tự động */}
            <div className="deal-price mt-30">
              <span className="old-price">{bestSeller.oldPrice}</span>
              <span className="current-price">{bestSeller.currentPrice}</span>
            </div>
            <button className="btn-primary mt-30">Order Now</button>
          </div>
          
          <div className="deal-image">
            {/* Ảnh Sản Phẩm Trích Lọc Động */}
            <img src={bestSeller.image} alt={bestSeller.name} className="main-burger-img" />
            
            {/* Duyệt qua mảng thành phần món ăn (ingredients) của bestSeller để lặp HTML in ra màn hình  */}
            <div className="ingredients">
              {bestSeller.ingredients.map((ing, idx) => (
                <div key={idx} className={`ingredient-box top-${idx + 1}`}>{ing}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
