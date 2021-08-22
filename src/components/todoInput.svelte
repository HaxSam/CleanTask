<script>
import { createEventDispatcher, onMount } from "svelte";
	export let mobile = false;
	
  let todoText = "";
  const dispatch = createEventDispatcher();

  function addTodoEvent(event: MouseEvent | KeyboardEvent) {
    if(!(event instanceof MouseEvent) && event?.key !== "Enter" || todoText === "")
			return
    dispatch("create", todoText);
		todoText = "";
  }

	onMount(() => {
		if(mobile)
			(document.querySelector("#TodoInput") as HTMLInputElement).focus();
	})
</script>


<div class="{mobile ? 'flex' : 'hidden md:flex'} w-full sizing items-center justify-center bg-white rounded-lg {mobile ? 'ring-2 ring-pink-400' : 'focus:ring-2 focus:ring-pink-400'}">
	<input id="TodoInput" type="text" class="text-xl pl-6 h-14 w-full border-none focus:ring-transparent rounded-l-lg" on:keypress="{addTodoEvent}" bind:value="{todoText}" />
	<button on:click="{addTodoEvent}" class="bg-white w-8">
		<svg class="m-auto text-indigo-600 fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
			<path d="M0 0h24v24H0z" fill="none"/>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
		</svg>
	</button>
</div>