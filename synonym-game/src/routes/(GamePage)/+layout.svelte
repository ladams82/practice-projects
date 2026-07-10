<script>
	//import title from '../lib/assets/imgs/title.png';

	let { children } = $props();
</script>

<header>
	<div class="col-span-1 grid-cols-1" id="instructions">
		<!--<img src={title} alt="Synonym Match!" width="60%" />-->
		<h3 id="parag">
			Enter the best Synonym for the presented word! The more you get right, the harder the words
			become.
		</h3>
	</div>
</header>

{@render children()}

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
</style>
