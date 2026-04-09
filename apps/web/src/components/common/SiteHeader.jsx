import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Safely get store values
    const isLoggedIn = useSafeStore(
        useAuthStore,
        (state) => state?.isLoggedIn ?? false,
    );
    const getTotalItemsFn = useSafeStore(useCartStore, (state) =>
        state?.getTotalItems,
    );

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
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid",
                borderColor: "grey.200",
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: 1200,
                    width: "100%",
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        mr: 4,
                    }}
                    onClick={() => navigate(`/${currentMember}/shop`)}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            background:
                                "linear-gradient(135deg, #FF4B2B, #FF9A2B)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        🍽️ Refood
                    </Typography>
                </Box>

                {/* Desktop Nav */}
                {!isMobile && (
                    <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
                        {NAV_LINKS.map((link) => (
                            <Button
                                key={link.key}
                                onClick={() =>
                                    navigate(`/${currentMember}/${link.key}`)
                                }
                                sx={{
                                    color: "text.primary",
                                    fontWeight: 500,
                                    textTransform: "none",
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {/* Right side actions */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        ml: "auto",
                    }}
                >
                    {/* Cart */}
                    <IconButton
                        onClick={() => navigate(`/${currentMember}/cart`)}
                        size="small"
                    >
                        <Badge
                            badgeContent={
                                totalItems > 0 ? totalItems : null
                            }
                            color="error"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* Login button */}
                    {!isMobile && (
                        <Button
                            size="small"
                            onClick={() => navigate("/auth")}
                            sx={{ textTransform: "none" }}
                        >
                            Đăng nhập
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// Helper to safely use hooks
function useSafeStore(hook, selector) {
    try {
        return hook(selector);
    } catch (err) {
        console.error("Store access error:", err);
        return undefined;
    }
}
