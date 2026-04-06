/**
 * CartDrawer.jsx
 * Component hiển thị giỏ hàng dùng Zustand (`useCartStore`) và Material UI.
 * - Hiển thị nút giỏ hàng với badge số lượng
 * - Drawer bên phải liệt kê item, chỉnh số lượng, xóa, và nút Checkout / Clear
 */
import React from 'react'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import useCartStore from '../../stores/useCartStore'

/**
 * Format số tiền (định dạng quốc tế, mặc định USD)
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  } catch (e) {
    return `${value}`
  }
}

/**
 * CartDrawer component
 */
export default function CartDrawer() {
  const [open, setOpen] = React.useState(false)

  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  // store cung cấp cả getter helpers
  const totalItems = useCartStore((s) => (typeof s.getTotalItems === 'function' ? s.getTotalItems() : s.totalItems))
  const totalPrice = useCartStore((s) => (typeof s.getTotalPrice === 'function' ? s.getTotalPrice() : s.totalPrice))

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="Open cart">
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: { xs: 320, sm: 420 }, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Your Cart ({totalItems})</Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, overflowY: 'auto', mt: 1 }}>
            {items.length === 0 ? (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="body1">Your cart is empty.</Typography>
              </Box>
            ) : (
              <List>
                {items.map((item) => (
                  <ListItem key={item.id} alignItems="flex-start" sx={{ py: 1.25 }}>
                    <ListItemAvatar>
                      <Avatar src={item.image} alt={item.name} variant="rounded" sx={{ width: 64, height: 64 }} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.name}</Typography>}
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(item.price)} • Qty: {item.quantity}
                        </Typography>
                      }
                      sx={{ ml: 1 }}
                    />

                    <ListItemSecondaryAction>
                      <Stack direction="column" spacing={1} alignItems="flex-end">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <IconButton size="small" aria-label="decrease" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 28, textAlign: 'center' }}>{item.quantity}</Typography>
                          <IconButton size="small" aria-label="increase" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>

                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>

                        <Tooltip title="Remove">
                          <IconButton size="small" color="error" onClick={() => removeItem(item.id)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total
            </Typography>
            <Typography variant="h6">{formatCurrency(totalPrice)}</Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary" fullWidth disabled={items.length === 0} onClick={() => { /* TODO: Checkout action */ }}>
              Checkout
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => clearCart()} disabled={items.length === 0}>
              Clear
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}
