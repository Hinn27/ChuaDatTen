import {
    Box,
    Button,
    Chip,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppPageLayout } from "../../../components/common/AppPageLayout.jsx";
import { ProductList } from "../../../components/product/ProductList.jsx";
import { getMemberProfile } from "../../../shared/constants/memberProfiles.js";
import useCartStore from "../../../stores/useCartStore.js";
import useProductStore from "../../../stores/useProductStore.js";

/**
 * MemberShopPage - Trang landing theo member/category owner.
 */
export function MemberShopPage() {
    const navigate = useNavigate();
    const { member } = useParams();
    const profile = getMemberProfile(member);
    const currentMember = member || "a";
    const [menuPage, setMenuPage] = useState(1);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const products = useProductStore((state) => state.products);

    useEffect(() => {
        setActiveMember(member);
        fetchProducts();
    }, [fetchProducts, member, setActiveMember]);

    useEffect(() => {
        setMenuPage(1);
    }, [member, products.length]);

    const featuredProducts = products
        .filter((product) => product.category === profile.defaultCategory)
        .slice(0, 4);

    const menuProducts = products.filter(
        (product) => product.category === profile.defaultCategory,
    );
    const menuPageSize = 10;
    const menuPageCount = Math.max(
        1,
        Math.ceil(menuProducts.length / menuPageSize),
    );
    const safeMenuPage = Math.min(menuPage, menuPageCount);
    const menuProductsOnPage = menuProducts.slice(
        (safeMenuPage - 1) * menuPageSize,
        safeMenuPage * menuPageSize,
    );

    const fallbackFeatured = products.slice(0, 4);
    const displayProducts = featuredProducts.length
        ? featuredProducts
        : fallbackFeatured;

    return (
        <AppPageLayout
            useContainer={false}
            containerSx={{
                py: { xs: 3, md: 5 },
            }}
        >
            <Box sx={{ maxWidth: 1280, mx: "auto" }}>
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
                                Danh mục {profile.displayName}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.88)",
                                    maxWidth: 620,
                                }}
                            >
                                Khám phá món nổi bật theo đúng luồng shop →
                                detail → cart → checkout, tối ưu cho trải nghiệm
                                đặt món nhanh và rõ ràng.
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

                <Box
                    sx={{
                        mb: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
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
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: "#16302b" }}
                    >
                        Món nổi bật - {profile.displayName}
                    </Typography>
                </Box>
                <Typography sx={{ color: "#5d746d", mb: 2.5 }}>
                    Gợi ý nổi bật theo member, ưu tiên món đang được quan tâm
                    nhiều.
                </Typography>

                <ProductList
                    products={displayProducts}
                    emptyMessage="Chưa có món nào để hiển thị."
                />

                <Box sx={{ mt: 5 }}>
                    <Box
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
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
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 800, color: "#16302b" }}
                        >
                            Thực đơn - {profile.displayName}
                        </Typography>
                    </Box>
                    <Typography sx={{ color: "#5d746d", mb: 2.5 }}>
                        Mỗi hàng hiển thị 5 món, mỗi trang 10 món để dễ xem và
                        lật nhanh giữa các nhóm món.
                    </Typography>

                    <ProductList
                        products={menuProductsOnPage}
                        emptyMessage="Chưa có món nào trong thực đơn này."
                        columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 5 }}
                    />

                    {menuProducts.length > menuPageSize && (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            sx={{ mt: 3 }}
                        >
                            <Pagination
                                page={safeMenuPage}
                                count={menuPageCount}
                                onChange={(_, value) => setMenuPage(value)}
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
                    )}
                </Box>
            </Box>
        </AppPageLayout>
    );
}
