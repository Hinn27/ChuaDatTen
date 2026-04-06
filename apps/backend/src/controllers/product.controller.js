import * as productService from '../services/product.service.js';

/**
 * GET /api/products
 * Tra ve danh sach san pham voi phan trang va bo loc co ban.
 */
export async function getProducts(req, res, next) {
	try {
		const result = await productService.listProducts(req.query);
		return res.status(200).json({
			success: true,
			data: result,
			message: 'Lay danh sach san pham thanh cong',
		});
	} catch (error) {
		return next(error);
	}
}

/**
 * GET /api/products/:id
 * Tra ve chi tiet mot san pham.
 */
export async function getProductById(req, res, next) {
	try {
		const product = await productService.findProductById(req.params.id);
		if (!product) {
			return res.status(404).json({
				success: false,
				error: {
					code: 'PRODUCT_NOT_FOUND',
					message: 'Khong tim thay san pham',
				},
			});
		}

		return res.status(200).json({
			success: true,
			data: product,
			message: 'Lay chi tiet san pham thanh cong',
		});
	} catch (error) {
		return next(error);
	}
}

/**
 * GET /api/products/stats/bestsellers
 * Tra ve thong ke mon ban chay toan bo va theo tung danh muc.
 */
export async function getBestsellerStats(req, res, next) {
	try {
		const data = await productService.getBestsellerStats(req.query);
		return res.status(200).json({
			success: true,
			data,
			message: 'Lay thong ke bestseller thanh cong',
		});
	} catch (error) {
		return next(error);
	}
}

/**
 * GET /api/products/stats/regional-bestsellers
 * Tra ve thong ke mon ban chay theo 3 vung: Bac, Trung, Nam.
 */
export async function getRegionalBestsellerStats(req, res, next) {
	try {
		const data = await productService.getRegionalBestsellerStats(req.query);
		return res.status(200).json({
			success: true,
			data,
			message: 'Lay thong ke regional bestseller thanh cong',
		});
	} catch (error) {
		return next(error);
	}
}
