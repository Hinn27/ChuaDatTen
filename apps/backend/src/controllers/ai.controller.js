import { generateText } from '../services/ai.service.js';

/**
 * Validate AI generate payload.
 * @param {object} body
 */
function validateGenerateBody(body = {}) {
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

    if (!prompt) {
        const err = new Error('prompt la bat buoc');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    if (prompt.length > 6000) {
        const err = new Error('prompt vuot qua do dai cho phep');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { prompt };
}

/**
 * POST /api/v1/ai/generate
 * AI gateway endpoint: frontend sends prompt -> backend calls Gemini -> returns text.
 */
export async function generateAiText(req, res, next) {
    try {
        const { prompt } = validateGenerateBody(req.body);
        const answer = await generateText(prompt);

        return res.status(200).json({
            success: true,
            data: {
                text: answer,
            },
            message: 'AI generate thanh cong',
        });
    } catch (error) {
        if (String(error?.message || '').includes('GOOGLE_API_KEY')) {
            error.status = 500;
            error.code = 'AI_CONFIG_ERROR';
        } else if (String(error?.message || '').toLowerCase().includes('gemini api error')) {
            error.status = 502;
            error.code = 'AI_UPSTREAM_ERROR';
        }

        return next(error);
    }
}
