<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";

  export let text: string = "Example Text";
  export let complete: boolean = false;
  export let duration: number = 0;
  const dispatch = createEventDispatcher();

  $: dispatch("update", complete);

</script>

<div class="flex sizing shadow-lg rounded-lg bg-white" in:slide={{duration}}>
  <div class="flex items-center flex-grow p-4">
    <input type="checkbox" bind:checked="{complete}" class="bg-gray-200 text-green-500 border-0 w-5 h-5 rounded-md md:w-6 md:h-6 md:rounded-lg lg:w-7 lg:h-7 focus:ring-transparent" />
    <p on:click="{() => complete = !complete}" class="ml-4 md:ml-6 text-sm md:text-base lg:text-lg {complete && 'text-gray-500 italic line-through'}">{text}</p>
  </div>
  <button on:click={() => dispatch("delete")} class="w-9">
    <svg class="m-auto text-red-400 fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </button>
</div>