import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
    Alert,
    Box,
    Button,
    Chip,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPageLayout } from "../components/common/AppPageLayout.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { ProductList } from "../components/product/ProductList.jsx";
import { useCart } from "../hooks/useCart";
import { useMemberB } from "../hooks/useMemberB";
import { getMemberProfile } from "../shared/constants/memberProfiles.js";

export default function MemberBCategoryPage() {
    const navigate = useNavigate();
    const profile = getMemberProfile("b");
    const currentMember = "b";
    const {
        fetchProducts,
        fetchCategory,
        searchProducts,
        products,
        category,
        loading,
        error,
        pagination,
    } = useMemberB();
    const { addToCart } = useCart();

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

        fetchProducts({
            page: currentPage,
            limit: 10,
            sortBy,
        });
    }, [currentPage, fetchProducts, searchProducts, searchQuery, sortBy]);

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
        addToCart(product, 1);
    };

    const heroCategory = category || profile;
    const featuredProducts = products.slice(0, 4);
    const menuProducts = products;
    const showPagination =
        !searchQuery.trim() && pagination && pagination.totalPages > 1;

    if (loading && !category) {
        return (
            <LoadingSpinner message="Đang tải dữ liệu danh mục Member B..." />
        );
    }

    return (
        <AppPageLayout
            maxWidth="xl"
            containerSx={{
                py: { xs: 3, md: 5 },
                background:
                    "radial-gradient(circle at 8% 10%, rgba(255,190,48,0.18), transparent 34%), radial-gradient(circle at 90% 85%, rgba(23,51,52,0.12), transparent 38%), linear-gradient(180deg, #fffaf2 0%, #f6fbf8 100%)",
            }}
        >
            <Paper
                sx={{
                    p: { xs: 2.5, md: 3.5 },
                    mb: 4,
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.26)",
                    background:
                        "linear-gradient(135deg, rgba(23,51,52,0.96) 0%, rgba(32,87,68,0.92) 58%, rgba(255,190,48,0.88) 100%)",
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
                            Danh mục{" "}
                            {heroCategory?.displayName || profile.displayName}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.88)",
                                maxWidth: 620,
                            }}
                        >
                            {heroCategory?.description || profile.displayName}
                        </Typography>
                    </Box>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.2}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/${currentMember}/cart`)}
                            startIcon={<ShoppingCartIcon />}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#ffbe30",
                                color: "#173334",
                                fontWeight: 800,
                                borderRadius: 2,
                                "&:hover": { bgcolor: "#f2b328" },
                            }}
                        >
                            Xem giỏ hàng
                        </Button>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        mt: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0,1fr))",
                            md: "repeat(4, minmax(0,1fr))",
                        },
                        gap: 1.2,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Paper
                        sx={{
                            p: 1.2,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.28)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.82)",
                                fontSize: "0.76rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                            }}
                        >
                            Sản phẩm
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                            }}
                        >
                            {heroCategory?.productCount || products.length}
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1.2,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.28)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.82)",
                                fontSize: "0.76rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                            }}
                        >
                            Đánh giá
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                            }}
                        >
                            {heroCategory?.averageRating || 0}/5
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1.2,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.28)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.82)",
                                fontSize: "0.76rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                            }}
                        >
                            Nổi bật
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                            }}
                        >
                            Hữu cơ
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1.2,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.28)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.82)",
                                fontSize: "0.76rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                            }}
                        >
                            Thành viên
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                            }}
                        >
                            B
                        </Typography>
                    </Paper>
                </Box>
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
                    <TextField
                        fullWidth
                        placeholder="Tìm món organic, rau củ, salad..."
                        value={searchQuery}
                        onChange={handleSearch}
                        size="small"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon
                                        sx={{ color: "#5d746d" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl size="small" fullWidth>
                        <InputLabel>Sắp xếp</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            label="Sắp xếp"
                            startAdornment={
                                <InputAdornment position="start">
                                    <TuneRoundedIcon
                                        sx={{ color: "#5d746d", mr: 0.5 }}
                                    />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="newest">Mới nhất</MenuItem>
                            <MenuItem value="price-asc">
                                Giá: Thấp → Cao
                            </MenuItem>
                            <MenuItem value="price-desc">
                                Giá: Cao → Thấp
                            </MenuItem>
                            <MenuItem value="rating">
                                Đánh giá cao nhất
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Box
                    sx={{ mt: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}
                >
                    <Chip
                        size="small"
                        label="Tươi mỗi ngày"
                        sx={{
                            bgcolor: "#edf5f0",
                            color: "#47645b",
                            border: "1px solid #d3e4db",
                            fontWeight: 700,
                        }}
                    />
                    <Chip
                        size="small"
                        label="Không chất bảo quản"
                        sx={{
                            bgcolor: "#edf5f0",
                            color: "#47645b",
                            border: "1px solid #d3e4db",
                            fontWeight: 700,
                        }}
                    />
                    <Chip
                        size="small"
                        label="Giao nhanh trong ngày"
                        sx={{
                            bgcolor: "#edf5f0",
                            color: "#47645b",
                            border: "1px solid #d3e4db",
                            fontWeight: 700,
                        }}
                    />
                </Box>
            </Paper>

            {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            ) : null}

            {loading ? (
                <LoadingSpinner message="Đang tải sản phẩm..." />
            ) : (
                <>
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
                        Gợi ý nổi bật theo member, ưu tiên món đang được quan
                        tâm nhiều.
                    </Typography>

                    <ProductList
                        products={featuredProducts}
                        emptyMessage="Chưa có món nào để hiển thị."
                        member={currentMember}
                        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
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
                            Mỗi hàng hiển thị 5 món, mỗi trang 10 món để dễ xem
                            và lật nhanh.
                        </Typography>

                        <ProductList
                            products={menuProducts}
                            emptyMessage="Chưa có món nào trong thực đơn này."
                            member={currentMember}
                            columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 5 }}
                        />

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
                    </Box>
                </>
            )}
        </AppPageLayout>
    );
}
