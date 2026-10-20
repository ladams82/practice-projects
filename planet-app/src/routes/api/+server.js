import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	//have user search for planet but also have preset buttons for them to click of solar system planets

	const planet = url.searchParams.get('planet');
	try {
		const secret = 'deNNulWzT3Fn32KkIiek20jmsMIL3M1dppKMh9gR';
		const response = await fetch(`https://api.api-ninjas.com/v1/planets?name=${planet}`, {
			headers: {
				'x-Api-Key': `${secret}`
			}
		});
		if (!response.ok) {
			throw new Error('Network response not ok');
		}
		const planetInfo = await response.json();

		return json(planetInfo);
	} catch (error) {
		console.log('Error: ', error);
	}
}
