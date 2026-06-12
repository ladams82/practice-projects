import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const word = url.searchParams.get('word');
	console.log('GET said: ' + word);
	try {
		const secret = 'deNNulWzT3Fn32KkIiek20jmsMIL3M1dppKMh9gR';
		const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
			headers: {
				'x-Api-Key': `${secret}`
			}
		});
		if (!response.ok) {
			throw new Error('Network response not ok');
		}
		const synonym = await response.json();
		console.log(synonym + ' ' + response);

		return json(synonym);
	} catch (error) {
		console.log('Error: ', error);
	}
}
