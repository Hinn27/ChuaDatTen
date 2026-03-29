import { supabase } from '../config/supabase.js';

export async function checkoutOrder({ userId, items, total }) {
	// Giả sử có bảng 'orders' và 'order_items' trong Supabase
	const { data: order, error: orderError } = await supabase
		.from('orders')
		.insert([{ user_id: userId, total }])
		.select()
		.single();
	if (orderError) throw new Error(orderError.message);

	const orderItems = items.map(item => ({
		order_id: order.id,
		product_id: item.productId,
		quantity: item.quantity,
		price: item.price
	}));
	const { error: itemsError } = await supabase
		.from('order_items')
		.insert(orderItems);
	if (itemsError) throw new Error(itemsError.message);

	return order;
}
