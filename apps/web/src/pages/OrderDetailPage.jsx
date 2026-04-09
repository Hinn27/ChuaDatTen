import {
    Box,
    Button,
    Chip,
    Container,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useOrderDetail } from "../hooks/useOrders";

const STATUS_STEPS = ["pending", "confirmed", "shipping", "delivered"];
const STATUS_LABELS = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
};

/**
 * Order Detail Page
 * View full order details with timeline and items
 */
export default function OrderDetailPage() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { isLoggedIn } = useAuth();
    const { order, loading, fetchOrderDetail } = useOrderDetail();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (orderId) {
            fetchOrderDetail(orderId);
        }
    }, [isLoggedIn, orderId]);

    if (!isLoggedIn) {
        return null;
    }

    if (loading) {
        return <Typography sx={{ p: 4 }}>Đang tải...</Typography>;
    }

    if (!order) {
        return (
            <Container maxWidth="md">
                <Box sx={{ py: 4 }}>
                    <Typography>Không tìm thấy đơn hàng</Typography>
                    <Button onClick={() => navigate("/orders")}>
                        Quay lại
                    </Button>
                </Box>
            </Container>
        );
    }

    const currentStepIndex = STATUS_STEPS.indexOf(order.status);

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Đơn Hàng #{order.id.substring(0, 8)}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/orders")}
                    >
                        Quay lại
                    </Button>
                </Box>

                {/* Timeline */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Trạng Thái Đơn Hàng
                    </Typography>
                    <Stepper activeStep={currentStepIndex} alternativeLabel>
                        {STATUS_STEPS.map((status) => (
                            <Step key={status}>
                                <StepLabel>{STATUS_LABELS[status]}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                {/* Order Info */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Thông Tin Đơn Hàng
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Ngày Tạo
                            </Typography>
                            <Typography>
                                {new Date(order.created_at).toLocaleDateString(
                                    "vi-VN",
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Trạng Thái
                            </Typography>
                            <Chip
                                label={STATUS_LABELS[order.status]}
                                color="primary"
                                size="small"
                            />
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Phương thức thanh toán
                            </Typography>
                            <Typography>
                                {order.payment_method || "COD"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Tổng tiền
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                    color: "primary.main",
                                }}
                            >
                                {order.total_price?.toLocaleString("vi-VN")}đ
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Delivery Address */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Địa Chỉ Giao Hàng
                    </Typography>
                    <Typography>{order.delivery_address}</Typography>
                    {order.phone && <Typography>SĐT: {order.phone}</Typography>}
                </Paper>

                {/* Items */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Sản Phẩm
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell>Sản Phẩm</TableCell>
                                <TableCell align="right">Giá</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="right">Tổng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items?.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        {item.product_name || item.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.price?.toLocaleString("vi-VN")}đ
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        {(
                                            item.price * item.quantity
                                        )?.toLocaleString("vi-VN")}
                                        đ
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                {/* Notes */}
                {order.notes && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Ghi chú
                        </Typography>
                        <Typography>{order.notes}</Typography>
                    </Paper>
                )}
            </Box>
        </Container>
    );
}
