<script>
	import { onMount } from 'svelte';

	/*
        What's needed:
        -a bank of words to be chosen at random, different array for each level
        -api to be pulled from to get synonyms of the banked words and whatever input the user enters
        -point system to tally how many points users get each round
        -penalty system, when user misses 3x they get a game over screen and restart the game
        -style: ransom note titles, special elite font headers, some generic san serif font for paragraphs, black background
        -UI: retro, black, red, beige, and green
    */

	async function searchSynon() {
		const response = await fetch('/api');
		const synonyms = await response.json();
		console.log(synonyms);
		return synonyms;
	}
	onMount(() => {
		searchSynon();
	});

	const easyLevel = [{ word: 'Extraordinary', pointTotal: 1, played: false, id: 0 }];
	const medLevel = [{ word: 'Redundent', pointTotal: 1, played: false, id: 0 }];
	const hardLevel = [{ word: 'Penultimate', pointTotal: 1, played: false, id: 0 }];

	//everything that needs to tracked and updated
	let correctAns = $state(0);
	let questionlvl = $state(1);
	let totalpts = $state(0);
	const userInputs = [];

	function chooseWord() {
		let randomNo = Math.floor(Math.random() * 10);
		if (correctAns <= 2) {
			let lvlQ = easyLevel[randomNo].word;
			return lvlQ;
		} else if (correctAns >= 3 && correctAns < 6) {
			let lvlQ = medLevel[randomNo].word;
			return lvlQ;
		} else {
			let lvlQ = hardLevel[randomNo].word;
			return lvlQ;
		}
	}

	function gradeWord() {
		//search api w array word as query, display synonyms for array word, compare array of synonyms to input word
	}

	function nextQ() {}
</script>

<h1>Synonym Match!</h1>
<h3>
	Enter the best Synonym for the presented word! The more you get right, the harder the worda
	become.
</h3>

<h2>What's a Synonym for:</h2>
<h2><strong>{chooseWord()}</strong></h2>

<h2>Synonym:</h2>
<form>
	<input type="text" name="synonInput" id="synonInput" placeholder="Enter Synonym Here..." />
	<input name="submit" value="submit" onclick={gradeWord()} />
</form>
<!--You need to create server.js w a function to handle form actions-->

<button onclick={nextQ()}>Next Word</button>
