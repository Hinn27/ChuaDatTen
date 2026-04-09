import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useCart } from "../hooks/useCart";
import useMemberC from "../hooks/useMemberC";

function formatCurrency(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

function cardStyle() {
    return {
        background: "#fff",
        border: "1px solid #ffd8c4",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(122,53,12,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
    };
}

export default function MemberCCategoryPage() {
    const { member } = useParams();
    const navigate = useNavigate();
    const {
        fetchProducts,
        fetchCategory,
        searchProducts,
        products,
        category,
        loading,
        error,
        pagination,
    } = useMemberC();
    const { addToCart } = useCart();

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchCategory();
        fetchProducts({ page: currentPage, limit: 12, sortBy });
    }, [currentPage, sortBy, fetchCategory, fetchProducts]);

    const stats = useMemo(() => {
        return {
            productCount: category?.productCount || products.length,
            averageRating: category?.averageRating || 0,
        };
    }, [category, products.length]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        setCurrentPage(1);

        if (value.trim()) {
            searchProducts(value.trim(), 20);
            return;
        }

        fetchProducts({ page: 1, limit: 12, sortBy });
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setCurrentPage(1);
    };

    const handleAddToCart = (product) => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.imageUrl,
            },
            1,
        );
    };

    if (loading && !category) {
        return (
            <LoadingSpinner message="Đang tải dữ liệu danh mục Member C..." />
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "24px",
                background:
                    "radial-gradient(circle at 8% 10%, rgba(255,157,99,0.25), transparent 34%), radial-gradient(circle at 90% 85%, rgba(255,119,0,0.12), transparent 38%), linear-gradient(180deg, #fff7f3 0%, #fffaf5 100%)",
            }}
        >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                {category ? (
                    <section
                        style={{
                            padding: "20px",
                            borderRadius: "20px",
                            color: "#fff",
                            marginBottom: "20px",
                            background:
                                "linear-gradient(130deg, rgba(78,31,9,0.95) 0%, rgba(194,65,12,0.93) 62%, rgba(251,146,60,0.9) 100%)",
                            boxShadow: "0 24px 48px rgba(122,53,12,0.24)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "12px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <h1 style={{ margin: 0, fontSize: "32px" }}>
                                    {category.displayName}
                                </h1>
                                <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
                                    {category.description}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/${member || "c"}/cart`)
                                }
                                style={{
                                    border: 0,
                                    padding: "10px 16px",
                                    borderRadius: 999,
                                    cursor: "pointer",
                                    fontWeight: 700,
                                    color: "#4e1f09",
                                    background: "#fdba74",
                                }}
                            >
                                Xem giỏ hàng
                            </button>
                        </div>

                        <div
                            style={{
                                marginTop: "14px",
                                display: "grid",
                                gap: "10px",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(140px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    background: "rgba(255,255,255,0.14)",
                                    padding: "10px",
                                    borderRadius: 10,
                                }}
                            >
                                <strong>Sản phẩm</strong>
                                <div>{stats.productCount}</div>
                            </div>
                            <div
                                style={{
                                    background: "rgba(255,255,255,0.14)",
                                    padding: "10px",
                                    borderRadius: 10,
                                }}
                            >
                                <strong>Đánh giá</strong>
                                <div>{stats.averageRating}/5</div>
                            </div>
                            <div
                                style={{
                                    background: "rgba(255,255,255,0.14)",
                                    padding: "10px",
                                    borderRadius: 10,
                                }}
                            >
                                <strong>Nổi bật</strong>
                                <div>Theo vùng miền</div>
                            </div>
                            <div
                                style={{
                                    background: "rgba(255,255,255,0.14)",
                                    padding: "10px",
                                    borderRadius: 10,
                                }}
                            >
                                <strong>Thành viên</strong>
                                <div>C</div>
                            </div>
                        </div>
                    </section>
                ) : null}

                <section
                    style={{
                        background: "#fff",
                        border: "1px solid #ffd8c4",
                        borderRadius: "16px",
                        padding: "16px",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gap: "10px",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(240px, 1fr))",
                        }}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Tìm món theo tên, vùng miền..."
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: "1px solid #f3b28d",
                            }}
                        />

                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: "1px solid #f3b28d",
                            }}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá: Thấp đến cao</option>
                            <option value="price-desc">
                                Giá: Cao đến thấp
                            </option>
                            <option value="rating">Đánh giá cao nhất</option>
                        </select>
                    </div>
                </section>

                {error ? (
                    <div
                        style={{
                            marginBottom: "16px",
                            color: "#b42318",
                            background: "#fee4e2",
                            border: "1px solid #fecdca",
                            borderRadius: "12px",
                            padding: "10px 12px",
                        }}
                    >
                        {error}
                    </div>
                ) : null}

                {loading ? (
                    <div style={{ padding: "40px 0" }}>
                        <LoadingSpinner message="Đang tải sản phẩm..." />
                    </div>
                ) : products.length ? (
                    <>
                        <div
                            style={{
                                display: "grid",
                                gap: "16px",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(240px, 1fr))",
                            }}
                        >
                            {products.map((product) => (
                                <article key={product.id} style={cardStyle()}>
                                    <img
                                        src={
                                            product.image ||
                                            product.imageUrl ||
                                            "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop"
                                        }
                                        alt={product.name}
                                        style={{
                                            width: "100%",
                                            height: 180,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div style={{ padding: "12px" }}>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#8a3a12",
                                            }}
                                        >
                                            {product.region ||
                                                product.category ||
                                                "Món chiên"}
                                        </div>
                                        <h3
                                            onClick={() =>
                                                navigate(
                                                    `/${member || "c"}/products/${product.id}`,
                                                )
                                            }
                                            style={{
                                                margin: "8px 0 6px",
                                                fontSize: 18,
                                                color: "#4e1f09",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {product.name}
                                        </h3>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#8a3a12",
                                                minHeight: 42,
                                            }}
                                        >
                                            {product.description}
                                        </p>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontWeight: 800,
                                                color: "#c2410c",
                                            }}
                                        >
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button
                                            type="button"
                                            disabled={product.stock <= 0}
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                            style={{
                                                marginTop: 10,
                                                width: "100%",
                                                border: 0,
                                                borderRadius: 10,
                                                padding: "10px",
                                                cursor: "pointer",
                                                color: "#fff",
                                                fontWeight: 700,
                                                background:
                                                    product.stock <= 0
                                                        ? "#9ca3af"
                                                        : "#f97316",
                                            }}
                                        >
                                            {product.stock <= 0
                                                ? "Hết hàng"
                                                : "Thêm vào giỏ"}
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {pagination && pagination.totalPages > 1 ? (
                            <div
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1),
                                        )
                                    }
                                    disabled={!pagination.hasPrev}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        border: "1px solid #f3b28d",
                                    }}
                                >
                                    Trang trước
                                </button>
                                <span>
                                    Trang {pagination.page} /{" "}
                                    {pagination.totalPages}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={!pagination.hasNext}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        border: "1px solid #f3b28d",
                                    }}
                                >
                                    Trang sau
                                </button>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "40px 20px",
                            borderRadius: 12,
                            border: "1px dashed #f3b28d",
                            background: "#fff",
                        }}
                    >
                        <h3 style={{ margin: 0, color: "#4e1f09" }}>
                            Không tìm thấy sản phẩm nào
                        </h3>
                        <p style={{ margin: "8px 0 0", color: "#8a3a12" }}>
                            Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc sắp xếp.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
