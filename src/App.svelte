<script>
	import Discord from "./components/discord.svelte";
	import Todo from "./components/todo.svelte";
	import TodoInput from "./components/todoInput.svelte";

	let todos: string[] = []
	let mobileInput = false;

	function addTodo(todo: string) {
		mobileInput = false;
		todos = [...todos, todo];
	}
	function removeTodo(index: number) {
		todos = [...todos.slice(0, index), ...todos.slice(index+1)];
	}

	function closeMobileInput(event: KeyboardEvent | MouseEvent) {
		if(!(event instanceof MouseEvent) && event?.key !== "Escape")
			return
		mobileInput = false;
	}
</script>

<style>
	.top {
		top: -25px;
	}
</style>

<svelte:window on:keydown="{closeMobileInput}"></svelte:window>

<div id="app" class="relative">
	<header class="flex mx-8 mt-4 mb-16 justify-center items-center">
		<p class="mr-auto text-2xl">CleanTask</p>
		<div class="">
			<Discord />
		</div>
	</header>
 
	<main class="{mobileInput || 'hidden'} top flex flex-col absolute bg-gray-200 bg-opacity-80 w-screen h-screen">
		<button class="bg-gray-700 w-10 h-10 rounded-full mt-10 mr-8 ml-auto" on:click="{closeMobileInput}">
			<svg class="text-white m-auto fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			</svg>
		</button>
		<div class="flex sticky w-screen items-center my-auto">
			<TodoInput on:create={(event) => addTodo(event.detail)} mobile={true} />
		</div>
	</main>

	<main class="flex flex-col items-center h-screen">
		<div class="flex sticky w-screen">
			<TodoInput on:create={(event) => addTodo(event.detail)} />
		</div>
		<div class="w-screen overflow-y-auto">
			{#each todos as text, index}
				<Todo {text} on:delete={() => removeTodo(index)}/>
			{/each}
		</div>
	</main>

	<footer class="flex sticky bottom-0">
		<p class="mr-auto ml-4 mt-auto mb-4">Created by HaxSam</p>

		<button class="{mobileInput && 'hidden'} md:hidden bg-white border-2 ml-auto mr-8 mb-8 border-pink-400 w-11 h-11 rounded-full" on:click="{() => mobileInput = true}">
			<svg class="m-auto bg-white text-indigo-600 fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
			</svg>
		</button>
	</footer>
</div>