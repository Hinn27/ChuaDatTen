import React from 'react';
import './MenuSection.css';

export function MenuSection() {
  const menuCategories = [
    {
      name: 'Breakfast',
      items: [
        { name: 'Bánh Mì Ốp La', price: '25,000đ', desc: 'Bánh mì giòn, trứng ốp la, đồ chua' },
        { name: 'Xôi Mặn', price: '20,000đ', desc: 'Xôi dẻo, hành phi, chả lụa, trứng muối' },
        { name: 'Phở Bò', price: '45,000đ', desc: 'Phở bò truyền thống, nước dùng hầm xương' }
      ]
    },
    {
      name: 'Lunch',
      items: [
        { name: 'Cơm Tấm Sườn', price: '40,000đ', desc: 'Sườn nướng, bì, chả, trứng ốp la' },
        { name: 'Bún Chả Hà Nội', price: '35,000đ', desc: 'Chả viên, chả miếng, bún, rau sống' },
        { name: 'Cá Kho Tộ', price: '50,000đ', desc: 'Cá lóc kho tộ, canh chua, cơm trắng' }
      ]
    },
    {
      name: 'Dinner',
      items: [
        { name: 'Lẩu Thái', price: '120,000đ', desc: 'Lẩu hải sản chua cay kiểu Thái' },
        { name: 'Gà Nướng Mật Ong', price: '85,000đ', desc: 'Gà ta nướng mật ong, kèm rau xanh' },
        { name: 'Bò Lúc Lắc', price: '95,000đ', desc: 'Thịt bò Úc xào với rau củ, nước sốt đặc biệt' }
      ]
    }
  ];

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <h2 className="section-heading">
          <span className="heading-highlight">Thực Đơn</span> Hấp Dẫn
        </h2>
        <p className="section-subheading">Chọn bữa ăn phù hợp với bạn</p>

        <div className="menu-grid">
          {menuCategories.map(category => (
            <div className="menu-column" key={category.name}>
              <h3 className="menu-title">{category.name}</h3>
              <div className="menu-items">
                {category.items.map(item => (
                  <div className="menu-item" key={item.name}>
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                    <div className="item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
