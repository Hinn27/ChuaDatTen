import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    AppBar,
    Badge,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
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
 * Header chung cho toàn bộ ứng dụng
 * Hiển thị logo, navigation, giỏ hàng, nút auth
 */
const NAV_LINKS = [
    { label: "Shop", key: "shop" },
    { label: "Products", key: "products" },
    { label: "Cart", key: "cart" },
];

export function SiteHeader() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { member } = useParams();
    const currentMember = member || "a";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const isLoggedIn = useAuthStore((state) => state?.isLoggedIn ?? false);
    const user = useAuthStore((state) => state?.user ?? null);
    const logout = useAuthStore((state) => state?.logout) ?? (() => {});
    const getTotalItemsFn = useCartStore((state) => state?.getTotalItems);

    let totalItems = 0;
    try {
        if (typeof getTotalItemsFn === "function") {
            const count = getTotalItemsFn();
            totalItems = typeof count === "number" ? count : 0;
            console.log(
                "[DEBUG SiteHeader] totalItems:",
                totalItems,
                "type:",
                typeof totalItems,
            );
        } else {
            console.warn(
                "[DEBUG SiteHeader] getTotalItemsFn is not a function:",
                typeof getTotalItemsFn,
            );
        }
    } catch (err) {
        console.error("Error calculating total items:", err);
        totalItems = 0;
    }

    const handleLogout = async () => {
        try {
            if (typeof logout === "function") {
                await logout();
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
        navigate(`/${currentMember}/shop`);
    };

    return (
        <>
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
                            textDecoration: "none",
                            mr: 4,
                            cursor: "pointer",
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
                                letterSpacing: "-0.5px",
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
                                        navigate(
                                            `/${currentMember}/${link.key}`,
                                        )
                                    }
                                    sx={{
                                        color: "text.primary",
                                        fontWeight: 500,
                                        textTransform: "none",
                                        fontSize: "0.95rem",
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "#FF4B2B",
                                            backgroundColor:
                                                "rgba(255,75,43,0.06)",
                                        },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            ml: "auto",
                        }}
                    >
                        {/* Search icon (mobile) */}
                        {isMobile && (
                            <IconButton
                                onClick={() => navigate("/search")}
                                size="small"
                            >
                                <SearchIcon />
                            </IconButton>
                        )}

                        {/* Cart */}
                        <IconButton
                            onClick={() => navigate(`/${currentMember}/cart`)}
                            size="small"
                            sx={{ color: "text.primary" }}
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

                        {/* Auth */}
                        {isLoggedIn ? (
                            <>
                                <IconButton
                                    size="small"
                                    sx={{ color: "text.primary" }}
                                >
                                    <PersonIcon />
                                </IconButton>
                                {!isMobile && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={handleLogout}
                                        sx={{
                                            textTransform: "none",
                                            borderColor: "grey.300",
                                            color: "text.secondary",
                                            "&:hover": {
                                                borderColor: "#FF4B2B",
                                                color: "#FF4B2B",
                                            },
                                        }}
                                    >
                                        Đăng xuất
                                    </Button>
                                )}
                            </>
                        ) : (
                            !isMobile && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => navigate("/auth")}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        background:
                                            "linear-gradient(135deg, #FF4B2B, #FF9A2B)",
                                        boxShadow:
                                            "0 2px 8px rgba(255,75,43,0.3)",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, #e0412a, #e88a25)",
                                        },
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            )
                        )}

                        {/* Mobile menu */}
                        {isMobile && (
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                size="small"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: 260 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2, color: "#FF4B2B" }}
                    >
                        🍽️ Refood
                    </Typography>
                </Box>
                <List>
                    {NAV_LINKS.map((link) => (
                        <ListItem
                            key={link.key}
                            onClick={() => {
                                navigate(`/${currentMember}/${link.key}`);
                                setDrawerOpen(false);
                            }}
                            sx={{
                                color: "text.primary",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "rgba(255,75,43,0.06)",
                                },
                            }}
                        >
                            <ListItemText primary={link.label} />
                        </ListItem>
                    ))}
                    {isLoggedIn ? (
                        <ListItem
                            onClick={() => {
                                handleLogout();
                                setDrawerOpen(false);
                            }}
                            sx={{ cursor: "pointer", color: "#FF4B2B" }}
                        >
                            <ListItemText primary="Đăng xuất" />
                        </ListItem>
                    ) : (
                        <ListItem
                            onClick={() => {
                                navigate("/auth");
                                setDrawerOpen(false);
                            }}
                            sx={{ color: "#FF4B2B", cursor: "pointer" }}
                        >
                            <ListItemText primary="Đăng nhập / Đăng ký" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </>
    );
}
