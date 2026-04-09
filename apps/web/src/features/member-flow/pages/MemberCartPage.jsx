import {
    Box,
    Button,
    Chip,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
    const currentMember = member || "a";
    const profile = getMemberProfile(member);
    const setActiveMember = useCartStore((state) => state.setActiveMember);
    const items = useCartStore((state) => state.items);
    const [isBootstrapping, setIsBootstrapping] = useState(true);

    useEffect(() => {
        setActiveMember(member);
        const timer = setTimeout(() => setIsBootstrapping(false), 120);
        return () => clearTimeout(timer);
    }, [member, setActiveMember]);

    const renderCartSkeleton = () => (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                gap: 4,
            }}
        >
            <Box>
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Paper
                        key={idx}
                        sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "grey.200",
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "80px 1fr auto",
                                gap: 2,
                            }}
                        >
                            <Skeleton
                                variant="rounded"
                                width={80}
                                height={80}
                            />
                            <Box>
                                <Skeleton
                                    variant="text"
                                    width="65%"
                                    height={34}
                                />
                                <Skeleton
                                    variant="text"
                                    width="30%"
                                    height={28}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={28}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                                <Skeleton
                                    variant="text"
                                    width={90}
                                    height={34}
                                />
                                <Skeleton
                                    variant="circular"
                                    width={28}
                                    height={28}
                                    sx={{ ml: "auto" }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "grey.200",
                    height: "fit-content",
                }}
            >
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="100%" height={28} />
                <Skeleton variant="text" width="100%" height={28} />
                <Skeleton variant="text" width="100%" height={28} />
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height={46}
                    sx={{ mt: 2 }}
                />
            </Paper>
        </Box>
    );

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
                            Giỏ hàng của bạn
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>
                            Kiểm tra món đã chọn và hoàn tất thanh toán nhanh.
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
                        Tiếp tục chọn món
                    </Button>
                </Stack>
            </Paper>

            {isBootstrapping ? (
                renderCartSkeleton()
            ) : items.length === 0 ? (
                <Paper
                    sx={{
                        textAlign: "center",
                        py: 7,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.9)",
                        border: "1px dashed #bfd7cc",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: "#173334", fontWeight: 700 }}
                    >
                        Giỏ hàng đang trống
                    </Typography>
                    <Typography sx={{ color: "#5d746d", mt: 0.6, mb: 2 }}>
                        Thêm vài món ngon để bắt đầu thanh toán.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/${currentMember}/products`)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            bgcolor: "#e76f51",
                            "&:hover": { bgcolor: "#d65a3b" },
                        }}
                    >
                        Xem danh sách món
                    </Button>
                </Paper>
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
        </AppPageLayout>
    );
}
