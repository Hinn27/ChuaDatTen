import { Alert, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppPageLayout } from "../../../components/common/AppPageLayout.jsx";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner.jsx";
import { ProductDetail } from "../../../components/product/ProductDetail.jsx";
import { getMemberProfile } from "../../../shared/constants/memberProfiles.js";
import useCartStore from "../../../stores/useCartStore.js";
import useProductStore from "../../../stores/useProductStore.js";

/**
 * MemberProductDetailPage - Trang chi tiết món ăn theo member route.
 */
export function MemberProductDetailPage() {
    const { member, id } = useParams();
    const profile = getMemberProfile(member);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const { selectedProduct, loading, error, fetchProductById } =
        useProductStore();

    useEffect(() => {
        setActiveMember(member);
        fetchProductById(id);
    }, [fetchProductById, id, member, setActiveMember]);

    return (
        <AppPageLayout>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#1A1A2E", mb: 2 }}
            >
                Chi tiết món - member {profile.label.toLowerCase()} (
                {profile.displayName})
            </Typography>

            {loading ? (
                <LoadingSpinner message="Đang tải chi tiết món ăn..." />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <ProductDetail product={selectedProduct} />
            )}
        </AppPageLayout>
    );
}
