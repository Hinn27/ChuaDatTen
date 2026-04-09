import {
    Alert,
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppPageLayout } from "../../../components/common/AppPageLayout.jsx";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner.jsx";
import { ProductList } from "../../../components/product/ProductList.jsx";
import { getMemberProfile } from "../../../shared/constants/memberProfiles.js";
import useCartStore from "../../../stores/useCartStore.js";
import useProductStore from "../../../stores/useProductStore.js";

/**
 * MemberProductsPage - Trang danh sách món theo member/category.
 */
export function MemberProductsPage() {
    const navigate = useNavigate();
    const { member } = useParams();
    const currentMember = member || "a";
    const profile = getMemberProfile(member);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const loading = useProductStore((state) => state.loading);
    const error = useProductStore((state) => state.error);
    const selectedCategory = useProductStore((state) => state.selectedCategory);
    const usingMockData = useProductStore((state) => state.usingMockData);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const setCategory = useProductStore((state) => state.setCategory);
    const getCategories = useProductStore((state) => state.getCategories);
    const getFilteredProducts = useProductStore(
        (state) => state.getFilteredProducts,
    );

    useEffect(() => {
        setActiveMember(member);
        fetchProducts();
        setCategory(profile.defaultCategory);
    }, [
        fetchProducts,
        member,
        profile.defaultCategory,
        setActiveMember,
        setCategory,
    ]);

    const categories = getCategories();
    const products = getFilteredProducts();

    return (
        <AppPageLayout
            maxWidth="xl"
            containerSx={{
                py: { xs: 3, md: 5 },
            }}
        >
            <Paper
                sx={{
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 4,
                    mb: 3,
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
                            Danh sách món - {profile.displayName}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.88)",
                                maxWidth: 620,
                            }}
                        >
                            Chọn món theo danh mục, lọc nhanh theo nhu cầu và
                            tiếp tục mua sắm mượt mà trong cùng flow member.
                        </Typography>
                    </Box>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.2}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/${currentMember}/shop`)}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#ffbe30",
                                color: "#173334",
                                fontWeight: 800,
                                borderRadius: 2,
                                "&:hover": { bgcolor: "#f2b328" },
                            }}
                        >
                            Về trang shop
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/${currentMember}/cart`)}
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

            {usingMockData && (
                <Alert severity="info" sx={{ mb: 2.5 }}>
                    Đang dùng dữ liệu mock để demo vì API sản phẩm chưa sẵn
                    sàng.
                </Alert>
            )}

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
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 1.4 }}
                >
                    <Box
                        aria-hidden
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "#e76f51",
                        }}
                    />
                    <Typography sx={{ fontWeight: 800, color: "#16302b" }}>
                        Lọc theo danh mục
                    </Typography>
                </Stack>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <Chip
                                key={category}
                                label={category === "all" ? "Tất cả" : category}
                                onClick={() => setCategory(category)}
                                sx={{
                                    fontWeight: 700,
                                    color: isActive ? "#173334" : "#4d675f",
                                    bgcolor: isActive ? "#ffbe30" : "#edf5f0",
                                    border: isActive
                                        ? "1px solid #e7aa28"
                                        : "1px solid #d3e4db",
                                }}
                            />
                        );
                    })}
                </Box>
            </Paper>

            {loading ? (
                <LoadingSpinner message="Đang tải danh sách món ăn..." />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <ProductList
                    products={products}
                    emptyMessage="Không có món ăn trong danh mục này."
                />
            )}
        </AppPageLayout>
    );
}
