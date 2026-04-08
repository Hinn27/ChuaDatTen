import * as AuthService from '../services/auth.service.js';

/**
 * @param {unknown} value
 * @returns {string}
 */
function asTrimmedString(value) {
    return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validate register payload and normalize values.
 * @param {object} body
 */
function validateRegisterBody(body = {}) {
    const email = asTrimmedString(body.email).toLowerCase();
    const password = asTrimmedString(body.password);
    const fullName = asTrimmedString(body.fullName);
    const role = asTrimmedString(body.role).toUpperCase() || 'CUSTOMER';

    if (!email || !password || !fullName) {
        const err = new Error('email, password va fullName la bat buoc');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    if (!['CUSTOMER', 'STORE_OWNER', 'ADMIN'].includes(role)) {
        const err = new Error('role khong hop le');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { email, password, fullName, role };
}

/**
 * Validate login payload.
 * @param {object} body
 */
function validateLoginBody(body = {}) {
    const email = asTrimmedString(body.email).toLowerCase();
    const password = asTrimmedString(body.password);

    if (!email || !password) {
        const err = new Error('email va password la bat buoc');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { email, password };
}

export const register = async (req, res, next) => {
    try {
        const payload = validateRegisterBody(req.body);
        const { user, token } = await AuthService.register(payload);
        res.status(201).json({
            success: true,
            data: { user, token },
            message: 'Dang ky thanh cong',
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const payload = validateLoginBody(req.body);
        const { user, token } = await AuthService.login(payload);
        res.status(200).json({
            success: true,
            data: { user, token },
            message: 'Dang nhap thanh cong',
        });
    } catch (err) {
        next(err);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await AuthService.getUserById(req.user.id);
        res.status(200).json({
            success: true,
            data: user,
            message: 'Lay thong tin nguoi dung thanh cong',
        });
    } catch (err) {
        next(err);
    }
};
