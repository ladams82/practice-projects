<script>
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/planetInfo">Planets</a></li>
		<li>Stars</li>
	</ul>
</nav>

{@render children()}

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Special+Elite&display=swap');
	@keyframes pizzAzz {
		from {
			box-shadow:
				2px -3px 8px 2px #bafaeb58,
				-2px 2px 6px 1px #6ca7ff5b;
		}
		to {
			box-shadow:
				-2px 3px 8px 2px #5d51fc6b,
				2px -2px 6px 1px #ad58fd6b;
		}
	}

	.dotgothic16-regular {
		font-family: 'DotGothic16', sans-serif;
		font-weight: 400;
		font-style: normal;
	}

	:global body {
		background-color: rgb(1, 0, 23);
		color: white;
		font-family: DotGothic16;
		margin: 2%;
		align-content: center;
		h1 {
			font-size: 20px;
			margin-bottom: 1%;
		}
		button {
			color: black;
			background-color: white;
			border: 1px solid rgba(204, 204, 205, 0.668);
			border-radius: 12px;
			animation: pizzAzz 3s alternate infinite;
			margin: 2%;
			padding: 1%;
		}
		input {
			color: rgb(149, 147, 163);
			background-color: rgba(108, 102, 179, 0.412);
			border: 1px solid rgba(134, 134, 208, 0.738);
			border-radius: 12px;

			margin: 1%;
			padding: 1%;
		}
	}

	ul {
		list-style-type: none;
		overflow: hidden;
		margin-bottom: 0.25%;
		//border-bottom: 1px solid rgba(255, 255, 255, 0.503);
		li {
			float: left;
			margin: 0% 1% 1% 0%;
			padding: 1%;
			border-right: 1px solid rgba(255, 255, 255, 0.503);
		}
	}
</style>
