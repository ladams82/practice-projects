<script>
	import { onMount } from 'svelte';
	import { easyLevel, medLevel, hardLevel } from '../lib/components/data';
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

	let correctAns = 0;
	/**
	 * @type {boolean | null}
	 */
	let result = $state(null);
	let questionLvl = $state(1);
	/**
	 * @type {any[]}
	 */
	const totalPts = [];
	let calcPts = (/** @type {any[]} */ totalPts) => eval(totalPts.join('+'));
	let displayPts = $state(calcPts(totalPts));

	/**
	 * @type {{ word: FormDataEntryValue | null; correct: boolean; }[]}
	 */
	const userInputs = [];
	let randomNo = Math.floor(Math.random() * 1);

	let pts = $state(0);
	/**
	 * @type {string | any[] | null | undefined}
	 */
	let synonyms = $state([]);
	let lvlWord = chooseWord();

	function chooseWord() {
		//need to add that it cannot choose a word that's already been done before

		if (correctAns <= 2) {
			let lvlQ = easyLevel[randomNo].word;
			pts = easyLevel[randomNo].pointTotal;
			// @ts-ignore
			return lvlQ;
		} else if (correctAns >= 3 && correctAns < 6) {
			let lvlQ = medLevel[randomNo].word;
			pts = medLevel[randomNo].pointTotal;
			return lvlQ;
		} else {
			let lvlQ = hardLevel[randomNo].word;
			pts = hardLevel[randomNo].pointTotal;
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
		console.log('searchSynon said: ' + data.synonyms);
		synonyms = data.synonyms;
	}
	/**
	 * @param {{ target: HTMLFormElement | undefined; }} event
	 */
	function grader(event) {
		console.log('This is doing something, at least');
		console.log(form);

		const formData = new FormData(event.target);
		const input = formData.get('synonInput');
		// @ts-ignore
		const cleanInput = sanitizeInput(input);

		// @ts-ignore
		let redMarker = synonyms.includes(cleanInput);
		console.log(redMarker);

		if (redMarker === true) {
			console.log('correct answer!');

			userInputs.push({ word: input, correct: true });
			totalPts.push(pts);
			questionLvl += 1;
			correctAns += 1;

			console.log(userInputs);
			result = true;
		} else {
			console.log('wrong answer ;-;');
			userInputs.push({ word: input, correct: false });
			questionLvl += 1;
			console.log(userInputs);
			result = false;
		}
	}

	// @ts-ignore
	// @ts-ignore
	function nextQ() {
		//update correctAns, questionLvl, totalPts, userInput and then trigger chooseWord again
	}

	onMount(() => {
		searchSynon();
	});
</script>

<div>
	Level: {questionLvl}
	Pts: {displayPts}<!--tally up all the points in the total points array-->
</div>
<div>
	<h1><strong>Synonym Match!</strong></h1>
	<h3>
		Enter the best Synonym for the presented word! The more you get right, the harder the worda
		become.
	</h3>
</div>
<br />
<h2>What's a Synonym for:</h2>
<!---->
<h1><strong>{lvlWord}</strong></h1>

{#if result === true || false}
	<div class="synonyms">
		<p>
			<!--eslint-disable-next-line svelte/require-each-key-->
			{#each synonyms as synonym}
				{synonym},
			{/each}
		</p>
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
	<button>Next Word</button>
{:else if result === false}
	<h1>Incorrect :c On to the next!</h1>
	<button>Next Word</button>
{:else}
	<br />
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
	div {
		width: 40%;
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
