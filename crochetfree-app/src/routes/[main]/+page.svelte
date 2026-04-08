<script>
	import Counter from '$lib/components/Counter.svelte';

    /** @type {import('./$types').PageData} */
    let { data } = $props();

    let count = $state(0);
</script>

<Counter {count}/>