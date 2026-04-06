import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OrderSummary } from '../components/checkout/OrderSummary.jsx'
import { ShippingForm } from '../components/checkout/ShippingForm.jsx'
import useAuthStore from '../stores/useAuthStore.js'
import useCartStore from '../stores/useCartStore.js'

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/** Các bước checkout */
const STEPS = ['Thông tin giao hàng', 'Xác nhận đơn hàng', 'Hoàn tất']

/** Phí giao hàng mặc định */
const SHIPPING_FEE = 15000

/**
 * CheckoutPage — Trang Thanh toán
 *
 * Bao gồm:
 * - Stepper 3 bước (Thông tin → Xác nhận → Hoàn tất)
 * - ShippingForm (thông tin giao hàng)
 * - OrderSummary (tóm tắt đơn hàng)
 * - Gọi API đặt hàng (POST /orders) — xử lý trừ tồn kho + transaction
 *
 * Xử lý 3 trạng thái: loading, success, error (theo AI_CONTEXT)
 */
export default function CheckoutPage() {
  const navigate = useNavigate()
  const { member } = useParams()
  const routeMember = member || 'a'
  const { items, getTotalPrice, clearCart } = useCartStore()
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const { user, isLoggedIn } = useAuthStore()

  useEffect(() => {
    setActiveMember(routeMember)
  }, [routeMember, setActiveMember])

  // Step state
  const [activeStep, setActiveStep] = useState(0)

  // Shipping form data
  const [shippingData, setShippingData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: '',
    note: '',
  })

  // Trạng thái xử lý đơn hàng
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [orderSuccess, setOrderSuccess] = useState(null)

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const subtotal = getTotalPrice()
  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0)

  /**
   * Xử lý thay đổi form shipping
   * @param {string} field
   * @param {string} value
   */
  const handleShippingChange = (field, value) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  /**
   * Validate bước 1 — thông tin giao hàng
   * @returns {boolean}
   */
  const validateShipping = () => {
    if (!shippingData.fullName.trim()) {
      setOrderError('Vui lòng nhập họ và tên.')
      return false
    }
    if (!shippingData.phone.trim()) {
      setOrderError('Vui lòng nhập số điện thoại.')
      return false
    }
    if (!shippingData.address.trim()) {
      setOrderError('Vui lòng nhập địa chỉ giao hàng.')
      return false
    }
    return true
  }

  /** Sang bước tiếp theo */
  const handleNext = () => {
    setOrderError(null)

    if (activeStep === 0) {
      if (!validateShipping()) return
    }

    if (activeStep === 1) {
      handlePlaceOrder()
      return
    }

    setActiveStep((prev) => prev + 1)
  }

  /** Quay lại bước trước */
  const handleBack = () => {
    setOrderError(null)
    setActiveStep((prev) => prev - 1)
  }

  /**
   * Gọi API đặt hàng — endpoint phức tạp nhất hệ thống
   * API thực hiện:
   * 1. Kiểm tra tồn kho từng sản phẩm
   * 2. Mở transaction (BEGIN)
   * 3. Trừ tồn kho (UPDATE products SET stock = stock - quantity)
   * 4. Tạo đơn hàng (INSERT INTO orders)
   * 5. Tạo chi tiết đơn hàng (INSERT INTO order_items)
   * 6. COMMIT nếu thành công, ROLLBACK nếu lỗi
   *
   * Endpoint: POST /orders
   */
  const handlePlaceOrder = async () => {
    setOrderLoading(true)
    setOrderError(null)

    try {
      // Chuẩn bị payload gửi lên API
      const orderPayload = {
        // Thông tin giao hàng
        shippingInfo: {
          fullName: shippingData.fullName.trim(),
          phone: shippingData.phone.trim(),
          address: shippingData.address.trim(),
          note: shippingData.note.trim(),
        },
        // Danh sách sản phẩm (snake_case cho DB theo ROOT_RULES)
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        // Tổng tiền
        subtotal,
        shipping_fee: SHIPPING_FEE,
        total_amount: total,
        // Phương thức thanh toán
        payment_method: 'cod', // Mặc định COD (thanh toán khi nhận hàng)
      }

      /**
       * TODO: Ghép API thật ở đây
       * const response = await api.post('/orders', orderPayload)
       * const orderResult = response.data
       */

      // === MOCK RESPONSE (xóa khi ghép API thật) ===
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Giả lập 2s
      const orderResult = {
        success: true,
        data: {
          order_id: `ORD-${Date.now()}`,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          total_amount: total,
        },
      }
      // === END MOCK ===

      if (orderResult.success) {
        setOrderSuccess(orderResult.data)
        setActiveStep(2) // Chuyển sang bước hoàn tất
        clearCart() // Xóa giỏ hàng sau khi đặt thành công
        setSnackbar({
          open: true,
          message: '🎉 Đặt hàng thành công!',
          severity: 'success',
        })
      }
    } catch (error) {
      // Xử lý lỗi từ API
      const errorMessage =
        error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đặt hàng.'

      // Xử lý các lỗi đặc biệt từ transaction
      if (error.response?.status === 409) {
        setOrderError('Sản phẩm đã hết hàng. Vui lòng kiểm tra lại giỏ hàng.')
      } else if (error.response?.status === 422) {
        setOrderError('Thông tin đơn hàng không hợp lệ. Vui lòng kiểm tra lại.')
      } else {
        setOrderError(errorMessage)
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      })
    } finally {
      setOrderLoading(false)
    }
  }

  // Giỏ hàng trống → hướng dẫn quay lại
  if (items.length === 0 && activeStep < 2) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <ShoppingCartCheckoutIcon sx={{ fontSize: 36, color: '#FF9A2B' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1A1A2E' }}>
          Giỏ hàng trống
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/${routeMember}/shop`)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 3,
            px: 4,
            py: 1.2,
            background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e0412a, #e88a25)',
            },
          }}
        >
          Quay lại trang chủ
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8F9FA', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              mb: 2,
              '&:hover': { color: '#FF4B2B' },
            }}
          >
            Quay lại
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1A1A2E',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <ReceiptLongIcon sx={{ fontSize: 32, color: '#FF4B2B' }} />
            Thanh toán
          </Typography>
        </Box>

        {/* Stepper */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': { color: '#FF4B2B' },
                      '&.Mui-completed': { color: '#10B981' },
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: activeStep === index ? 700 : 400,
                      color: activeStep === index ? '#1A1A2E' : 'text.secondary',
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Error Alert */}
        {orderError && (
          <Fade in>
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 3 }}
              onClose={() => setOrderError(null)}
            >
              {orderError}
            </Alert>
          </Fade>
        )}

        {/* Step Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: activeStep < 2 ? '1.2fr 0.8fr' : '1fr' },
            gap: 4,
          }}
        >
          {/* === BƯỚC 1: Thông tin giao hàng === */}
          {activeStep === 0 && (
            <>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <LocalShippingIcon sx={{ color: '#FF4B2B' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Thông tin giao hàng
                  </Typography>
                </Box>
                <ShippingForm
                  formData={shippingData}
                  onChange={handleShippingChange}
                />

                {/* Phương thức thanh toán */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1A1A2E' }}>
                  Phương thức thanh toán
                </Typography>
                <Chip
                  label="💵 Thanh toán khi nhận hàng (COD)"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    py: 2.5,
                    px: 1,
                    backgroundColor: '#FFF3E0',
                    color: '#E65100',
                    border: '2px solid #FF9A2B',
                  }}
                />
              </Paper>

              {/* Order Summary bên phải */}
              <Box>
                <OrderSummary shippingFee={SHIPPING_FEE} />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleNext}
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
                  Tiếp tục xác nhận →
                </Button>
              </Box>
            </>
          )}

          {/* === BƯỚC 2: Xác nhận đơn hàng === */}
          {activeStep === 1 && (
            <>
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

                {/* Thông tin giao hàng đã nhập */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: '#F8F9FA',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, color: '#FF4B2B', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LocalShippingIcon sx={{ fontSize: 18 }} />
                    Giao đến
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {shippingData.fullName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    📞 {shippingData.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    📍 {shippingData.address}
                  </Typography>
                  {shippingData.note && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontStyle: 'italic' }}>
                      📝 {shippingData.note}
                    </Typography>
                  )}
                </Box>

                <Chip
                  label="💵 Thanh toán khi nhận hàng (COD)"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: '#FFF3E0',
                    color: '#E65100',
                  }}
                />
              </Paper>

              {/* Order Summary bên phải */}
              <Box>
                <OrderSummary shippingFee={SHIPPING_FEE} />
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={handleBack}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 3,
                      borderColor: 'grey.300',
                      color: 'text.secondary',
                      py: 1.5,
                    }}
                  >
                    ← Quay lại
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    disabled={orderLoading}
                    sx={{
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
                    {orderLoading ? (
                      <CircularProgress size={24} sx={{ color: '#fff' }} />
                    ) : (
                      `Đặt hàng — ${formatPrice(total)}`
                    )}
                  </Button>
                </Box>
              </Box>
            </>
          )}

          {/* === BƯỚC 3: Hoàn tất === */}
          {activeStep === 2 && orderSuccess && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
                maxWidth: 560,
                mx: 'auto',
              }}
            >
              {/* Success Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 44, color: '#10B981' }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 1 }}>
                Đặt hàng thành công! 🎉
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
              </Typography>

              {/* Order Details */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#F8F9FA',
                  textAlign: 'left',
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Mã đơn hàng
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#FF4B2B' }}>
                    {orderSuccess.order_id}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Trạng thái
                  </Typography>
                  <Chip
                    label="Đã xác nhận"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: '#ECFDF5',
                      color: '#10B981',
                    }}
                  />
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tổng thanh toán
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FF4B2B' }}>
                    {formatPrice(orderSuccess.total_amount)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate(`/${routeMember}/shop`)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    py: 1.2,
                  }}
                >
                  Về trang chủ
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/${routeMember}/shop`)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 3,
                    py: 1.2,
                    background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                    },
                  }}
                >
                  Tiếp tục mua sắm
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ borderRadius: 3, fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
