/**
 * Member B Category Page
 * Displays Member B (Organic Food) products and category information
 */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Alert,
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
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useCart } from "../hooks/useCart";
import useMemberB from "../hooks/useMemberB";

function MemberBCategoryPage() {
    const { member } = useParams();
    const {
        fetchProducts,
        fetchCategory,
        products,
        category,
        loading,
        error,
        pagination,
    } = useMemberB();
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
    const [currentPage, setCurrentPage] = useState(1);

    // Initialize page
    useEffect(() => {
        fetchCategory();
        fetchProducts({
            page: currentPage,
            limit: 12,
            sortBy,
        });
    }, [currentPage, sortBy]);

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
        if (value.trim()) {
            // Implement search with API
        } else {
            fetchProducts({ page: 1, limit: 12, sortBy });
        }
    };

    // Handle sort change
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    // Handle add to cart
    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    if (loading && !category) {
        return (
            <LoadingSpinner message="Đang tải dữ liệu danh mục Member B..." />
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Category Header */}
            {category && (
                <Paper
                    sx={{
                        p: 3,
                        mb: 4,
                        background: `linear-gradient(135deg, ${category.color || "#2ecc71"}20, ${category.color || "#2ecc71"}10)`,
                        border: `2px solid ${category.color || "#2ecc71"}`,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Typography variant="h3" sx={{ fontSize: "3em" }}>
                            {category.logo}
                        </Typography>
                        <Box>
                            <Typography variant="h4">
                                {category.displayName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {category.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Chip label={`${category.productCount} sản phẩm`} />
                        <Chip
                            label={`⭐ ${category.averageRating}/5`}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Paper>
            )}

            {/* Filters and Search */}
            <Paper sx={{ p: 2, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={handleSearch}
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Sắp xếp</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                label="Sắp xếp"
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
                    </Grid>
                </Grid>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Products Grid */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
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
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition:
                                            "transform 0.2s, box-shadow 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: "100%",
                                            backgroundColor: "#f5f5f5",
                                            position: "relative",
                                        }}
                                    >
                                        {product.stock <= 0 && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.5)",
                                                    color: "white",
                                                    fontSize: "1.2em",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Hết hàng
                                            </Box>
                                        )}
                                    </CardMedia>

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Link
                                            to={`/${member}/products/${product.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                sx={{
                                                    color: "inherit",
                                                    "&:hover": {
                                                        color: "primary.main",
                                                    },
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                        </Link>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ mb: 1 }}
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
                                                color="textSecondary"
                                            >
                                                ({product.reviews || 0})
                                            </Typography>
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {product.price.toLocaleString(
                                                "vi-VN",
                                            )}{" "}
                                            ₫
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                            disabled={product.stock <= 0}
                                        >
                                            Thêm vào giỏ
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                                mt: 4,
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={!pagination.hasPrev}
                            >
                                Trang trước
                            </Button>
                            <Typography sx={{ py: 1, px: 2 }}>
                                Trang {pagination.page} /{" "}
                                {pagination.totalPages}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={!pagination.hasNext}
                            >
                                Trang sau
                            </Button>
                        </Box>
                    )}
                </>
            ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        Không tìm thấy sản phẩm nào
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default MemberBCategoryPage;
