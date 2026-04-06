export function HomePageFooter({ activeSection = "home", onSectionClick }) {
    const handleScrollLinkClick = (targetId) => (event) => {
        event.preventDefault();
        onSectionClick?.(targetId);
    };

    return (
        <footer className="fg-footer" id="lien-he">
            <div className="fg-wrap fg-footer-grid">
                <div className="fg-footer-brand">
                    <h3>Cỏ Lau</h3>
                    <p>
                        Khám phá món ngon Việt Nam theo vùng, theo danh mục và
                        theo đúng gu ăn uống của bạn.
                    </p>
                </div>
                <div>
                    <h4>Khám phá</h4>
                    <ul>
                        <li>
                            <a
                                className={
                                    activeSection === "home" ? "is-active" : ""
                                }
                                href="#home"
                                onClick={handleScrollLinkClick("home")}
                            >
                                Trang chủ
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Danh mục
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "bestsellers"
                                        ? "is-active"
                                        : ""
                                }
                                href="#bestsellers"
                                onClick={handleScrollLinkClick("bestsellers")}
                            >
                                Bestsellers
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "dac-san-viet"
                                        ? "is-active"
                                        : ""
                                }
                                href="#dac-san-viet"
                                onClick={handleScrollLinkClick("dac-san-viet")}
                            >
                                Đặc sản Việt
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>Danh mục</h4>
                    <ul>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Cơm
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Bún/Mì/Phở
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Món chiên
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Đồ uống
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    activeSection === "category-main"
                                        ? "is-active"
                                        : ""
                                }
                                href="#category-main"
                                onClick={handleScrollLinkClick("category-main")}
                            >
                                Tráng miệng
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="fg-footer-contact">
                    <h4>Liên hệ</h4>
                    <ul>
                        <li>
                            <a
                                className="fg-footer-link--plain"
                                href="tel:0900000000"
                            >
                                Hotline: 0900 000 000
                            </a>
                        </li>
                        <li>
                            <a
                                className="fg-footer-link--plain"
                                href="mailto:hello@colau.vn"
                            >
                                Email: hello@colau.vn
                            </a>
                        </li>
                        <li>
                            <a
                                className="fg-footer-link--plain"
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Facebook: /colau.vn
                            </a>
                        </li>
                        <li>
                            <a
                                className="fg-footer-link--plain"
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram: @colau.vn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="fg-wrap fg-footer-bottom">
                <span>2026 All Rights Reserved</span>
                <span>Made with love for Vietnamese food</span>
            </div>
        </footer>
    );
}
