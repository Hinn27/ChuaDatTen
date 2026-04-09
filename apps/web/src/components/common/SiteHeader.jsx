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
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "rgba(255,255,255,0.95)",
                borderBottom: "1px solid #e5e7eb",
                backdropFilter: "blur(8px)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <button
                    type="button"
                    onClick={() => navigate(`/${currentMember}/shop`)}
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontWeight: 800,
                        fontSize: 22,
                        color: "#ff4b2b",
                    }}
                >
                    Refood
                </button>

                <nav style={{ display: "flex", gap: 8, marginRight: "auto" }}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.key}
                            to={`/${currentMember}/${link.key}`}
                            style={{
                                textDecoration: "none",
                                color: "#111827",
                                padding: "6px 10px",
                                borderRadius: 8,
                                fontWeight: 500,
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => navigate(`/${currentMember}/cart`)}
                    style={{
                        border: "1px solid #d1d5db",
                        background: "white",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                    }}
                >
                    Gio hang ({totalItems})
                </button>

                <button
                    type="button"
                    onClick={() => navigate(isLoggedIn ? "/profile" : "/auth")}
                    style={{
                        border: "1px solid #ff4b2b",
                        background: isLoggedIn ? "white" : "#ff4b2b",
                        color: isLoggedIn ? "#ff4b2b" : "white",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    {isLoggedIn ? "Tai khoan" : "Dang nhap"}
                </button>
            </div>
        </header>
    );
}
