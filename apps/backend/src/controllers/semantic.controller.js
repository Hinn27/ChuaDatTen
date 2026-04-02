import * as SemanticService from '../services/semantic.service.js';

export const searchFoods = async (req, res, next) => {
    try {
        const { query } = req.body;
        const results = await SemanticService.semanticSearch(query);
        res.json({ results });
    } catch (err) {
        next(err);
    }
};
