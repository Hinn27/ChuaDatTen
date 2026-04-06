import { supabase } from '../config/supabase.js';

/**
 * Lay danh sach san pham.
 * @param {{ page?: string|number, limit?: string|number, categoryId?: string, storeId?: string, q?: string }} query
 * @returns {Promise<{items: object[], meta: {page: number, limit: number, total: number}}>} 
 */
export async function listProducts(query = {}) {
	const page = Math.max(1, Number.parseInt(query.page || 1, 10));
	const limit = Math.min(50, Math.max(1, Number.parseInt(query.limit || 20, 10)));
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	let builder = supabase
		.from('products')
		.select('*', { count: 'exact' });

	if (query.categoryId) {
		builder = builder.eq('category_id', query.categoryId);
	}

	if (query.storeId) {
		builder = builder.eq('store_id', query.storeId);
	}

	if (query.q) {
		builder = builder.or(`name.ilike.%${query.q}%,description.ilike.%${query.q}%`);
	}

	const { data, error, count } = await builder.range(from, to);
	if (error) {
		throw new Error(error.message);
	}

	return {
		items: data || [],
		meta: {
			page,
			limit,
			total: count || 0,
		},
	};
}

/**
 * Lay chi tiet san pham theo id.
 * @param {string} productId
 * @returns {Promise<object|null>}
 */
export async function findProductById(productId) {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.eq('id', productId)
		.single();

	if (error && error.code !== 'PGRST116') {
		throw new Error(error.message);
	}

	return data || null;
}
