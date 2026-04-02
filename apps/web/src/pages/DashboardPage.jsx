import BarChartIcon from '@mui/icons-material/BarChart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { RevenueChart } from '../components/dashboard/RevenueChart.jsx'

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/**
 * Format số lượng gọn (1200 → 1.2k)
 * @param {number} value
 * @returns {string}
 */
function formatCompact(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}tr`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return value.toString()
}

/**
 * Mock data thống kê tổng quan
 * TODO: Thay bằng API thật (GET /dashboard/stats)
 */
const MOCK_STATS = [
  {
    id: 'revenue',
    label: 'Doanh thu tháng',
    value: 46800000,
    format: 'currency',
    change: +12.5,
    icon: TrendingUpIcon,
    gradient: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
  },
  {
    id: 'orders',
    label: 'Đơn hàng',
    value: 324,
    format: 'number',
    change: +8.2,
    icon: ShoppingBagIcon,
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    id: 'customers',
    label: 'Khách hàng mới',
    value: 156,
    format: 'number',
    change: +23.1,
    icon: PeopleIcon,
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    id: 'deliveries',
    label: 'Đã giao thành công',
    value: 298,
    format: 'number',
    change: +5.7,
    icon: LocalShippingIcon,
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
]

/**
 * StatCard — card thống kê nhỏ
 * @param {Object} props
 * @param {Object} props.stat - stat object
 */
function StatCard({ stat }) {
  const IconComponent = stat.icon
  const displayValue =
    stat.format === 'currency' ? formatPrice(stat.value) : formatCompact(stat.value)

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
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {stat.label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 0.5 }}>
            {displayValue}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: stat.change >= 0 ? '#10B981' : '#EF4444',
              }}
            >
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              so với tháng trước
            </Typography>
          </Box>
        </Box>

        {/* Icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            background: stat.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 12px ${stat.gradient.includes('#FF4B2B') ? 'rgba(255,75,43,0.3)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <IconComponent sx={{ color: '#fff', fontSize: 24 }} />
        </Box>
      </Box>
    </Paper>
  )
}

/**
 * DashboardPage — Trang Dashboard Thống kê
 *
 * Bao gồm:
 * - 4 stat cards (doanh thu, đơn hàng, khách hàng, đã giao)
 * - Biểu đồ doanh thu (RevenueChart — Recharts)
 *
 * Xử lý 3 trạng thái: loading, success, error (theo AI_CONTEXT)
 */
export default function DashboardPage() {
  const [stats, setStats] = useState(MOCK_STATS)
  const [revenueData, setRevenueData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  /**
   * Lấy dữ liệu dashboard từ API
   * TODO: Ghép API thật (GET /dashboard/stats, GET /dashboard/revenue)
   */
  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      /**
       * TODO: Ghép API thật
       * const [statsRes, revenueRes] = await Promise.all([
       *   api.get('/dashboard/stats'),
       *   api.get('/dashboard/revenue'),
       * ])
       * setStats(statsRes.data)
       * setRevenueData(revenueRes.data)
       */

      // === MOCK: Giả lập tải 1s ===
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStats(MOCK_STATS) // Dùng mock data
      setRevenueData(null) // null → RevenueChart sẽ dùng mock data nội bộ
      // === END MOCK ===
    } catch (err) {
      setError(err.message || 'Không thể tải dữ liệu thống kê.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8F9FA', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1A1A2E',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 0.5,
            }}
          >
            <BarChartIcon sx={{ fontSize: 32, color: '#FF4B2B' }} />
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Tổng quan hoạt động kinh doanh
          </Typography>
        </Box>

        {/* Error state */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 3 }}
            action={
              <Typography
                variant="body2"
                onClick={fetchDashboardData}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#FF4B2B',
                  textDecoration: 'underline',
                  mr: 1,
                }}
              >
                Thử lại
              </Typography>
            }
          >
            {error}
          </Alert>
        )}

        {/* Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
                </Grid>
              ))
            : stats.map((stat) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
                  <StatCard stat={stat} />
                </Grid>
              ))}
        </Grid>

        {/* Revenue Chart */}
        {loading ? (
          <Skeleton variant="rounded" height={420} sx={{ borderRadius: 4 }} />
        ) : (
          <RevenueChart data={revenueData} />
        )}
      </Container>
    </Box>
  )
}
