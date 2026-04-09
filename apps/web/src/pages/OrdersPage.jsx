import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material'
import { useOrders } from '../hooks/useOrders'
import { useAuth } from '../hooks/useAuth'

const STATUS_COLORS = {
  pending: 'warning',
  confirmed: 'info',
  shipping: 'primary',
  delivered: 'success',
  cancelled: 'error',
}

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
}

/**
 * Orders Page
 * View user order history with status filtering
 */
export default function OrdersPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { orders, loading, fetchOrders } = useOrders()
  const [selectedStatus, setSelectedStatus] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    fetchOrders(selectedStatus)
  }, [isLoggedIn, selectedStatus])

  if (!isLoggedIn) {
    return null
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Lịch Sử Đơn Hàng
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant={selectedStatus === null ? 'contained' : 'outlined'}
            onClick={() => setSelectedStatus(null)}
          >
            Tất Cả
          </Button>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedStatus === key ? 'contained' : 'outlined'}
              onClick={() => setSelectedStatus(key)}
            >
              {label}
            </Button>
          ))}
        </Box>

        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : orders.length === 0 ? (
          <Typography color="textSecondary">Không có đơn hàng</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Ngày Tạo</TableCell>
                  <TableCell>Trạng Thái</TableCell>
                  <TableCell align="right">Tổng Tiền</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_LABELS[order.status] || order.status}
                        color={STATUS_COLORS[order.status] || 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {order.total_price?.toLocaleString('vi-VN')}đ
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => navigate(`/orders/${order.id}`)}
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
  )
}





































































































































}  )    </Container>      </Box>        )}          </TableContainer>            </Table>              </TableBody>                ))}                  </TableRow>                    </TableCell>                      </Button>                        Xem chi tiết                      >                        onClick={() => navigate(`/orders/${order.id}`)}                        variant="text"                        size="small"                      <Button                    <TableCell>                    </TableCell>                      {order.total_price?.toLocaleString('vi-VN')}đ                    <TableCell align="right">                    </TableCell>                      />                        size="small"                        color={STATUS_COLORS[order.status] || 'default'}                        label={STATUS_LABELS[order.status] || order.status}                      <Chip                    <TableCell>                    <TableCell>{new Date(order.created_at).toLocaleDateString('vi-VN')}</TableCell>                    <TableCell>{order.id.substring(0, 8)}...</TableCell>                  <TableRow key={order.id}>                {orders.map((order) => (              <TableBody>              </TableHead>                </TableRow>                  <TableCell>Hành động</TableCell>                  <TableCell align="right">Tổng Tiền</TableCell>                  <TableCell>Trạng Thái</TableCell>                  <TableCell>Ngày Tạo</TableCell>                  <TableCell>ID</TableCell>                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>              <TableHead>            <Table>          <TableContainer component={Paper}>        ) : (          <Typography color="textSecondary">Không có đơn hàng</Typography>        ) : orders.length === 0 ? (          <Typography>Đang tải...</Typography>        {loading ? (        </Box>          ))}            </Button>              {label}            >              onClick={() => setSelectedStatus(key)}              variant={selectedStatus === key ? 'contained' : 'outlined'}              key={key}            <Button          {Object.entries(STATUS_LABELS).map(([key, label]) => (          </Button>            Tất Cả          >            onClick={() => setSelectedStatus(null)}            variant={selectedStatus === null ? 'contained' : 'outlined'}          <Button        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>        </Typography>          Lịch Sử Đơn Hàng        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>      <Box sx={{ py: 4 }}>    <Container maxWidth="lg">  return (  }    return null  if (!isLoggedIn) {  }, [isLoggedIn, selectedStatus])    fetchOrders(selectedStatus)    }      return      navigate('/login')    if (!isLoggedIn) {  useEffect(() => {  const [selectedStatus, setSelectedStatus] = useState(null)  const { orders, loading, fetchOrders } = useOrders()  const { isLoggedIn } = useAuth()  const navigate = useNavigate()export default function OrdersPage() { */ * View user order history with status filtering * Orders Page/**}  cancelled: 'Đã hủy',  delivered: 'Đã giao',  shipping: 'Đang giao',  confirmed: 'Đã xác nhận',  pending: 'Chờ xác nhận',const STATUS_LABELS = {}  cancelled: 'error',  delivered: 'success',  shipping: 'primary',  confirmed: 'info',  pending: 'warning',const STATUS_COLORS = {import { useAuth } from '../hooks/useAuth'import { useOrders } from '../hooks/useOrders'} from '@mui/material'  Chip,  Typography,  TableRow,  TableHead,  TableContainer,  TableCell,  TableBody,  Table,  Paper,  Container,  Button,  Box,import {import { useNavigate } from 'react-router-dom'import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

/**
 * Profile Page
 * View and edit user profile
 */
export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleViewOrders = () => {
    navigate('/orders')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Thông Tin Tài Khoản
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin cá nhân
          </Typography>

          <TextField
            fullWidth
            label="Email"
            value={user.email || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Họ và Tên"
            value={user.fullName || user.name || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Số điện thoại"
            value={user.phone || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Địa chỉ"
            value={user.address || ''}
            margin="normal"
            disabled
            multiline
            rows={3}
          />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleViewOrders}>
              Xem Đơn Hàng
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
