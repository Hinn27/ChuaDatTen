import { Box, Container } from "@mui/material";
import { SiteFooter } from "./SiteFooter.jsx";
import { SiteHeader } from "./SiteHeader.jsx";

/**
 * Layout khung trang chung: Header -> main container -> Footer.
 */
export function AppPageLayout({
    children,
    maxWidth = "lg",
    useContainer = true,
    showHeader = true,
    showFooter = true,
    headerProps = {},
    containerSx = {},
    contentSx = {},
}) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {showHeader ? <SiteHeader {...headerProps} /> : null}

            {useContainer ? (
                <Container
                    maxWidth={maxWidth}
                    sx={{ py: 5, flex: 1, ...containerSx }}
                >
                    <Box sx={contentSx}>{children}</Box>
                </Container>
            ) : (
                <Box sx={{ flex: 1, ...containerSx }}>
                    <Box sx={contentSx}>{children}</Box>
                </Box>
            )}

            {showFooter ? <SiteFooter /> : null}
        </Box>
    );
}
