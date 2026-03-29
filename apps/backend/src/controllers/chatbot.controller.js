import * as ChatbotService from '../services/chatbot.service.js';

export const askChatbot = async (req, res, next) => {
  try {
    const { question } = req.body;
    const answer = await ChatbotService.chatbotAnswer(question);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
};
