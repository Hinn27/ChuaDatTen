import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem } from "../../../components/cart/CartItem.jsx";
import { CartSummary } from "../../../components/cart/CartSummary.jsx";
import { AppPageLayout } from "../../../components/common/AppPageLayout.jsx";
import { getMemberProfile } from "../../../shared/constants/memberProfiles.js";
import useCartStore from "../../../stores/useCartStore.js";

/**
 * MemberCartPage - Trang giỏ hàng theo member route.
 */
export function MemberCartPage() {
    const navigate = useNavigate();
    const { member } = useParams();
    const profile = getMemberProfile(member);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const items = useCartStore((state) => state.items);

    useEffect(() => {
        setActiveMember(member);
    }, [member, setActiveMember]);

    return (
        <AppPageLayout>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#1A1A2E", mb: 2 }}
            >
                Giỏ hàng - member {profile.label.toLowerCase()} (
                {profile.displayName})
            </Typography>

            {items.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Giỏ hàng đang trống.
                </Alert>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                        gap: 4,
                    }}
                >
                    <Box>
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </Box>
                    <CartSummary />
                </Box>
            )}

            <Button
                onClick={() => navigate(`/${member}/products`)}
                variant="text"
                sx={{ mt: 2, textTransform: "none" }}
            >
                ← Quay lại danh sách món
            </Button>
        </AppPageLayout>
    );
}
