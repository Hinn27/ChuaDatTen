import * as OrderService from '../services/order.service.js';

export const checkout = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { items, total } = req.body;
		const order = await OrderService.checkoutOrder({ userId, items, total });
		res.status(201).json({ order });
	} catch (err) {
		next(err);
	}
};
