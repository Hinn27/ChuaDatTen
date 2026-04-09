import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useCartStore from "../../stores/useCartStore.js";

/**
 * Format giá tiền VND
 */
function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

/**
 * CartSummary — tổng tiền giỏ hàng
 * Hiển thị subtotal, phí giao hàng, tổng cộng, nút thanh toán
 *
 * @param {Object} props
 * @param {number} [props.shippingFee] - Phí giao hàng (mặc định 15000)
 * @param {boolean} [props.showCheckoutButton] - Hiện nút thanh toán
 */
export function CartSummary({
    shippingFee = 15000,
    showCheckoutButton = true,
}) {
    const navigate = useNavigate();
    const { member } = useParams();
    const getTotalPriceFn = useCartStore((state) => state?.getTotalPrice);
    const getTotalItemsFn = useCartStore((state) => state?.getTotalItems);

    let subtotal = 0;
    let totalItems = 0;

    try {
        if (typeof getTotalPriceFn === "function") {
            const price = getTotalPriceFn();
            subtotal = typeof price === "number" ? price : 0;
            console.log("[DEBUG CartSummary] subtotal:", subtotal);
        } else {
            console.warn("[DEBUG CartSummary] getTotalPriceFn is not a function:", typeof getTotalPriceFn);
        }
        if (typeof getTotalItemsFn === "function") {
            const count = getTotalItemsFn();
            totalItems = typeof count === "number" ? count : 0;
            console.log("[DEBUG CartSummary] totalItems:", totalItems);
        } else {
            console.warn("[DEBUG CartSummary] getTotalItemsFn is not a function:", typeof getTotalItemsFn);
        }
    } catch (err) {
        console.error("Error calculating cart totals:", err);
        subtotal = 0;
        totalItems = 0;
    }

    const total = subtotal + (totalItems > 0 ? shippingFee : 0);

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "grey.200",
                backgroundColor: "#FAFAFA",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Tóm tắt đơn hàng
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                }}
            >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Tạm tính
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatPrice(subtotal)}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                }}
            >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Phí giao hàng
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {items.length > 0 ? formatPrice(shippingFee) : "—"}
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Tổng cộng
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#FF4B2B" }}
                >
                    {formatPrice(total)}
                </Typography>
            </Box>

            {showCheckoutButton && (
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={items.length === 0}
                    onClick={() => navigate(`/${member || "a"}/checkout`)}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        py: 1.5,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #FF4B2B, #FF9A2B)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #e0412a, #e88a25)",
                        },
                    }}
                >
                    Tiến hành thanh toán
                </Button>
            )}
        </Box>
    );
}
