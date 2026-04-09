import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="shared-home-footer">
      <div className="shared-home-wrap shared-home-footer-grid">
        <div className="shared-home-footer-brand">
          <h3>Cỏ Lau</h3>
          <p>
            Khám phá món ngon Việt Nam theo vùng, theo danh mục và theo đúng gu ăn uống của bạn.
          </p>
          <div className="shared-home-store-badges">
            <span>App Store</span>
            <span>Google Play</span>
          </div>
        </div>

        <div>
          <h4>Khám phá</h4>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/a/shop">Danh mục</Link>
            </li>
            <li>
              <Link to="/a/products">Bestsellers</Link>
            </li>
            <li>
              <Link to="/profile">Tài khoản</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Danh mục</h4>
          <ul>
            <li>
              <Link to="/a/shop">Cơm</Link>
            </li>
            <li>
              <Link to="/b/shop">Bún/Mì/Phở</Link>
            </li>
            <li>
              <Link to="/c/shop">Món chiên</Link>
            </li>
            <li>
              <Link to="/d/shop">Đồ uống</Link>
            </li>
            <li>
              <Link to="/e/shop">Tráng miệng</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Liên hệ</h4>
          <ul>
            <li>
              <a className="shared-home-footer-link-plain" href="tel:0900000000">Hotline: 0900 000 000</a>
            </li>
            <li>
              <a className="shared-home-footer-link-plain" href="mailto:hello@colau.vn">Email: hello@colau.vn</a>
            </li>
            <li>
              <a className="shared-home-footer-link-plain" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook: /colau.vn</a>
            </li>
            <li>
              <a className="shared-home-footer-link-plain" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram: @colau.vn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shared-home-wrap shared-home-footer-bottom">
        <span>© {new Date().getFullYear()} Cỏ Lau. All rights reserved.</span>
        <span>Made with love for Vietnamese food</span>
      </div>
    </footer>
  )
}
