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
import { ProductDetail } from "../../../components/product/ProductDetail.jsx";
import { getMemberProfile } from "../../../shared/constants/memberProfiles.js";
import useCartStore from "../../../stores/useCartStore.js";
import useProductStore from "../../../stores/useProductStore.js";

/**
 * MemberProductDetailPage - Trang chi tiết món ăn theo member route.
 */
export function MemberProductDetailPage() {
    const navigate = useNavigate();
    const { member, id } = useParams();
    const currentMember = member || "a";
    const profile = getMemberProfile(member);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const selectedProduct = useProductStore((state) => state.selectedProduct);
    const loading = useProductStore((state) => state.loading);
    const error = useProductStore((state) => state.error);
    const fetchProductById = useProductStore((state) => state.fetchProductById);

    useEffect(() => {
        setActiveMember(member);
        fetchProductById(id);
    }, [fetchProductById, id, member, setActiveMember]);

    return (
        <AppPageLayout maxWidth="xl" containerSx={{ py: { xs: 3, md: 5 } }}>
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
                            Chi tiết món ăn
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>
                            Xem thông tin chi tiết món thuộc danh mục{" "}
                            {profile.displayName}.
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/${currentMember}/products`)}
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
                        Quay lại danh sách món
                    </Button>
                </Stack>
            </Paper>

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
