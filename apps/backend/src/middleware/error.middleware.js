// Global error handler
export function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: err.message || 'Da co loi xay ra',
        },
    });
}

// Backward-compatible alias used by app.js
export const centralErrorHandler = errorHandler;
