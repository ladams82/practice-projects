<script>
    let count = $props();

</script>

<button onclick={()=>{
    count += 1
}}>Add</button>

<button onclick={()=>{
    count -= 1
}}>Remove</button>

<button onclick={()=>{
    count = 0
}}>Reset</button>

<button onclick={()=>{
    //push row number, instruction link, and instruction step into local storage so they can come back to it.
}}>Remember My Place!</button>