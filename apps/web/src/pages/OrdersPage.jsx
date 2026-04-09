import {
    Box,
    Button,
    Chip,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";

const STATUS_COLORS = {
    pending: "warning",
    confirmed: "info",
    shipping: "primary",
    delivered: "success",
    cancelled: "error",
};

const STATUS_LABELS = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
};

export default function OrdersPage() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { orders, loading, fetchOrders } = useOrders();
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        fetchOrders(selectedStatus);
    }, [isLoggedIn, selectedStatus]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
                    Lịch Sử Đơn Hàng
                </Typography>

                <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant={
                            selectedStatus === null ? "contained" : "outlined"
                        }
                        onClick={() => setSelectedStatus(null)}
                    >
                        Tất Cả
                    </Button>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <Button
                            key={key}
                            variant={
                                selectedStatus === key
                                    ? "contained"
                                    : "outlined"
                            }
                            onClick={() => setSelectedStatus(key)}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {loading ? (
                    <Typography>Đang tải...</Typography>
                ) : orders.length === 0 ? (
                    <Typography color="textSecondary">
                        Không có đơn hàng
                    </Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Ngày Tạo</TableCell>
                                    <TableCell>Trạng Thái</TableCell>
                                    <TableCell align="right">
                                        Tổng Tiền
                                    </TableCell>
                                    <TableCell>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            {order.id.substring(0, 8)}...
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString("vi-VN")}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    STATUS_LABELS[
                                                        order.status
                                                    ] || order.status
                                                }
                                                color={
                                                    STATUS_COLORS[
                                                        order.status
                                                    ] || "default"
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {order.total_price?.toLocaleString(
                                                "vi-VN",
                                            )}
                                            đ
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() =>
                                                    navigate(
                                                        `/orders/${order.id}`,
                                                    )
                                                }
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Container>
    );
}
