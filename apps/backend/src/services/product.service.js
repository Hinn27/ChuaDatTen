import { supabase } from '../config/supabase.js';

function toNumber(value, fallback = 0) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveCategoryName(product = {}) {
	return (
		product.category ||
		product.category_name ||
		product.category_id ||
		'Khac'
	);
}

function resolveImageUrl(product = {}) {
	return (
		product.image_url ||
		product.image ||
		'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?w=800&q=80'
	);
}

function mapStatsProduct(product, soldQuantity) {
	const price = toNumber(product.price, 0);
	const originalPrice = toNumber(product.original_price, price > 0 ? price * 1.25 : 0);

	return {
		id: product.id,
		name: product.name || 'San pham',
		category: resolveCategoryName(product),
		price,
		originalPrice,
		image: resolveImageUrl(product),
		soldQuantity,
	};
}

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

/**
 * Lay thong ke bestseller cho trang chu.
 * @param {{globalLimit?: string|number, categoryLimit?: string|number}} query
 */
export async function getBestsellerStats(query = {}) {
	const globalLimit = Math.min(20, Math.max(1, Number.parseInt(query.globalLimit || 3, 10)));
	const categoryLimit = Math.min(20, Math.max(1, Number.parseInt(query.categoryLimit || 8, 10)));

	const [{ data: products, error: productsError }, { data: orderItems, error: orderItemsError }] = await Promise.all([
		supabase.from('products').select('*'),
		supabase.from('order_items').select('product_id, quantity'),
	]);

	if (productsError) {
		throw new Error(productsError.message);
	}

	const soldByProductId = new Map();
	if (!orderItemsError && Array.isArray(orderItems)) {
		for (const item of orderItems) {
			const productId = item?.product_id;
			if (!productId) continue;
			soldByProductId.set(
				productId,
				toNumber(soldByProductId.get(productId), 0) + toNumber(item?.quantity, 0)
			);
		}
	}

	const productsWithSales = (products || []).map((product) => ({
		product,
		soldQuantity: toNumber(soldByProductId.get(product.id), 0),
	}));

	productsWithSales.sort((a, b) => {
		if (b.soldQuantity !== a.soldQuantity) {
			return b.soldQuantity - a.soldQuantity;
		}
		return toNumber(b.product.price, 0) - toNumber(a.product.price, 0);
	});

	const globalTopSellers = productsWithSales
		.slice(0, globalLimit)
		.map(({ product, soldQuantity }) => mapStatsProduct(product, soldQuantity));

	const topByCategoryMap = new Map();
	for (const row of productsWithSales) {
		const category = resolveCategoryName(row.product);
		const currentTop = topByCategoryMap.get(category);

		if (!currentTop || row.soldQuantity > currentTop.soldQuantity) {
			topByCategoryMap.set(category, row);
		}
	}

	const topByCategory = Array.from(topByCategoryMap.values())
		.sort((a, b) => {
			if (b.soldQuantity !== a.soldQuantity) {
				return b.soldQuantity - a.soldQuantity;
			}
			return (a.product.name || '').localeCompare(b.product.name || '');
		})
		.slice(0, categoryLimit)
		.map(({ product, soldQuantity }) => mapStatsProduct(product, soldQuantity));

	return {
		globalTopSellers,
		topByCategory,
	};
}

/**
 * Lay top bestseller theo 3 regions: North (Cơm), Central (Bún/Mì/Phở), South (Đồ chiên).
 * @param {{ limit?: string|number }} query
 * @returns {Promise<{regional: {region: string, highlight: string, description: string, image: string, products: object[]}[]}>}
 */
export async function getRegionalBestsellerStats(query = {}) {
	const limit = Math.min(10, Math.max(1, Number.parseInt(query.limit || 3, 10)));

	const [{ data: products, error: productsError }, { data: orderItems, error: orderItemsError }] = await Promise.all([
		supabase.from('products').select('*'),
		supabase.from('order_items').select('product_id, quantity'),
	]);

	if (productsError) {
		throw new Error(productsError.message);
	}

	const soldByProductId = new Map();
	if (!orderItemsError && Array.isArray(orderItems)) {
		for (const item of orderItems) {
			const productId = item?.product_id;
			if (!productId) continue;
			soldByProductId.set(
				productId,
				toNumber(soldByProductId.get(productId), 0) + toNumber(item?.quantity, 0)
			);
		}
	}

	const productsWithSales = (products || []).map((product) => ({
		product,
		soldQuantity: toNumber(soldByProductId.get(product.id), 0),
	}));

	productsWithSales.sort((a, b) => {
		if (b.soldQuantity !== a.soldQuantity) {
			return b.soldQuantity - a.soldQuantity;
		}
		return toNumber(b.product.price, 0) - toNumber(a.product.price, 0);
	});

	// Map categories to regions
	const regionMap = {
		'Cơm': { region: 'Miền Bắc', highlight: 'Cơm nóng', tone: 'north', route: '/a/products' },
		'Bún/Mì/Phở': { region: 'Miền Trung', highlight: 'Bún bò', tone: 'central', route: '/b/products' },
		'Đồ chiên': { region: 'Miền Nam', highlight: 'Đồ chiên vàng', tone: 'south', route: '/c/products' },
	};

	const topByRegion = new Map();
	for (const row of productsWithSales) {
		const category = resolveCategoryName(row.product);
		const regionInfo = regionMap[category];

		if (regionInfo) {
			const regionKey = regionInfo.region;
			if (!topByRegion.has(regionKey)) {
				topByRegion.set(regionKey, []);
			}
			const regionProducts = topByRegion.get(regionKey);
			if (regionProducts.length < limit) {
				regionProducts.push({
					product: row.product,
					soldQuantity: row.soldQuantity,
				});
			}
		}
	}

	const regional = Array.from(topByRegion.entries())
		.map(([region, items]) => {
			const firstItem = items[0];
			const regionInfo = Object.values(regionMap).find((r) => r.region === region);
			return {
				region,
				highlight: firstItem ? firstItem.product.name : regionInfo?.highlight || 'Đặc sản',
				description: `Các món bán chạy nhất tại ${region}`,
				image:
					firstItem && resolveImageUrl(firstItem.product)
						? resolveImageUrl(firstItem.product)
						: 'https://images.unsplash.com/photo-1504674900967-77e97cba23c1?w=900&q=80',
				tone: regionInfo?.tone || 'north',
				route: regionInfo?.route || '/a/products',
				products: items.map(({ product, soldQuantity }) => mapStatsProduct(product, soldQuantity)),
			};
		});

	return { regional };
}
