import { Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard.jsx";

export function ProductList({
    products = [],
    emptyMessage = "Chua co san pham.",
    member,
    columns = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
    },
}) {
    if (!products.length) {
        return (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {emptyMessage}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: Object.fromEntries(
                    Object.entries(columns).map(([breakpoint, count]) => [
                        breakpoint,
                        `repeat(${count}, minmax(0, 1fr))`,
                    ]),
                ),
                gap: 2,
            }}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    memberOverride={member}
                />
            ))}
        </Box>
    );
}
