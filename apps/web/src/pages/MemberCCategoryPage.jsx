/**
 * Member C Category Page
 * Displays Member C products and category information
 */
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useCart } from "../hooks/useCart";
import useMemberC from "../hooks/useMemberC";

const heroStatSx = {
    p: 1.2,
    borderRadius: 2,
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.28)",
};

const heroStatLabelSx = {
    color: "rgba(255,255,255,0.82)",
    fontSize: "0.76rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: 700,
};

const heroStatValueSx = {
    color: "#fff",
    fontWeight: 800,
    fontSize: "1.05rem",
};

const quickChipSx = {
    bgcolor: "#fff1e9",
    color: "#8a3a12",
    border: "1px solid #ffd4be",
    fontWeight: 700,
};

const productCardSx = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    overflow: "hidden",
    border: "1px solid #ffd8c4",
    boxShadow: "0 10px 26px rgba(122,53,12,0.12)",
    position: "relative",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 16px 38px rgba(122,53,12,0.2)",
    },
};

const categoryChipSx = {
    mb: 1,
    fontSize: "0.72rem",
    height: 24,
    bgcolor: "#fff1e9",
    color: "#8a3a12",
    border: "1px solid #ffd4be",
    fontWeight: 700,
};

const productNameSx = {
    color: "#4e1f09",
    fontWeight: 800,
    fontSize: "1.02rem",
    cursor: "pointer",
    "&:hover": { color: "#d84315" },
};

const addButtonSx = {
    textTransform: "none",
    fontWeight: 700,
    borderRadius: 2,
    bgcolor: "#f97316",
    "&:hover": { bgcolor: "#ea580c" },
};

const paginationButtonSx = {
    textTransform: "none",
    borderColor: "#ffc4a4",
    color: "#4e1f09",
    "&:hover": {
        borderColor: "#ffab79",
        bgcolor: "rgba(78,31,9,0.04)",
    },
};

function MemberCCategoryPage() {
    const { member } = useParams();
    const navigate = useNavigate();
    const {
        fetchProducts,
        fetchCategory,
        searchProducts,
        products,
        category,
        loading,
        error,
        pagination,
    } = useMemberC();
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchCategory();
        fetchProducts({
            page: currentPage,
            limit: 12,
            sortBy,
        });
    }, [currentPage, sortBy, fetchCategory, fetchProducts]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
        if (value.trim()) {
            searchProducts(value.trim(), 20);
            return;
        }
        fetchProducts({ page: 1, limit: 12, sortBy });
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handleAddToCart = (product) => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.imageUrl,
            },
            1,
        );
    };

    if (loading && !category) {
        return (
            <LoadingSpinner message="Đang tải dữ liệu danh mục Member C..." />
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 8% 10%, rgba(255,157,99,0.25), transparent 34%), radial-gradient(circle at 90% 85%, rgba(255,119,0,0.12), transparent 38%), linear-gradient(180deg, #fff7f3 0%, #fffaf5 100%)",
            }}
        >
            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                {category && (
                    <Paper
                        sx={{
                            p: { xs: 2.5, md: 3.5 },
                            mb: 4,
                            borderRadius: 4,
                            overflow: "hidden",
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.22)",
                            background:
                                "linear-gradient(130deg, rgba(78,31,9,0.95) 0%, rgba(194,65,12,0.93) 62%, rgba(251,146,60,0.9) 100%)",
                            boxShadow: "0 26px 56px rgba(122,53,12,0.24)",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                width: 320,
                                height: 320,
                                borderRadius: "50%",
                                top: -120,
                                right: -80,
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,0.30), rgba(255,255,255,0))",
                                pointerEvents: "none",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: { xs: "flex-start", md: "center" },
                                justifyContent: "space-between",
                                gap: 2.5,
                                mb: 2.5,
                                flexWrap: "wrap",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        fontSize: 34,
                                        bgcolor: "rgba(255,255,255,0.16)",
                                        border: "1px solid rgba(255,255,255,0.34)",
                                    }}
                                >
                                    {category.logo || (
                                        <LocalFireDepartmentRoundedIcon />
                                    )}
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "#fff",
                                            fontWeight: 800,
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {category.displayName}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "rgba(255,255,255,0.86)",
                                            mt: 0.5,
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate(`/${member || "c"}/cart`)
                                }
                                startIcon={<ShoppingCartIcon />}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    bgcolor: "#fdba74",
                                    color: "#4e1f09",
                                    borderRadius: 999,
                                    px: 2.3,
                                    py: 1,
                                    boxShadow:
                                        "0 10px 24px rgba(15,23,42,0.24)",
                                    "&:hover": { bgcolor: "#fb923c" },
                                }}
                            >
                                Xem giỏ hàng
                            </Button>
                        </Box>

                        <Box
                            sx={{
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
                            <Paper sx={heroStatSx}>
                                <Typography sx={heroStatLabelSx}>
                                    Sản phẩm
                                </Typography>
                                <Typography sx={heroStatValueSx}>
                                    {category.productCount || products.length}
                                </Typography>
                            </Paper>
                            <Paper sx={heroStatSx}>
                                <Typography sx={heroStatLabelSx}>
                                    Đánh giá
                                </Typography>
                                <Typography sx={heroStatValueSx}>
                                    {category.averageRating || 0}/5
                                </Typography>
                            </Paper>
                            <Paper sx={heroStatSx}>
                                <Typography sx={heroStatLabelSx}>
                                    Nổi bật
                                </Typography>
                                <Typography sx={heroStatValueSx}>
                                    Theo vùng miền
                                </Typography>
                            </Paper>
                            <Paper sx={heroStatSx}>
                                <Typography sx={heroStatLabelSx}>
                                    Thành viên
                                </Typography>
                                <Typography sx={heroStatValueSx}>C</Typography>
                            </Paper>
                        </Box>
                    </Paper>
                )}

                <Paper
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        mb: 4,
                        borderRadius: 3,
                        border: "1px solid #ffd8c4",
                        boxShadow: "0 10px 28px rgba(122,53,12,0.08)",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,248,243,0.96))",
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7} md={8}>
                            <TextField
                                fullWidth
                                placeholder="Tìm món theo tên, vùng miền..."
                                value={searchQuery}
                                onChange={handleSearch}
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRoundedIcon
                                                sx={{ color: "#8a3a12" }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} md={4}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Sắp xếp</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    label="Sắp xếp"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <TuneRoundedIcon
                                                sx={{
                                                    color: "#8a3a12",
                                                    mr: 0.5,
                                                }}
                                            />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="newest">Mới nhất</MenuItem>
                                    <MenuItem value="price-asc">
                                        Giá: Thấp đến cao
                                    </MenuItem>
                                    <MenuItem value="price-desc">
                                        Giá: Cao đến thấp
                                    </MenuItem>
                                    <MenuItem value="rating">
                                        Đánh giá cao nhất
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            mt: 1.5,
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <Chip size="small" label="Vị Bắc" sx={quickChipSx} />
                        <Chip size="small" label="Vị Trung" sx={quickChipSx} />
                        <Chip size="small" label="Vị Nam" sx={quickChipSx} />
                    </Box>
                </Paper>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 6,
                        }}
                    >
                        <CircularProgress sx={{ color: "#f97316" }} />
                    </Box>
                ) : products.length > 0 ? (
                    <>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {products.map((product) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={product.id}
                                >
                                    <Card sx={productCardSx}>
                                        <CardMedia
                                            component="img"
                                            image={
                                                product.image ||
                                                product.imageUrl ||
                                                "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop"
                                            }
                                            alt={product.name}
                                            sx={{
                                                height: 180,
                                                objectFit: "cover",
                                            }}
                                        />

                                        {product.stock <= 0 && (
                                            <Chip
                                                label="Hết hàng"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 12,
                                                    right: 12,
                                                    fontWeight: 700,
                                                }}
                                            />
                                        )}

                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Chip
                                                label={
                                                    product.region ||
                                                    product.category ||
                                                    "Món chiên"
                                                }
                                                size="small"
                                                sx={categoryChipSx}
                                            />

                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                sx={productNameSx}
                                                onClick={() =>
                                                    navigate(
                                                        `/${member || "c"}/products/${product.id}`,
                                                    )
                                                }
                                            >
                                                {product.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#8a3a12",
                                                    minHeight: 42,
                                                    mb: 1,
                                                }}
                                            >
                                                {product.description}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mb: 1,
                                                }}
                                            >
                                                <Rating
                                                    value={product.rating || 0}
                                                    readOnly
                                                    size="small"
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: "#8a3a12" }}
                                                >
                                                    ({product.reviews || 0})
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "#c2410c",
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {Number(
                                                    product.price || 0,
                                                ).toLocaleString("vi-VN")}{" "}
                                                ₫
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ px: 2, pb: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<ShoppingCartIcon />}
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                                disabled={product.stock <= 0}
                                                sx={addButtonSx}
                                            >
                                                Thêm vào giỏ
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {pagination && pagination.totalPages > 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 1,
                                    mt: 4,
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1),
                                        )
                                    }
                                    disabled={!pagination.hasPrev}
                                    sx={paginationButtonSx}
                                >
                                    Trang trước
                                </Button>
                                <Typography
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        color: "#4e1f09",
                                        fontWeight: 700,
                                    }}
                                >
                                    Trang {pagination.page} /{" "}
                                    {pagination.totalPages}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={!pagination.hasNext}
                                    sx={paginationButtonSx}
                                >
                                    Trang sau
                                </Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <Paper
                        sx={{
                            textAlign: "center",
                            py: 7,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.9)",
                            border: "1px dashed #ffd0b2",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#4e1f09", fontWeight: 700 }}
                        >
                            Không tìm thấy sản phẩm nào
                        </Typography>
                        <Typography sx={{ color: "#8a3a12", mt: 0.6 }}>
                            Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc sắp xếp.
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
}

export default MemberCCategoryPage;
