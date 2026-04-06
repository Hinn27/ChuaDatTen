import { Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";

export function HomePageHeader({ activeSection = "home", onSectionClick }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const profileLabel = isLoggedIn ? "Tôi" : "Đăng nhập/đăng ký";

    const handleSectionClick = (targetId) => (event) => {
        event.preventDefault();
        onSectionClick?.(targetId);
    };

    const handleLogoClick = (event) => {
        event.preventDefault();
        onSectionClick?.("home", { offset: 0 });
    };

    return (
        <header className="fg-header">
            <div className="fg-wrap fg-header-inner">
                <Link to="/" className="fg-logo" onClick={handleLogoClick}>
                    Cỏ Lau
                </Link>
                <nav className="fg-nav">
                    <a
                        className={`fg-nav-link fg-nav-link--pill ${
                            activeSection === "category-main" ? "is-active" : ""
                        }`}
                        href="#category-main"
                        onClick={handleSectionClick("category-main")}
                    >
                        Danh mục
                    </a>
                    <a
                        className={`fg-nav-link fg-nav-link--pill ${
                            activeSection === "bestsellers" ? "is-active" : ""
                        }`}
                        href="#bestsellers"
                        onClick={handleSectionClick("bestsellers")}
                    >
                        Bestsellers
                    </a>
                    <a
                        className={`fg-nav-link fg-nav-link--pill ${
                            activeSection === "dac-san-viet" ? "is-active" : ""
                        }`}
                        href="#dac-san-viet"
                        onClick={handleSectionClick("dac-san-viet")}
                    >
                        Đặc sản Việt
                    </a>
                    <a
                        className={`fg-nav-link fg-nav-link--pill ${
                            activeSection === "lien-he" ? "is-active" : ""
                        }`}
                        href="#lien-he"
                        onClick={handleSectionClick("lien-he")}
                    >
                        Liên hệ
                    </a>
                </nav>
                <div className="fg-search-box">Tìm kiếm món ngon</div>
                <div className="fg-icons">
                    <span className="fg-header-action">Yêu thích</span>
                    <span className="fg-header-action">Giỏ hàng</span>
                    <span className="fg-header-action">Thông báo</span>
                    <span className="fg-header-action fg-header-action--primary">
                        {profileLabel}
                    </span>
                </div>
            </div>
        </header>
    );
}
