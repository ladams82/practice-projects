<script>
	import { onMount } from 'svelte';
	import { easyLevel, medLevel, hardLevel } from '../lib/components/data';
	import title from '../lib/assets/imgs/title.png';
	import word1 from '../lib/assets/imgs/extraordinary.png';
	import word2 from '../lib/assets/imgs/innovative.png';
	import word3 from '../lib/assets/imgs/intelligent.png';
	// @ts-ignore
	// @ts-ignore
	const { form } = $props();

	/*
        What's needed:
        -a bank of words to be chosen at random, different array for each level
        -api to be pulled from to get synonyms of the banked words and whatever input the user enters
        -point system to tally how many points users get each round
        -penalty system, when user misses 3x they get a game over screen and restart the game
        -style: ransom note titles, special elite font headers, some generic san serif font for paragraphs, black background
        -UI: retro, black, red, beige, and green
    */

	//everything that needs to tracked and updated

	let correctAns = $state(0);
	/**
	 * @type {boolean | null}
	 */
	let result = $state(null);
	let questionLvl = $state(1);
	/**
	 * @type {any[]}
	 */
	// @ts-ignore
	let pts = $state(1);
	// @ts-ignore
	/**
	 * @type {number[]}
	 */
	let totalPts = $state([]);
	//it's adding the entire array whenever the function is run, definitely NOT what you want it to do
	function calc() {
		// @ts-ignore
		let holder = 0;
		totalPts?.forEach((x) => {
			holder += x;
		});
		totalPts = [];
		totalPts.push(holder);
		displayPts = holder;

		console.log(totalPts);
	}
	let displayPts = $state(0);

	/**
	 * @type {{ word: FormDataEntryValue | null; userInput?: FormDataEntryValue | null; correct: boolean; }[]}
	 */
	const userInputs = [];
	let randomNo = Math.floor(Math.random() * 10);

	/**
	 * @type {string | any[] | null | undefined}
	 */
	let synonyms = $state([]);
	let lvlWord = $state(chooseWord());

	function chooseWord() {
		//need to add that it cannot choose a word that's already been done before
		console.log(randomNo);
		if (questionLvl < 11) {
			if (correctAns <= 3) {
				if (easyLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					easyLevel[randomNo].played = true;
					let lvlQ = easyLevel[randomNo].word;
					return lvlQ;
				} else {
					easyLevel[randomNo].played = true;
					let lvlQ = easyLevel[randomNo].word;
					return lvlQ;
				}
			} else if (correctAns >= 4 && correctAns < 7) {
				if (medLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					medLevel[randomNo].played = true;
					let lvlQ = medLevel[randomNo].word;
					return lvlQ;
				} else {
					medLevel[randomNo].played = true;
					let lvlQ = medLevel[randomNo].word;
					return lvlQ;
				}
			} else if (correctAns >= 7 && correctAns <= 10) {
				if (hardLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					hardLevel[randomNo].played = true;
					let lvlQ = hardLevel[randomNo].word;
					return lvlQ;
				} else {
					hardLevel[randomNo].played = true;
					let lvlQ = hardLevel[randomNo].word;
					return lvlQ;
				}
			} else {
				let lvlQ = 'done';
				result = null;
				return lvlQ;
			}
		} else {
			let lvlQ = 'done';
			result = null;
			return lvlQ;
		}
	}

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

	//const getSynon = searchSynon();

	async function searchSynon() {
		const response = await fetch(`/api?word=${lvlWord}`);
		//it's just showing that it's an oject, not the actual word.
		const data = await response.json();
		console.log('searchSynon said: ' + data.synonyms + 'and lvlWord is: ' + lvlWord);
		synonyms = data.synonyms;
	}
	/**
	 * @param {{ target: HTMLFormElement | undefined; }} event
	 */
	function grader(event) {
		const formData = new FormData(event.target);
		const input = formData.get('synonInput');
		// @ts-ignore
		const cleanInput = sanitizeInput(input);
		console.log('The form says: ' + input + ' and the synonyms it matched are: ' + synonyms);

		// @ts-ignore
		let redMarker = synonyms.includes(cleanInput);
		console.log(redMarker);

		if (redMarker === true) {
			console.log('correct answer!');

			userInputs.push({ word: lvlWord, userInput: input, correct: true });
			correctAns += 1;
			result = true;
		} else {
			console.log('wrong answer ;-;');
			userInputs.push({ word: lvlWord, userInput: input, correct: false });
			result = false;
		}
		console.log(userInputs);
		if (correctAns <= 2) {
			// @ts-ignore
			pts = 1;
		} else if (correctAns >= 3 && correctAns < 6) {
			// @ts-ignore
			pts = 2;
		} else {
			// @ts-ignore
			pts = 3;
		}
	}

	/**
	 * @param {{ target: HTMLFormElement | undefined; }} event
	 */
	function nextQ(event) {
		//update questionLvl, totalPts, userInput and then trigger chooseWord again
		if (result === true) {
			if (correctAns <= 2) {
				totalPts.push(1);
			} else if (correctAns >= 3 && correctAns < 6) {
				totalPts.push(2);
			} else {
				totalPts.push(3);
			}
		} // @ts-ignore
		console.log(totalPts);
		calc();
		questionLvl += 1;

		synonyms = [];
		result = null;
		randomNo = Math.floor(Math.random() * 9);
		lvlWord = chooseWord();
		searchSynon();
	} /**/

	onMount(() => {
		searchSynon();
	});
</script>

{#if lvlWord === 'done'}
	<h1>CONGRATULATIONS</h1>
	<h2># of Correct Answers: {correctAns}</h2>
	<h2>Total Points: {totalPts}</h2>
	<h2>Your Best Answers:</h2>
	<br />
	<h1>Play Again?</h1>
{:else}
	<div class="grid">
		<div class="col-span-1 grid-cols-1" id="instructions">
			<img src={title} alt="Synonym Match!" width="60%" />
			<h3>
				Enter the best Synonym for the presented word! The more you get right, the harder the worda
				become.
			</h3>
		</div>
		<br />
		<div class="col-span-1 grid-cols-2">
			<h1><strong>Level: </strong> {questionLvl} <strong> Pts: </strong> {displayPts}</h1>

			<!--tally up all the points in the total points array-->
		</div>
	</div>
	<br />
	<h2>What's a Synonym for:</h2>
	<!---->
	<h1><strong>{lvlWord}</strong></h1>

	{#if result === true || false}
		<div class="synonyms">
			<span>
				<!--eslint-disable-next-line svelte/require-each-key-->
				{#each synonyms as synonym}
					{synonym},
				{/each}
			</span>
		</div>
	{:else}
		<br />
	{/if}

	<!--Didn't actually need +page.Server.js because all sanitization and grading is easier done on the client side. Also, submitting the form caused the entire page to rerender which wasn't really helpful since I don't want to immediately go to a new page.-->
	<form method="POST" action="?/checkInput" on:submit|preventDefault={grader}>
		<label for="synonInput">Synonym: </label>
		<input type="text" name="synonInput" id="synonInput" placeholder="Enter Synonym Here..." />
		<input type="submit" name="submit" id="submit" />
	</form>

	{#if result === true}
		<h1>That's correct!</h1>
		<h3>+{pts}</h3>
		<button on:click={nextQ}>Next Word</button>
	{:else if result === false}
		<h1>Incorrect :c On to the next!</h1>
		<button on:click={nextQ}>Next Word</button>
	{:else}
		<br />
	{/if}
{/if}

<!---->

<style>
	@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
	.special-elite-regular {
		font-family: 'Special Elite', system-ui;
		font-weight: 400;
		font-style: normal;
	}

	:global body {
		color: white;
		background-color: #0c000f;
		font-family: 'Special Elite';
		margin: 3%;
	}
	input,
	button {
		border: solid 1px white;
		border-radius: 8px;
		margin: 2%;
		padding: 1%;
	}
	#submit:hover {
		color: rgb(109, 87, 114);
		background-color: #130817;
		box-shadow: inset -2px 1px;
		border: solid 1px rgb(70, 53, 81);
	}
	.header {
		display: block;
		width: 80%;
		height: 20%;
		margin: 2%;
	}
	.synonyms {
		display: flexbox;
		float: left;
		width: 40%;
		height: 20%;
		margin: 2%;
		font-size: 1em;

		inline-size: min-content;
		p {
			width: 20%;
			height: 100%;
			inline-size: min-content;
		}
	}
</style>
