import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MODEL_CANDIDATES = [DEFAULT_MODEL, 'gemini-2.0-flash', 'gemini-1.5-flash-latest'];

/**
 * Goi Gemini API va tra ve noi dung van ban.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateText(prompt) {
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new Error('Missing GOOGLE_API_KEY in environment variables');
	}

	 let lastErrorText = '';

	 for (const model of MODEL_CANDIDATES) {
		const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
		const response = await fetch(endpoint, {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({
			contents: [
			 {
				role: 'user',
				parts: [{ text: prompt }],
			 },
			],
			generationConfig: {
			 temperature: 0.4,
			 maxOutputTokens: 600,
			},
		 }),
		});

		if (!response.ok) {
		 lastErrorText = await response.text();
		 if (response.status === 404) {
			continue;
		 }
		 throw new Error(`Gemini API error (${model}): ${response.status} ${lastErrorText}`);
		}

		const data = await response.json();
		const answer =
		 data?.candidates?.[0]?.content?.parts
			?.map((part) => part?.text || '')
			.join('\n')
			.trim() || '';

		if (answer) {
		 return answer;
		}
	 }

	 throw new Error(`Gemini API error: no compatible model available. Last response: ${lastErrorText}`);
}
