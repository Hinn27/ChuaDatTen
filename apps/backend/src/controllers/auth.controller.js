import * as AuthService from '../services/auth.service.js';

export const register = async (req, res, next) => {
	try {
		const user = await AuthService.register(req.body);
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const { user, token } = await AuthService.login(req.body);
		res.json({ user, token });
	} catch (err) {
		next(err);
	}
};

export const getProfile = async (req, res, next) => {
	try {
		const user = await AuthService.getUserById(req.user.id);
		res.json({ user });
	} catch (err) {
		next(err);
	}
};
