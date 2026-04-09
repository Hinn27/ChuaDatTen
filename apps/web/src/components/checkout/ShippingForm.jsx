import { Stack, TextField } from "@mui/material";

export function ShippingForm({ formData, onChange }) {
    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(event) => onChange("fullName", event.target.value)}
            />
            <TextField
                fullWidth
                label="Số điện thoại"
                placeholder="09xxxxxxxx"
                value={formData.phone}
                onChange={(event) => onChange("phone", event.target.value)}
            />
            <TextField
                fullWidth
                label="Địa chỉ"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                value={formData.address}
                onChange={(event) => onChange("address", event.target.value)}
            />
            <TextField
                fullWidth
                multiline
                minRows={3}
                label="Ghi chú"
                placeholder="Ví dụ: Gọi trước khi giao 10 phút"
                value={formData.note}
                onChange={(event) => onChange("note", event.target.value)}
            />
        </Stack>
    );
}
