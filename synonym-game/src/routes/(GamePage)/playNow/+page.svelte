<script>
	import { onMount } from 'svelte';
	import { easyLevel, medLevel, hardLevel } from '../../../lib/components/data';
	import Timer from '../../../lib/components/timer.svelte';

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
	let isItPaused = $state(false);
	let thingy = $state('Pause');
	/**
	 * @type {boolean | null}
	 */
	let result = $state(null);
	let questionLvl = $state(1);

	let displayPts = $state(0);
	// @ts-ignore
	/**

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

	/**
	 * @type {any[] | null | undefined}
	 */
	let gameHistory = $state([]);
	let highScore = $state(0);
	let gameIsSaved = false;

	function chooseWord() {
		console.log(randomNo);
		if (questionLvl < 11) {
			if (correctAns <= 3) {
				if (easyLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					let lvlQ = easyLevel[randomNo].word;
					easyLevel[randomNo].played = true;
					return lvlQ;
				} else {
					let lvlQ = easyLevel[randomNo].word;
					easyLevel[randomNo].played = true;
					return lvlQ;
				}
			} else if (correctAns >= 4 && correctAns < 7) {
				if (medLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					let lvlQ = medLevel[randomNo].word;
					medLevel[randomNo].played = true;
					return lvlQ;
				} else {
					let lvlQ = medLevel[randomNo].word;
					medLevel[randomNo].played = true;
					return lvlQ;
				}
			} else if (correctAns >= 7 && correctAns <= 10) {
				if (hardLevel[randomNo].played === true) {
					randomNo = Math.floor(Math.random() * 9);
					let lvlQ = hardLevel[randomNo].word;
					hardLevel[randomNo].played = true;
					return lvlQ;
				} else {
					let lvlQ = hardLevel[randomNo].word;
					hardLevel[randomNo].played = true;
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
	}

	function nextQ() {
		//update questionLvl, displayPts, userInput and then trigger chooseWord again
		if (result === true) {
			if (correctAns <= 2) {
				displayPts += 1;
			} else if (correctAns >= 3 && correctAns < 6) {
				displayPts += 2;
			} else {
				displayPts += 3;
			}
		} // @ts-ignore
		console.log(displayPts);
		questionLvl += 1;

		synonyms = [];
		result = null;
		randomNo = Math.floor(Math.random() * 9);
		lvlWord = chooseWord();

		if (lvlWord === 'done') {
			saveGame();
			return;
		}
		searchSynon();
	} /**/

	function saveGame() {
		if (gameIsSaved) return;
		gameIsSaved = true;

		const gameResult = {
			score: displayPts,
			correctAns: correctAns,
			completedAt: new Date(),
			totalQuestions: questionLvl,
			answers: userInputs
		};
		const prevGames = JSON.parse(localStorage.getItem('gameHistory')) || [];
		prevGames.push(gameResult);

		localStorage.setItem('gameHistory', JSON.stringify(prevGames));

		const currentHighScore = Number(localStorage.getItem('highscore')) || 0;

		if (displayPts > currentHighScore) {
			localStorage.setItem('highScore', JSON.stringify(displayPts));
		}
	}

	onMount(() => {
		searchSynon();

		gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

		highScore = Number(localStorage.getItem('highScore')) || 0;
	});
</script>

<div class="game">
	{#if lvlWord === 'done'}
		<h1><strong>CONGRATULATIONS</strong></h1>
		<h2># of Correct Answers: {correctAns}</h2>
		<h2>Total Points: {displayPts}</h2>
		<h2>Your Best Answers:</h2>
		<br />
		<h1><strong>Play Again?</strong></h1>

		<h1>Game History</h1>
		<!--Need to change Date.now() to a better format-->
		<ol>
			{#each gameHistory as entry}
				<li>
					Final Score: {entry.score}, Completed At: {entry.completedAt}, Correct Answers: {entry.correctAns}
				</li>
			{/each}
		</ol>
	{:else}
		<div>
			<div>
				<span class="trackers"><strong>Level: </strong> {questionLvl} </span>
				<span class="trackers"><strong> Pts: </strong> {displayPts}</span>

				<!--tally up all the points in the total points array-->
			</div>
		</div>
		<br />
		<h1 class="mainText">What's a Synonym for:</h1>
		<!---->
		<h1 class="mainText"><strong>{lvlWord}</strong></h1>

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
		<form class="form" method="POST" action="?/checkInput" on:submit|preventDefault={grader}>
			<label for="synonInput">Synonym: </label>
			<input type="text" name="synonInput" id="synonInput" placeholder="Enter Synonym Here..." />
			<input type="submit" name="submit" id="submit" />
		</form>

		{#if result === true}
			<h1>That's correct!</h1>
			<!--<h3>+{pts}</h3>-->
			<button on:click={nextQ}>Next Word</button>
		{:else if result === false}
			<h1>Incorrect :c On to the next!</h1>
			<button on:click={nextQ}>Next Word</button>
		{:else}
			<br />
		{/if}
	{/if}
</div>

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

	input {
		border: solid 1px white;
		border-radius: 8px;
		margin: 2%;
		padding: 1%;
	}
	button {
		border: solid 1px white;
		background-color: rgb(236, 209, 0);
		color: #0c000f;
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
	.game {
		margin: 3%;
		padding: 1%;
	}
	.header {
		display: block;
		width: 80%;
		height: 20%;
		margin: 2%;
	}
	.mainText {
		font-size: 2em;
		text-align: center;
		margin: 1%;
	}
	.form {
		text-align: center;
		align-items: center;
		margin: 1%;
		padding: 1%;
		input {
			background-color: #390048;
			color: rgb(255, 230, 41);
		}
		label {
			font-size: 1.15em;
		}
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
	.trackers {
		font-size: 1.25em;
		border: 1px solid #14001a;
		border-radius: 8px;
		background-color: #390048;
		color: rgb(255, 230, 41);
		padding: 1%;
		margin: 2%;
	}
</style>
