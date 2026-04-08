import * as ChatbotService from '../services/chatbot.service.js';

export const askChatbot = async (req, res, next) => {
    try {
        const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
        if (!message) {
            const err = new Error('message la bat buoc');
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
            throw err;
        }

        const question = message;
        const answer = await ChatbotService.chatbotAnswer(question);
        res.status(200).json({
            success: true,
            data: answer,
            message: 'Lay cau tra loi chatbot thanh cong',
        });
    } catch (err) {
        next(err);
    }
};
