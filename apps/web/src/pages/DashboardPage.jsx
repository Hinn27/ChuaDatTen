import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Skeleton,
  Alert,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PeopleIcon from '@mui/icons-material/People'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { RevenueChart } from '../components/dashboard/RevenueChart.jsx'
import api from '../services/api.js'

/**
 * Format giá tiền VND gọn
 * @param {number} value
 * @returns {string}
 */
function formatCompact(value) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} triệu`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
  return value.toString()
}

/**
 * Mock dữ liệu thống kê KPI
 * (Sẽ thay bằng API thực tế sau)
 */
const MOCK_STATS = [
  {
    id: 'revenue',
    label: 'Tổng doanh thu',
    value: 125800000,
    change: '+12.5%',
    changePositive: true,
    icon: TrendingUpIcon,
    color: '#FF4B2B',
    bgColor: 'rgba(255,75,43,0.08)',
  },
  {
    id: 'orders',
    label: 'Đơn hàng',
    value: 1247,
    change: '+8.3%',
    changePositive: true,
    icon: ReceiptLongIcon,
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.08)',
  },
  {
    id: 'customers',
    label: 'Khách hàng',
    value: 856,
    change: '+5.1%',
    changePositive: true,
    icon: PeopleIcon,
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
  },
  {
    id: 'products',
    label: 'Sản phẩm đã bán',
    value: 3420,
    change: '-2.1%',
    changePositive: false,
    icon: ShoppingBagIcon,
    color: '#10B981',
    bgColor: 'rgba(16,185,129,0.08)',
  },
]

/**
 * Mock dữ liệu đơn hàng gần đây
 */
const MOCK_RECENT_ORDERS = [
  { id: 'RF-001', customer: 'Nguyễn Văn A', total: 185000, status: 'completed', time: '5 phút trước' },
  { id: 'RF-002', customer: 'Trần Thị B', total: 320000, status: 'processing', time: '12 phút trước' },
  { id: 'RF-003', customer: 'Lê Hoàng C', total: 95000, status: 'completed', time: '25 phút trước' },
  { id: 'RF-004', customer: 'Phạm Minh D', total: 450000, status: 'pending', time: '1 giờ trước' },
  { id: 'RF-005', customer: 'Đỗ Thanh E', total: 210000, status: 'completed', time: '2 giờ trước' },
]

/** Map status label + color */
const STATUS_MAP = {
  completed: { label: 'Hoàn tất', color: '#10B981', bgColor: '#ECFDF5' },
  processing: { label: 'Đang xử lý', color: '#F59E0B', bgColor: '#FFFBEB' },
  pending: { label: 'Chờ xác nhận', color: '#6B7280', bgColor: '#F3F4F6' },
}

/**
 * StatCard — card hiển thị KPI
 *
 * @param {Object} props
 * @param {Object} props.stat - Dữ liệu KPI
 * @param {boolean} [props.loading]
 */
function StatCard({ stat, loading = false }) {
  const Icon = stat.icon

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'grey.200' }}
      >
        <Skeleton variant="circular" width={48} height={48} sx={{ mb: 2 }} />
        <Skeleton width="60%" height={20} />
        <Skeleton width="40%" height={32} sx={{ mt: 1 }} />
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 3,
          backgroundColor: stat.bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Icon sx={{ color: stat.color, fontSize: 24 }} />
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
        {stat.label}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A2E' }}>
          {stat.id === 'revenue' ? formatCompact(stat.value) : stat.value.toLocaleString('vi-VN')}
        </Typography>
        <Chip
          label={stat.change}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 22,
            backgroundColor: stat.changePositive ? '#ECFDF5' : '#FEF2F2',
            color: stat.changePositive ? '#10B981' : '#EF4444',
          }}
        />
      </Box>
    </Paper>
  )
}

/**
 * DashboardPage — Trang thống kê doanh thu
 *
 * Hiển thị:
 *  - 4 KPI cards (Doanh thu, Đơn hàng, Khách hàng, SP đã bán)
 *  - Biểu đồ doanh thu (RevenueChart component — Recharts)
 *  - Bảng đơn hàng gần đây
 */
export default function DashboardPage() {
  const [stats, setStats] = useState(MOCK_STATS)
  const [recentOrders, setRecentOrders] = useState(MOCK_RECENT_ORDERS)
  const [revenueData, setRevenueData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetch dữ liệu dashboard từ API
   * TODO: Ghép API thực tế sau
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // ====================================================
        // TODO: Uncomment khi có API thực tế
        // const [statsRes, ordersRes, revenueRes] = await Promise.all([
        //   api.get('/dashboard/stats'),
        //   api.get('/dashboard/recent-orders'),
        //   api.get('/dashboard/revenue'),
        // ])
        // setStats(statsRes.data)
        // setRecentOrders(ordersRes.data)
        // setRevenueData(revenueRes.data)
        // ====================================================

        // Giả lập loading 500ms
        await new Promise((resolve) => setTimeout(resolve, 500))
        setStats(MOCK_STATS)
        setRecentOrders(MOCK_RECENT_ORDERS)
      } catch (err) {
        setError('Không thể tải dữ liệu thống kê. Vui lòng thử lại.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FA' }}>
      <SiteHeader />

      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        {/* Title */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Tổng quan hiệu suất kinh doanh Refood
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* ========================================= */}
        {/* KPI CARDS */}
        {/* ========================================= */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} loading={loading} />
          ))}
        </Box>

        {/* ========================================= */}
        {/* BIỂU ĐỒ DOANH THU */}
        {/* ========================================= */}
        <Box sx={{ mb: 4 }}>
          <RevenueChart data={revenueData} />
        </Box>

        {/* ========================================= */}
        {/* ĐƠN HÀNG GẦN ĐÂY */}
        {/* ========================================= */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Đơn hàng gần đây
          </Typography>

          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={56} sx={{ mb: 1, borderRadius: 2 }} />
            ))
          ) : (
            <Box sx={{ overflow: 'auto' }}>
              {/* Header row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr',
                  gap: 2,
                  py: 1.5,
                  px: 2,
                  borderBottom: '2px solid',
                  borderColor: 'grey.200',
                  minWidth: 600,
                }}
              >
                {['Mã đơn', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Thời gian'].map(
                  (header) => (
                    <Typography
                      key={header}
                      variant="caption"
                      sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}
                    >
                      {header}
                    </Typography>
                  )
                )}
              </Box>

              {/* Data rows */}
              {recentOrders.map((order) => {
                const status = STATUS_MAP[order.status] || STATUS_MAP.pending
                return (
                  <Box
                    key={order.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr',
                      gap: 2,
                      py: 2,
                      px: 2,
                      borderBottom: '1px solid',
                      borderColor: 'grey.100',
                      minWidth: 600,
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' },
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#FF4B2B' }}>
                      {order.id}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {order.customer}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                    </Typography>
                    <Box>
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: 24,
                          backgroundColor: status.bgColor,
                          color: status.color,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {order.time}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          )}
        </Paper>
      </Container>

      <SiteFooter />
    </Box>
  )
}
