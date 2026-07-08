<script>
	//create a timer to see how fast users can finish game
	//need: pause button (should trigger pause screen), play button,
	//need to pass along states of these buttons to +page.svelte so that answers can't be input while paused (should this functionality be put into +page?)
	let { isItPaused } = $props();

	let hour = $state(0);
	let minute = $state(0);
	let second = $state(0);
	let count = $state(0);

	function timer() {
		if (isItPaused === false) {
			count++;

			if (count == 100) {
				second++;
				count = 0;
			}

			if (second == 60) {
				minute++;
				second = 0;
			}

			if (minute == 60) {
				hour++;
				minute = 0;
				second = 0;
			}
		}
	}
	timer();
</script>

<h2>Your Time:</h2>
<span>{hour} : {minute} : {second}</span>
