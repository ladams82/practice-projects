<script>
	import { onMount } from 'svelte';
	import crumpledpaper from '../lib/assets/imgs/crumpledpaper-900x900.png';

	let color = chooseTheme();
	function chooseTheme() {
		let math = Math.floor(Math.random() * 10);
		console.log(math);
		if (math >= 6) {
			return 'light-theme';
		} else if (math <= 3) {
			return 'dark-theme';
		} else {
			return 'futuristic-theme';
		}
	}

	async function randoQuote() {
		const response = await fetch('/api');
		const quotes = await response.json();
		console.log(quotes);
		return quotes;
	}

	onMount(() => {
		randoQuote();
	});
</script>

<h1><strong>Your Quote:</strong></h1>
{#await randoQuote()}
	<!--make a cool animation for this
		
	-->

	<img class="crumpled" alt="rotating crumpled up paper" src={crumpledpaper} width="15%" />
{:then quotes}
	<table>
		{#each quotes as quote}
			<tr>
				<td class={color}><h1 id="quote">{quote.quote}</h1></td>
			</tr>
			<tr id="source">
				<td><h3><strong>By {quote.author}</strong></h3></td>

				<td><h3>{quote.work}</h3></td>
			</tr>
			<tr>
				<td><h5><i>{quote.categories}</i></h5></td>
			</tr>
		{/each}
	</table>
{:catch error}
	<p>{error.message}</p>
{/await}

<div>
	<button data-sveltekit-reload><a href="/">Next</a></button>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Spicy+Rice&family=Story+Script&display=swap');

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes colorShift {
		from {
			box-shadow: 3px 5px 22px #009a767a;
		}
		to {
			box-shadow: 3px 5px 19px #8e86ff6b;
		}
	}

	.crumpled {
		animation-name: spin;
		animation-duration: 800ms;
		animation-timing-function: linear;
		animation-iteration-count: infinite;

		margin: 2%;
		padding: 10px;
	}

	.spicy-rice-regular {
		font-family: 'Spicy Rice', serif;
		font-weight: 400;
		font-style: normal;
	}
	.story-script-regular {
		font-family: 'Story Script', sans-serif;
		font-weight: 400;
		font-style: normal;
	}
	.caveat-brush-regular {
		font-family: 'Caveat Brush', cursive;
		font-weight: 400;
		font-style: normal;
	}

	button {
		border: outset 2px rgb(22, 22, 22);
		color: white;
		border-radius: 8px;
		margin: 3%;
		padding: 8px;
		justify-content: left;
	}
	button:hover {
		border: inset 2px rgb(22, 22, 22);
		color: rgb(175, 175, 175);
		border-radius: 8px;
		padding: 5px;
		justify-content: left;
	}
	h1 {
		margin: 0px 0px 40px 0px;
	}
	#source {
		td {
			padding: 40px 0px 0px 0px;
		}
	}
	:global body {
		background-color: #222;
		color: #fff;
		padding: 20px;
		margin: 0;
	}

	@media screen and (min-width: 301px) {
		.light-theme {
			/*display: flex;*/
			height: 100%;
			width: 50%;
			color: white;
			//border: solid 2px #63474d;
			border-radius: 8px;
			margin: 15px;
			padding: 4%;
			background-image: url(../lib/assets/imgs/yellowpaper-1600x1000.png);
			background-repeat: no-repeat;
			background-size: contain;
			inline-size: min-content;

			#quote {
				//float: left;
				/**/
				height: 80%;
				width: 80%;
				font-family: Spicy Rice;
				font-size: 1rem;
				color: black;

				margin: 15px;
				padding: 12%;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;
				font-size: 15px;
				padding: 20px;
			}
		}

		.futuristic-theme {
			/*display: flex;*/
			height: 100%;
			width: 50%;
			color: white;
			animation: colorShift 4s alternate infinite;
			border-radius: 8px;
			margin: 100px;
			padding: 2%;
			inline-size: min-content;

			#quote {
				/*
				height: 50%;
				width: 50%;*/
				font-family: Spicy Rice;
				font-size: 1rem;
				color: white;

				margin: 45px 15px 35px 15px;
				padding: 20px;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;
				font-size: 15px;
				margin: 5%;
				padding: 20px;
			}
		}

		#source {
			align-items: left;
			font-family: 'Courier New', Courier, monospace;
			font-size: 15px;
			margin: 20px;
			padding: 200px;
		}

		.dark-theme {
			/*display: flex;*/
			height: 100%;
			width: 50%;

			border-radius: 8px;
			margin: 15px 30px 15px 30px;
			padding: 3.5%;
			background-image: url(../lib/assets/imgs/tanpaper-1600x1000.png);
			background-repeat: no-repeat;
			background-size: contain;
			inline-size: min-content;
			#quote {
				/*float: left;*/
				height: 50%;
				width: 60%;
				font-family: Story Script;
				font-size: 1rem;
				color: black;
				margin: 45px 15px 45px 15px;
				padding: 5%;
				justify-items: center;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;
				font-size: 15px;
				padding: 20px;
			}
		}

		.chill-theme {
			//display: inline-block;
			height: 50%;
			width: 50%;
			margin: 15px 30px 15px 30px;
			padding: 3.5%;
			background-image: url(../lib/assets/imgs/greenpaper-1600x1000.png);
			background-size: contain;
			background-repeat: no-repeat;
			inline-size: min-content;
			#quote {
				width: 53%;
				/*float: left;*/
				font-family: Caveat Brush;
				font-size: 1rem;
				margin: 35px 15px 35px 15px;
				padding: 20px;
				//justify-items: center;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;

				padding: 20px;
				font-size: 15px;
				color: white;
				margin: 15px;
			}
		}
	}

	@media screen and (max-width: 300px) {
		.light-theme {
			/**/
			display: inline-block;
			height: 100%;
			width: 75%;
			color: white;
			//border: solid 2px #63474d;
			border-radius: 8px;
			margin: 10px 20px 10px 20px;
			padding: 2%;
			background-image: url(../lib/assets/imgs/yellowpaper-1600x1000.png);
			background-repeat: no-repeat;
			background-size: contain;
			inline-size: min-content;

			#quote {
				//float: left;
				height: 40%;
				width: 90%;
				font-family: Spicy Rice;
				font-size: 15px;
				color: black;
				/**/
				margin: 45px 15px 35px 15px;
				padding: 20px;
				inline-size: min-content;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;
				font-size: 15px;
				margin: 5px;
				padding: 0px 20px 0px 0px;
			}
		}

		.dark-theme {
			display: inline-block;
			height: 100%;
			width: 50%;

			border-radius: 8px;
			margin: 10px 30px 10px 30px;
			padding: 2%;
			background-image: url(../lib/assets/imgs/tanpaper-1600x1000.png);
			background-repeat: no-repeat;
			background-size: contain;
			#quote {
				float: left;
				height: 50%;
				width: 80%;
				font-family: Story Script;
				font-size: 15%;
				color: black;
				margin: 45px 15px 35px 15px;
				padding: 4%;
				justify-items: center;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;
				font-size: 15px;
				padding: 20px;
			}
		}

		.chill-theme {
			display: inline-block;
			height: 50%;
			width: 50%;
			margin: 15px 30px 15px 30px;
			padding: 2%;
			background-image: url(../lib/assets/imgs/greenpaper-1600x1000.png);
			background-size: contain;
			background-repeat: no-repeat;
			#quote {
				width: 90%;
				float: left;
				font-family: Caveat Brush;
				font-size: 15px;
				margin: 35px 15px 35px 15px;
				padding: 20px;
				//justify-items: center;
			}
			#source {
				align-items: left;
				font-family: 'Courier New', Courier, monospace;

				padding: 20px;
				font-size: 15px;
				color: white;
				margin: 15px;
			}
		}
	}
</style>
