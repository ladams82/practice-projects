<script>
	//import earth from '/lib/assets/imgs/earth.png';

	//all planet information will be on one screen, categorized and displayed in a modular style
	//Information to be displayed is:
	//planet name, min mass (in Jupiters), min radius(in Jupiters), max oribital period (earth days), min temp (K), max temp (K), min distance from earth (light years)

	let planetReq = $state();
	/**
	 * @type {any[]}
	 */
	let planetInfo = $state([]);
	let formActive = $state(false);

	async function searchPlanet() {
		try {
			const response = await fetch(`/api?planet=${planetReq}`);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			const data = await response.json();

			planetInfo = data;
			console.log(planetInfo);
		} catch (error) {
			console.log('Error: ', error);
		}
	}
	/**
	 * @param {string} userInput
	 */
	function checkInput(userInput) {
		let newUserInput = userInput.toString();
		// Remove leading and trailing whitespace
		let sanitizedInput = newUserInput.trim();

		// Remove any characters that are not alphanumeric (letters and numbers)
		sanitizedInput = sanitizedInput.replace(/[^a-zA-Z0-9]/g, '');

		// Ensure input is not too long (e.g., limit to 20 characters)
		sanitizedInput = sanitizedInput.substring(0, 20);

		return sanitizedInput;
	}
	/**
	 * @param {{ target: HTMLFormElement | undefined; }} event
	 */
	function thingy(event) {
		const formData = new FormData(event.target);
		const input = formData.get('planetReq');

		// @ts-ignore
		const cleanInput = checkInput(input);

		planetReq = cleanInput;
		searchPlanet();
		formActive = true;
	}
	/*onMount(() => {
		searchPlanet();
	});*/
</script>

{#if formActive === false}
	<h1>Search Planets</h1>
	<form on:submit|preventDefault={thingy}>
		<label for="planetReq">Search: </label>
		<input type="text" name="planetReq" id="planetReq" placeholder="Enter Planet Here..." />
		<input type="submit" name="submit" id="submit" />
	</form>
{:else}
	<h1><strong>Planet Info</strong></h1>
	<div class="grid grid-cols-[200px_1fr] gap-4">
		{#each planetInfo as info}
			<div id="planet-card">
				<!--<img src={earth} alt="the planet earth" />-->
				<h3>{info.name}</h3>
			</div>
			<div id="fact-card">
				<div id="fact-sect" class="grid-rows-1">
					<h1><strong>Planet Specs</strong></h1>
					<div class="grid grid-cols-2">
						<div class="grid-col-1">
							<table>
								<tbody>
									<tr>
										<th
											><h1>Mass</h1>
											(in Jupiters)</th
										>
										<td> {info.mass} </td>
									</tr>
									<tr>
										<th
											><h1>Radius</h1>
											(in Jupiters)</th
										>
										<td> {info.radius} </td>
									</tr>
									<tr>
										<th>Orbital Period</th>
										<td> {info.period} Earth Days</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="grid-col-2">
							<table>
								<tbody>
									<tr>
										<th>Average Temp</th>
										<td> {info.temperature} K</td>
									</tr>
									<!--<tr
										><th>Lowest Temp</th>
										<td> {info.min_temperature} </td>
									</tr>-->
									<tr>
										<th>Min Distance from Earth</th>
										<td> {info.distance_light_year} ly</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<br />
					<p><i>1 Jupiter = 1.898 x 10^27 kg, 69911 km. ly = light years</i></p>
				</div>
				<div id="fact-sect" class="flex-rows-2">
					<h3>Fun Fact</h3>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	@keyframes colorShift {
		from {
			box-shadow:
				2px -3px 10px 2px #91ffe57a,
				-2px 2px 9px 1px #85b5fd7a;
		}
		to {
			box-shadow:
				-2px 3px 8px 2px #857cf86b,
				2px -2px 6px 1px #c992fc6b;
		}
	}
	#planet-card {
		border: 1px solid rgba(255, 255, 255, 0.806);
		border-radius: 12px;
		padding: 4% 0.05% 0.05% 4%;
		margin: 3%;
		animation: colorShift 4s alternate infinite;
		align-items: center;
		align-content: center;
	}
	#fact-card {
		border: 1px solid rgba(255, 255, 255, 0.806);
		border-radius: 12px;
		padding: 1%;
		margin: 1%;
		//inline-size: 40%;
	}
	#fact-sect {
		border: 1px solid rgba(255, 255, 255, 0.379);
		border-radius: 12px;
		padding: 1%;
		margin: 1%;
	}

	img {
		margin: 1%;
		padding: 2%;
	}
	table {
		margin: 2%;
		padding: 1%;
	}
	tr {
		letter-spacing: 3px;
		text-align: left;
		border-bottom: 1px solid rgba(201, 226, 255, 0.347);
		padding: 6%;
		margin: 3%;
		td {
			text-align: right;
			padding: 7%;
			margin: 1%;
			font-size: 16px;
		}
	}
</style>
