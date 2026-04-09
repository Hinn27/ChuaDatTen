import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import useCartStore from "../../stores/useCartStore.js";

/**
 * Header chung cho toàn bộ ứng dụng - MINIMAL VERSION FOR DEBUGGING
 */
const NAV_LINKS = [
    { label: "Shop", key: "shop" },
    { label: "Products", key: "products" },
    { label: "Cart", key: "cart" },
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
        <header className="rf-header">
            <div className="rf-header-inner">
                <button
                    type="button"
                    onClick={() => navigate(`/${currentMember}/shop`)}
                    className="rf-brand"
                >
                    Refood
                </button>

                <nav className="rf-nav">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.key}
                            to={`/${currentMember}/${link.key}`}
                            className="rf-nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => navigate(`/${currentMember}/cart`)}
                    className="rf-cart-btn"
                >
                    Gio hang ({totalItems})
                </button>

                <button
                    type="button"
                    onClick={() => navigate(isLoggedIn ? "/profile" : "/auth")}
                    className={`rf-auth-btn ${isLoggedIn ? "is-logged" : ""}`}
                >
                    {isLoggedIn ? "Tai khoan" : "Dang nhap"}
                </button>
            </div>
        </header>
    );
}
