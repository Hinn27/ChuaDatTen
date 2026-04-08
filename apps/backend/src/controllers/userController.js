const userService = require('../services/userService');

/**
 * @desc    Get user profile
 * @route   GET /api/users/:id
 * @access  Private (Assume some auth middleware later)
 */
const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserProfile(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: 'User not found',
                },
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: 'Lay thong tin user thanh cong',
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUserProfile,
};
