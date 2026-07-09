<script>
	import './layout.css';
	import title from '../lib/assets/imgs/title.png';

	let { children } = $props();
</script>

<div class="col-span-1 grid-cols-1" id="instructions">
	<img src={title} alt="Synonym Match!" width="60%" />
	<h3>
		Enter the best Synonym for the presented word! The more you get right, the harder the worda
		become.
	</h3>
</div>
{@render children()}
