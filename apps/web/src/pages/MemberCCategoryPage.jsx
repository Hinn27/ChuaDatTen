import {
    Alert,
    Box,
    Button,
    Chip,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPageLayout } from "../components/common/AppPageLayout.jsx";
import { useCart } from "../hooks/useCart";
import { useMemberC } from "../hooks/useMemberC";
import { getMemberProfile } from "../shared/constants/memberProfiles.js";

function formatPrice(value) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value || 0);
}

function SectionTitle({ title, description }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                }}
            >
                <span
                    aria-hidden
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#e76f51",
                        display: "inline-block",
                    }}
                />
                <h2
                    style={{
                        margin: 0,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#16302b",
                    }}
                >
                    {title}
                </h2>
            </div>
            <p style={{ margin: 0, color: "#5d746d" }}>{description}</p>
        </div>
    );
}

function ProductCard({ product, member, onAdd }) {
    return (
        <article
            onClick={() => {
                window.location.assign(`/${member}/products/${product.id}`);
            }}
            style={{
                background: "#fff",
                border: "1px solid #ffd8c4",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 24px rgba(122,53,12,0.08)",
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
                cursor: "pointer",
            }}
        >
            <img
                src={
                    product.image ||
                    product.imageUrl ||
                    "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop"
                }
                alt={product.name}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div
                style={{
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <div
                    style={{ fontSize: 12, color: "#8a3a12", marginBottom: 6 }}
                >
                    {product.region || product.category || "Món chiên"}
                </div>
                <h3
                    style={{
                        margin: "0 0 6px",
                        fontSize: 18,
                        color: "#4e1f09",
                    }}
                >
                    {product.name}
                </h3>
                <p
                    style={{
                        margin: 0,
                        color: "#8a3a12",
                        minHeight: 42,
                        flex: 1,
                    }}
                >
                    {product.description}
                </p>
                <div
                    style={{ marginTop: 10, fontWeight: 800, color: "#c2410c" }}
                >
                    {formatPrice(product.price)}
                </div>
                <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={(event) => {
                        event.stopPropagation();
                        onAdd(product);
                    }}
                    style={{
                        marginTop: 10,
                        width: "100%",
                        border: 0,
                        borderRadius: 10,
                        padding: "10px",
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 700,
                        background: product.stock <= 0 ? "#9ca3af" : "#f97316",
                    }}
                >
                    {product.stock <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
                </button>
            </div>
        </article>
    );
}

export default function MemberCCategoryPage() {
    const navigate = useNavigate();
    const profile = getMemberProfile("c");
    const currentMember = "c";
    const { addToCart } = useCart();
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

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    useEffect(() => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            searchProducts(trimmedQuery, 10);
            return;
        }

        fetchProducts({ page: currentPage, limit: 10, sortBy });
    }, [currentPage, fetchProducts, searchProducts, searchQuery, sortBy]);

    const heroCategory = category || profile;
    const featuredProducts = products.slice(0, 4);
    const menuProducts = products;
    const showPagination =
        !searchQuery.trim() && pagination && pagination.totalPages > 1;

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        setCurrentPage(1);

        if (value.trim()) {
            searchProducts(value.trim(), 10);
            return;
        }

        fetchProducts({ page: 1, limit: 10, sortBy });
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
            <AppPageLayout maxWidth="xl" containerSx={{ py: { xs: 3, md: 5 } }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <div style={{ padding: 24, textAlign: "center" }}>
                        Đang tải dữ liệu danh mục Member C...
                    </div>
                </div>
            </AppPageLayout>
        );
    }

    return (
        <AppPageLayout maxWidth="xl" containerSx={{ py: { xs: 3, md: 5 } }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <Paper
                    sx={{
                        p: { xs: 2.5, md: 3.5 },
                        borderRadius: 4,
                        mb: 4,
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.26)",
                        background:
                            "linear-gradient(135deg, rgba(23,51,52,0.96) 0%, rgba(32,87,68,0.92) 58%, rgba(231,111,81,0.88) 100%)",
                        boxShadow: "0 24px 48px rgba(22,48,43,0.22)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            right: -80,
                            top: -110,
                            width: 280,
                            height: 280,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.24), rgba(255,255,255,0))",
                            pointerEvents: "none",
                        },
                    }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        spacing={2}
                        sx={{ position: "relative", zIndex: 1 }}
                    >
                        <Box>
                            <Chip
                                label={`Member ${profile.label} · ${profile.displayName}`}
                                sx={{
                                    mb: 1.2,
                                    bgcolor: "#ffbe30",
                                    color: "#173334",
                                    fontWeight: 800,
                                    "& .MuiChip-label": { px: 1 },
                                }}
                            />
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#fff",
                                    fontWeight: 900,
                                    letterSpacing: "-0.01em",
                                    mb: 0.5,
                                }}
                            >
                                Danh mục Món Chiên
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.88)",
                                    maxWidth: 620,
                                }}
                            >
                                Cửa hàng C chuyên phục vụ món chiên và thực đơn
                                theo vùng miền
                            </Typography>
                        </Box>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.2}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/${currentMember}/products`)
                                }
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "#ffbe30",
                                    color: "#173334",
                                    fontWeight: 800,
                                    borderRadius: 2,
                                    "&:hover": { bgcolor: "#f2b328" },
                                }}
                            >
                                Xem danh sách món
                            </Button>
                            <Button
                                onClick={() =>
                                    navigate(`/${currentMember}/cart`)
                                }
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    color: "#fff",
                                    borderColor: "rgba(255,255,255,0.6)",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    "&:hover": {
                                        borderColor: "#fff",
                                        bgcolor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                Xem giỏ hàng
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>

                <Paper
                    sx={{
                        p: { xs: 2, md: 2.4 },
                        mb: 3,
                        borderRadius: 3,
                        border: "1px solid #d9e8e0",
                        boxShadow: "0 10px 28px rgba(22,48,43,0.08)",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(247,252,249,0.97))",
                    }}
                >
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Tìm món theo tên, vùng miền..."
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #d3e4db",
                            }}
                        />

                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #d3e4db",
                            }}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá: Thấp → Cao</option>
                            <option value="price-desc">Giá: Cao → Thấp</option>
                            <option value="rating">Đánh giá cao nhất</option>
                        </select>
                    </Stack>
                </Paper>

                {error ? (
                    <Alert severity="error" sx={{ mb: 2.5 }}>
                        {error}
                    </Alert>
                ) : null}

                <SectionTitle
                    title={`Món nổi bật - ${profile.displayName}`}
                    description="Gợi ý nổi bật theo member, ưu tiên món đang được quan tâm nhiều."
                />

                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                            xs: "repeat(1, minmax(0, 1fr))",
                            sm: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(3, minmax(0, 1fr))",
                            lg: "repeat(4, minmax(0, 1fr))",
                        },
                        mb: 5,
                    }}
                >
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            member={currentMember}
                            onAdd={handleAddToCart}
                        />
                    ))}
                </Box>

                <SectionTitle
                    title={`Thực đơn - ${profile.displayName}`}
                    description="Mỗi hàng hiển thị 5 món, mỗi trang 10 món để dễ xem và lật nhanh."
                />

                {loading ? (
                    <div style={{ padding: "40px 0" }}>
                        Đang tải sản phẩm...
                    </div>
                ) : menuProducts.length ? (
                    <>
                        <Box
                            sx={{
                                display: "grid",
                                gap: 2,
                                gridTemplateColumns: {
                                    xs: "repeat(1, minmax(0, 1fr))",
                                    sm: "repeat(2, minmax(0, 1fr))",
                                    md: "repeat(3, minmax(0, 1fr))",
                                    lg: "repeat(5, minmax(0, 1fr))",
                                },
                            }}
                        >
                            {menuProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    member={currentMember}
                                    onAdd={handleAddToCart}
                                />
                            ))}
                        </Box>

                        {showPagination ? (
                            <Stack
                                direction="row"
                                justifyContent="center"
                                sx={{ mt: 3 }}
                            >
                                <Pagination
                                    page={pagination?.page || currentPage}
                                    count={pagination?.totalPages || 1}
                                    onChange={(_, value) =>
                                        setCurrentPage(value)
                                    }
                                    color="primary"
                                    shape="rounded"
                                    siblingCount={1}
                                    boundaryCount={1}
                                    sx={{
                                        "& .MuiPaginationItem-root": {
                                            fontWeight: 700,
                                        },
                                    }}
                                />
                            </Stack>
                        ) : null}
                    </>
                ) : (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 5,
                            borderRadius: 3,
                            border: "1px dashed #f3b28d",
                            background: "#fff",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#4e1f09", fontWeight: 700 }}
                        >
                            Không tìm thấy sản phẩm nào
                        </Typography>
                        <Typography sx={{ color: "#8a3a12", mt: 0.6 }}>
                            Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc sắp xếp.
                        </Typography>
                    </Box>
                )}
            </div>
        </AppPageLayout>
    );
}
