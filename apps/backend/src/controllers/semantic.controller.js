import * as SemanticService from '../services/semantic.service.js';

export const searchFoods = async (req, res, next) => {
    try {
        const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
        if (!query) {
            const err = new Error('q la bat buoc');
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
            throw err;
        }

        const results = await SemanticService.semanticSearch(query);
        res.status(200).json({
            success: true,
            data: results,
            message: 'Tim kiem semantic thanh cong',
        });
    } catch (err) {
        next(err);
    }
};
