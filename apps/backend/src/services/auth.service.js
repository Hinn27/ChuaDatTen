import { supabase } from '../config/supabase.js';

/**
 * Register user via Supabase Auth and attach metadata.
 * @param {{email: string, password: string, fullName: string, role: 'CUSTOMER'|'STORE_OWNER'|'ADMIN'}} payload
 */
export async function register({ email, password, fullName, role }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role,
            },
        },
    });
    if (error) throw new Error(error.message);
    return {
        user: data.user,
        token: data?.session?.access_token || null,
    };
}

/**
 * Login and return Supabase access token.
 * @param {{email: string, password: string}} payload
 */
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    const token = data?.session?.access_token;
    if (!token) {
        throw new Error('Khong tao duoc access token tu Supabase session');
    }
    return { user: data.user, token };
}

/**
 * Resolve user by id using service role admin API.
 * @param {string} id
 */
export async function getUserById(id) {
    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) throw new Error(error.message);
    return data.user;
}
