import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  Chip,
  Snackbar,
  Fade,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { ShippingForm } from '../components/checkout/ShippingForm.jsx'
import { OrderSummary } from '../components/checkout/OrderSummary.jsx'
import useCartStore from '../stores/useCartStore.js'
import useAuthStore from '../stores/useAuthStore.js'
import api from '../services/api.js'

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/** Các bước checkout */
const STEPS = ['Thông tin giao hàng', 'Xác nhận & Thanh toán', 'Hoàn tất']

/** Phí giao hàng mặc định */
const SHIPPING_FEE = 15000

/**
 * CheckoutPage — Trang thanh toán
 *
 * Luồng 3 bước:
 *  1. Nhập thông tin giao hàng (ShippingForm)
 *  2. Xác nhận đơn & bấm đặt hàng (gọi API đặt hàng)
 *  3. Thông báo thành công
 *
 * API đặt hàng phức tạp nhất hệ thống:
 *  - Xử lý trừ tồn kho (inventory deduction)
 *  - Sử dụng database transaction để đảm bảo tính toàn vẹn
 *  - Endpoint: POST /orders
 */
export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user, isLoggedIn } = useAuthStore()

  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)

  const [shippingData, setShippingData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: '',
    note: '',
  })

  const subtotal = getTotalPrice()
  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0)

  /**
   * Xử lý thay đổi form giao hàng
   * @param {string} field
   * @param {string} value
   */
  const handleShippingChange = (field, value) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  /**
   * Validate form giao hàng
   * @returns {boolean}
   */
  const validateShipping = () => {
    if (!shippingData.fullName.trim()) {
      setError('Vui lòng nhập họ và tên.')
      return false
    }
    if (!shippingData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại.')
      return false
    }
    if (!shippingData.address.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng.')
      return false
    }
    return true
  }

  /** Bước 1 → Bước 2 */
  const handleNextStep = () => {
    setError(null)
    if (activeStep === 0) {
      if (!validateShipping()) return
    }
    setActiveStep((prev) => prev + 1)
  }

  /** Bước 2 → Bước 1 */
  const handleBackStep = () => {
    setError(null)
    setActiveStep((prev) => prev - 1)
  }

  /**
   * GỌI API ĐẶT HÀNG
   *
   * Đây là API phức tạp nhất hệ thống:
   *  - Backend sử dụng database transaction (BEGIN → COMMIT/ROLLBACK)
   *  - Trừ tồn kho (stock) cho từng sản phẩm
   *  - Nếu 1 sản phẩm hết hàng → rollback toàn bộ → trả lỗi
   *  - Tạo bản ghi order + order_items trong 1 transaction
   *
   * Payload gửi đi:
   * {
   *   shippingInfo: { fullName, phone, address, note },
   *   items: [{ productId, quantity, unitPrice }],
   *   totalAmount: number,
   *   shippingFee: number
   * }
   */
  const handlePlaceOrder = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        shippingInfo: {
          fullName: shippingData.fullName,
          phone: shippingData.phone,
          address: shippingData.address,
          note: shippingData.note || '',
        },
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount: total,
        shippingFee: SHIPPING_FEE,
      }

      // ====================================================
      // TODO: Bạn tự ghép API endpoint thực tế ở đây
      // API này xử lý: transaction, trừ tồn kho, tạo đơn
      // ====================================================
      const response = await api.post('/orders', payload)

      setOrderId(response.data?.orderId || response.data?.id || 'RF-' + Date.now())
      clearCart()
      setActiveStep(2)
      setSnackOpen(true)
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Đặt hàng thất bại. Vui lòng thử lại.'

      // Xử lý lỗi hết tồn kho
      if (err.response?.status === 409) {
        setError('⚠️ Một số sản phẩm đã hết hàng. Vui lòng kiểm tra lại giỏ hàng.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // GUARD: Kiểm tra giỏ hàng trống
  // ==========================================
  if (items.length === 0 && activeStep !== 2) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SiteHeader />
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Typography sx={{ fontSize: '4rem', mb: 2 }}>🛒</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1A1A2E' }}>
            Giỏ hàng trống
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
            Bạn chưa có sản phẩm nào trong giỏ hàng.
            Hãy khám phá thực đơn và thêm món ngon nhé!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
              '&:hover': {
                background: 'linear-gradient(135deg, #e0412a, #e88a25)',
              },
            }}
          >
            Khám phá thực đơn
          </Button>
        </Container>
        <SiteFooter />
      </Box>
    )
  }

  // ==========================================
  // GUARD: Chưa đăng nhập
  // ==========================================
  if (!isLoggedIn) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SiteHeader />
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <LockIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1A1A2E' }}>
            Vui lòng đăng nhập
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
            Bạn cần đăng nhập để tiến hành thanh toán.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/auth')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
              '&:hover': {
                background: 'linear-gradient(135deg, #e0412a, #e88a25)',
              },
            }}
          >
            Đăng nhập ngay
          </Button>
        </Container>
        <SiteFooter />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FA' }}>
      <SiteHeader />

      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            mb: 3,
            '&:hover': { color: '#FF4B2B' },
          }}
        >
          Quay lại
        </Button>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Thanh toán
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Hoàn tất đơn hàng của bạn
        </Typography>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 5,
            '& .MuiStepLabel-label': { fontWeight: 600, fontSize: '0.85rem' },
            '& .Mui-active .MuiStepIcon-root': { color: '#FF4B2B' },
            '& .Mui-completed .MuiStepIcon-root': { color: '#10B981' },
          }}
        >
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel
                icon={
                  index === 0 ? <LocalShippingIcon /> :
                  index === 1 ? <PaymentIcon /> :
                  <CheckCircleIcon />
                }
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ mb: 3, borderRadius: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* ========================================= */}
        {/* BƯỚC 1: THÔNG TIN GIAO HÀNG */}
        {/* ========================================= */}
        {activeStep === 0 && (
          <Fade in>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' },
                gap: 4,
              }}
            >
              {/* Left — Shipping Form */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <ShippingForm formData={shippingData} onChange={handleShippingChange} />

                <Divider sx={{ my: 3 }} />

                {/* Payment Method (placeholder) */}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Phương thức thanh toán
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
                  <Chip
                    label="💵 Thanh toán khi nhận hàng (COD)"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: '#FF4B2B',
                      color: '#FF4B2B',
                      backgroundColor: 'rgba(255,75,43,0.05)',
                      py: 2.5,
                      px: 1,
                    }}
                  />
                  <Chip
                    label="💳 Chuyển khoản"
                    variant="outlined"
                    disabled
                    sx={{ py: 2.5, px: 1 }}
                  />
                  <Chip
                    label="🏦 Ví điện tử"
                    variant="outlined"
                    disabled
                    sx={{ py: 2.5, px: 1 }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  * Hiện tại hỗ trợ COD. Các phương thức khác sẽ sớm ra mắt.
                </Typography>
              </Paper>

              {/* Right — Order Summary */}
              <Box>
                <OrderSummary shippingFee={SHIPPING_FEE} />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleNextStep}
                  sx={{
                    mt: 3,
                    textTransform: 'none',
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                    boxShadow: '0 4px 16px rgba(255,75,43,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                    },
                  }}
                >
                  Tiếp tục xác nhận
                </Button>
              </Box>
            </Box>
          </Fade>
        )}

        {/* ========================================= */}
        {/* BƯỚC 2: XÁC NHẬN & ĐẶT HÀNG */}
        {/* ========================================= */}
        {activeStep === 1 && (
          <Fade in>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' },
                gap: 4,
              }}
            >
              {/* Left — Confirm details */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Xác nhận thông tin
                </Typography>

                {/* Shipping info review */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: '#F8F9FA',
                    mb: 3,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#FF4B2B' }}>
                    📦 Thông tin giao hàng
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1, rowGap: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Họ tên:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{shippingData.fullName}</Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>SĐT:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{shippingData.phone}</Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Địa chỉ:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{shippingData.address}</Typography>

                    {shippingData.note && (
                      <>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Ghi chú:</Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{shippingData.note}</Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {/* Payment info */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: '#F8F9FA',
                    mb: 3,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#FF4B2B' }}>
                    💵 Thanh toán
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Thanh toán khi nhận hàng (COD)
                  </Typography>
                </Box>

                {/* Transaction info box */}
                <Alert
                  severity="info"
                  icon={<LockIcon fontSize="small" />}
                  sx={{
                    borderRadius: 3,
                    '& .MuiAlert-icon': { color: '#1976d2' },
                  }}
                >
                  <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
                    Đơn hàng sẽ được xử lý bằng <strong>database transaction</strong>.
                    Hệ thống sẽ kiểm tra tồn kho và trừ số lượng khi đặt hàng thành công.
                    Nếu có sản phẩm hết hàng, toàn bộ đơn sẽ bị hủy để đảm bảo tính toàn vẹn dữ liệu.
                  </Typography>
                </Alert>

                <Divider sx={{ my: 3 }} />

                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBackStep}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 3,
                      borderColor: 'grey.300',
                      color: 'text.secondary',
                      px: 3,
                      '&:hover': { borderColor: '#FF4B2B', color: '#FF4B2B' },
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    sx={{
                      flex: 1,
                      textTransform: 'none',
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                      boxShadow: '0 4px 16px rgba(255,75,43,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} sx={{ color: '#fff' }} />
                        Đang xử lý đơn hàng...
                      </Box>
                    ) : (
                      `Đặt hàng — ${formatPrice(total)}`
                    )}
                  </Button>
                </Box>
              </Paper>

              {/* Right — Order Summary */}
              <OrderSummary shippingFee={SHIPPING_FEE} />
            </Box>
          </Fade>
        )}

        {/* ========================================= */}
        {/* BƯỚC 3: HOÀN TẤT */}
        {/* ========================================= */}
        {activeStep === 2 && (
          <Fade in>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 520,
                mx: 'auto',
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40, color: '#fff' }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1A1A2E' }}>
                Đặt hàng thành công! 🎉
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Cảm ơn bạn đã đặt hàng tại Refood.
                Đơn hàng của bạn đang được xử lý.
              </Typography>

              {orderId && (
                <Chip
                  label={`Mã đơn hàng: ${orderId}`}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    py: 2.5,
                    px: 2,
                    mb: 4,
                    backgroundColor: '#ECFDF5',
                    color: '#10B981',
                  }}
                />
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                    },
                  }}
                >
                  Về trang chủ
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': { borderColor: '#FF4B2B', color: '#FF4B2B' },
                  }}
                >
                  Xem thống kê
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Container>

      {/* Snackbar success */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 3, fontWeight: 600 }}
        >
          🎉 Đơn hàng đã được đặt thành công!
        </Alert>
      </Snackbar>

      <SiteFooter />
    </Box>
  )
}
