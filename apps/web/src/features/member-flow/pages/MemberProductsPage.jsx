import { Alert, Box, Chip, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
    const { member } = useParams();
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
        <AppPageLayout>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#1A1A2E", mb: 1 }}
            >
                Danh sách món - {profile.displayName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
                member {profile.label.toLowerCase()} phụ trách danh mục{" "}
                {profile.displayName}.
            </Typography>

            {usingMockData && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Đang dùng dữ liệu mock để demo vì API sản phẩm chưa sẵn
                    sàng.
                </Alert>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category === "all" ? "Tất cả" : category}
                        color={
                            selectedCategory === category
                                ? "primary"
                                : "default"
                        }
                        onClick={() => setCategory(category)}
                    />
                ))}
            </Box>

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
