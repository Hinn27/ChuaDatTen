import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import useCartStore from "../../stores/useCartStore.js";

/**
 * Header chung cho toàn bộ ứng dụng
 */
const NAV_LINKS = [
    { label: "Danh mục", key: "shop" },
    { label: "Sản phẩm", key: "products" },
    { label: "Giỏ hàng", key: "cart" },
];

export function SiteHeader() {
    const navigate = useNavigate();
    const { member } = useParams();
    const currentMember = member || "a";

    const isLoggedIn = useAuthStore((state) => state?.isLoggedIn ?? false);
    const getTotalItemsFn = useCartStore((state) => state?.getTotalItems);

    let totalItems = 0;
    try {
        if (typeof getTotalItemsFn === "function") {
            const count = getTotalItemsFn();
            totalItems = typeof count === "number" ? count : 0;
        }
    } catch (err) {
        console.error("Error calculating totalItems:", err);
    }

    return (
        <header className="shared-home-header">
            <div className="shared-home-wrap shared-home-header-inner">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="shared-home-logo"
                >
                    Cỏ Lau
                </button>

                <nav className="shared-home-nav">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.key}
                            to={`/${currentMember}/${link.key}`}
                            className="shared-home-nav-link shared-home-nav-link-pill"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="shared-home-actions">
                    <button
                        type="button"
                        onClick={() => navigate(`/${currentMember}/cart`)}
                        className="shared-home-action"
                    >
                        Giỏ hàng ({totalItems})
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(isLoggedIn ? "/profile" : "/auth")
                        }
                        className="shared-home-action shared-home-action-primary"
                    >
                        {isLoggedIn ? "Tài khoản" : "Đăng nhập"}
                    </button>
                </div>
            </div>
        </header>
    );
}
