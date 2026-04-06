import { TextField } from '@mui/material'

export function ShippingForm({ formData, onChange }) {
  return (
    <>
      <TextField
        fullWidth
        label="Ho va ten"
        value={formData.fullName}
        onChange={(event) => onChange('fullName', event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="So dien thoai"
        value={formData.phone}
        onChange={(event) => onChange('phone', event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Dia chi"
        value={formData.address}
        onChange={(event) => onChange('address', event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Ghi chu"
        value={formData.note}
        onChange={(event) => onChange('note', event.target.value)}
      />
    </>
  )
}

