<script>
	import './layout.css';
	import title from '../lib/assets/imgs/title.png';
	let { children } = $props();
</script>

<header>
	<nav>
		<button><a href="/">Main Menu</a></button>
		<button><a href="/leaderboard">Leaderboard</a></button>
	</nav>
	<div class="col-span-1 grid-cols-1" id="instructions">
		<!----><img src={title} alt="Synonym Match!" width="60%" />
	</div>
</header>

{@render children()}

<style>
	button {
		border: solid 1px white;
		background-color: rgb(236, 209, 0);
		color: #0c000f;
		border-radius: 8px;
		margin: 2%;
		padding: 1%;
	}
	button:hover {
		color: rgb(109, 87, 114);
		background-color: #130817;
		box-shadow: inset -2px 1px;
		border: solid 1px rgb(70, 53, 81);
	}
</style>
