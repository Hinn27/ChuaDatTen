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
            res.status(404);
            throw new Error('User not found');
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserProfile,
};
