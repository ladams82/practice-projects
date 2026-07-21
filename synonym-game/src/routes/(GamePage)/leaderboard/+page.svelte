<script>
	import { onMount } from 'svelte';
	//get data from local sotrage, might need to $props() high score?
	/**
	 * @type {any[] | null | undefined}
	 */
	let gameHistory = $state([]);

	let clicked = $state(false);
	/**
	 * @param {any} input
	 */
	function correct(input) {
		if (input === false) {
			let wrongStyle = 'wrongStyle';
			return wrongStyle;
		} else {
			let correctStyle = 'correctStyle';
			return correctStyle;
		}
	}

	//create a filter function

	onMount(() => {
		gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
	});
</script>

<h1>Leaderboard</h1>
<nav>
	<!--Filter, delete all data-->
	<select name="filterBy">
		<option value="highScore">High Score</option>
		<option value="time">Time</option>
		<option value="date">Date</option>
	</select>
	<button
		onclick={() => {
			localStorage.clear();
		}}>Delete All History</button
	>
</nav>
<table>
	<thead>
		<tr>
			<th>Date Completed</th>
			<th>Final Score</th>
			<th># of Correct Answers</th>
			<th>Total Time</th>
			<th>Your Answers</th>
		</tr>
	</thead>
	<!----><tbody>
		{#each gameHistory as entry}
			<tr>
				<td>{entry.completedAt}</td>
				<td>{entry.score}</td>
				<td>{entry.correctAns}</td>
				<td>TBD</td>
				<td
					onclick={() => {
						if (clicked === true) {
							clicked = false;
						} else {
							clicked = true;
						}
					}}
				>
					{#if clicked}
						<ul>
							{#each entry.answers as answer}
								<li id={correct(answer.correct)}>
									<strong>The Word was:</strong>
									{answer.word},
									<br />
									<strong>Your Answer:</strong>
									{answer.userInput}
								</li>
							{/each}
						</ul>
					{:else}
						Show More...
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style type="scss">
	table {
		width: 100%;
		color: white;
		text-align: center;
		border: 1px solid white;
		margin: 2%;
		padding: 5%;
		th {
			color: #130817;
			background-color: rgb(222, 177, 0);
			margin: 3%;
			padding: 5%;
			border: 1px solid white;
			text-align: center;
		}
		td {
			border: 1px solid white;
			margin: 1%;
			padding: 2%;
			text-align: center;
		}
		tr:hover {
			background-color: #210029;
			border: 1px solid white;
			color: white !important;
			margin: 1%;
			padding: 3%;
			#correctStyle {
				color: rgb(149, 255, 0);
			}
			#wrongStyle {
				color: rgb(255, 0, 0);
			}
		}
	}
	select,
	button {
		border: 1px solid white;
		border-radius: 8px;
		padding: 1%;
		margin: 2%;
	}
	option {
		background-color: rgb(236, 209, 0);
		color: #0c000f;
	}
	select:hover,
	button:hover {
		background-color: #130817;
		color: rgb(189, 172, 41);
		border: solid 1px rgb(70, 53, 81);
	}
	#correctStyle {
		color: rgb(139, 232, 0);
		margin: 0.5%;
		padding: 0.5%;
	}
	#wrongStyle {
		color: rgb(217, 2, 2);
		margin: 0.5%;
		padding: 0.5%;
	}
</style>
