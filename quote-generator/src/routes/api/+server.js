import { json } from '@sveltejs/kit';

export async function GET(event) {
	console.log(event);
	try {
		const apiKey = 'deNNulWzT3Fn32KkIiek20jmsMIL3M1dppKMh9gR';
		const quoteRes = await fetch('https://api.api-ninjas.com/v2/randomquotes', {
			headers: {
				'x-Api-Key': `${apiKey}`
			}
		});
		if (!quoteRes.ok) {
			throw new Error('Network response not ok');
		}
		const quote = await quoteRes.json();

		return json(quote);
	} catch (error) {
		console.log('Error: ', error);
	}
}
