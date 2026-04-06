const supabase = require('../config/supabase');

/**
 * Get user profile from Supabase
 * @param {string} userId
 * @returns {Promise<object>}
 */
const getUserProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }

    return data;
};

module.exports = {
    getUserProfile,
};
