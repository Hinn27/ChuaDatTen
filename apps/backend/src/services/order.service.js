import { supabase } from '../config/supabase.js';

// Sử dụng Supabase transaction (PostgREST) để đảm bảo tính nhất quán
export async function checkoutOrder({ userId, items, total }) {
    const client = supabase;
    const result = await client.rpc('checkout_transaction', {
        p_user_id: userId,
        p_items: items,
        p_total: total
    });
    if (result.error) throw new Error(result.error.message);
    return result.data;
}
