import { useState } from 'react'
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

/**
 * Mock data doanh thu
 */
const MOCK_DATA = {
  week: [
    { name: 'T2', revenue: 1200000 },
    { name: 'T3', revenue: 1800000 },
    { name: 'T4', revenue: 1500000 },
    { name: 'T5', revenue: 2200000 },
    { name: 'T6', revenue: 2800000 },
    { name: 'T7', revenue: 3500000 },
    { name: 'CN', revenue: 2000000 },
  ],
  month: [
    { name: 'Tuần 1', revenue: 8500000 },
    { name: 'Tuần 2', revenue: 12000000 },
    { name: 'Tuần 3', revenue: 10500000 },
    { name: 'Tuần 4', revenue: 15800000 },
  ],
  year: [
    { name: 'T1', revenue: 35000000 },
    { name: 'T2', revenue: 42000000 },
    { name: 'T3', revenue: 38000000 },
    { name: 'T4', revenue: 55000000 },
    { name: 'T5', revenue: 48000000 },
    { name: 'T6', revenue: 62000000 },
    { name: 'T7', revenue: 58000000 },
    { name: 'T8', revenue: 70000000 },
    { name: 'T9', revenue: 65000000 },
    { name: 'T10', revenue: 72000000 },
    { name: 'T11', revenue: 80000000 },
    { name: 'T12', revenue: 95000000 },
  ],
}

/**
 * Format giá tiền VND gọn
 * @param {number} value
 * @returns {string}
 */
function formatCompact(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}tr`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
  return value.toString()
}

/**
 * Custom tooltip cho chart
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <Box
      sx={{
        backgroundColor: '#1A1A2E',
        borderRadius: 2,
        px: 2,
        py: 1,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <Typography variant="caption" sx={{ color: '#999' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#FF9A2B', fontWeight: 700 }}>
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          payload[0].value
        )}
      </Typography>
    </Box>
  )
}

/**
 * RevenueChart — biểu đồ doanh thu
 * Hỗ trợ toggle: Tuần / Tháng / Năm
 *
 * @param {Object} props
 * @param {Object} [props.data] - Data từ API. Nếu không truyền, dùng mock.
 */
export function RevenueChart({ data = null }) {
  const [period, setPeriod] = useState('week')
  const chartData = data?.[period] || MOCK_DATA[period]

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Doanh thu
        </Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, val) => val && setPeriod(val)}
          size="small"
        >
          <ToggleButton
            value="week"
            sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
          >
            Tuần
          </ToggleButton>
          <ToggleButton
            value="month"
            sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
          >
            Tháng
          </ToggleButton>
          <ToggleButton
            value="year"
            sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
          >
            Năm
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF4B2B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF4B2B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#999' }}
              axisLine={{ stroke: '#eee' }}
            />
            <YAxis
              tickFormatter={formatCompact}
              tick={{ fontSize: 12, fill: '#999' }}
              axisLine={{ stroke: '#eee' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF4B2B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={{ r: 4, fill: '#FF4B2B', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#FF4B2B', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
