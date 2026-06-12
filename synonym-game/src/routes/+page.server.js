//import { easyLevel, medLevel, hardLevel } from '$lib/components/data.js';

/**
 * @param {string} userInput
 */
function sanitizeInput(userInput) {
	let newUserInput = userInput.toString();
	// Remove leading and trailing whitespace
	let sanitizedInput = newUserInput.trim();

	// Remove any characters that are not alphanumeric (letters and numbers)
	sanitizedInput = sanitizedInput.replace(/[^a-zA-Z0-9]/g, '');

	// Ensure input is not too long (e.g., limit to 20 characters)
	sanitizedInput = sanitizedInput.substring(0, 20);

	return sanitizedInput;
}

export const actions = {
	checkInput: async ({ request }) => {
		//compare user response to api synonyms

		const data = await request.formData();
		// @ts-ignore
		let userInput = data.get('synonInput').toString();

		let cleanInput = sanitizeInput(userInput);
		console.log(cleanInput);
		return { userInput: cleanInput };
	}
};
