<script>
	import { get } from "svelte/store";
	import { dndzone } from "svelte-dnd-action";
	import { todoStore, todoID } from "$lib/store";

	import Discord from "./components/discord.svelte";
	import Todo from "./components/todo.svelte";
	import TodoInput from "./components/todoInput.svelte";

	let mobileInput = false;


	function addTodo(text: string) {
		mobileInput = false;
		todoStore.update(todos => [...todos, {id: get(todoID), text: text, complete: false, duration: 500}])
		setTimeout(() => {
			todoStore.update(todos => todos.map(todo => Object.assign(todo, {duration: 0})));
		}, 501);
		todoID.update(id => id === Number.MAX_SAFE_INTEGER ? 0 : ++id);
	}

	function handleSort(e: any) {
		todoStore.set(e.detail.items);

	}

	function updateTodo(index: number) {
		todoStore.update(todos => {
			todos[index].complete = !todos[index].complete
			return todos;
		})
	}

	function removeTodo(index: number) {
		todoStore.update(todos => {
			if(todos.length === 1)
				return [];
			return [...todos.slice(0, index), ...todos.slice(index+1)]
		});
	}

	function closeMobileInput(event: KeyboardEvent | MouseEvent) {
		if(!(event instanceof MouseEvent) && event?.key !== "Escape")
			return
		mobileInput = false;
	}

	$: isTransitioning = !!$todoStore.find(todo => todo.duration === 500);
</script>

<style>
	.top {
		top: -25px;
	}
</style>

<svelte:window on:keydown="{closeMobileInput}"></svelte:window>

<div id="app" class="relative">
	<header class="flex mx-8 mt-4 mb-16 justify-center items-cente select-none">
		<div class="flex mr-auto my-auto text-xl md:text-2xl lg:text-3xl">
			<p class="text-red-400">C</p>
			<p class="text-yellow-400">l</p>
			<p class="text-green-400">e</p>
			<p class="text-blue-400">a</p>
			<p class="text-purple-400">n</p>
			<p class="text-red-400">T</p>
			<p class="text-yellow-400">a</p>
			<p class="text-green-400">s</p>
			<p class="text-blue-400">k</p>
		</div>
		<div>
			<Discord />
		</div>
	</header>
 
	{#if mobileInput}
		<main class="flex flex-row absolute top bg-gray-200 bg-opacity-80 w-screen h-screen">
			<div class="flex w-screen items-center my-auto">
				<TodoInput on:create={(event) => addTodo(event.detail)} mobile={true} />
			</div>
			<button class="bg-gray-600 absolute right-4 w-8 h-8 rounded-full bottom-96 mb-44" on:click="{closeMobileInput}">
				<svg class="text-white m-auto fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				</svg>
			</button>
		</main>
	{/if}

	<main class="flex flex-col items-center h-screen">
		<div class="flex sticky w-screen">
			<TodoInput on:create={(event) => addTodo(event.detail)} />
		</div>
		<div class="w-screen overflow-y-auto h-screen" use:dndzone={{items: $todoStore, dragDisabled: isTransitioning, dropFromOthersDisabled: isTransitioning, dropTargetStyle: {} }} on:consider={handleSort} on:finalize={handleSort}>
			{#each $todoStore as todo, index(todo.id)}
				<Todo text={todo.text} complete={todo.complete} on:delete={() => removeTodo(index)} on:update={() => updateTodo(index)} duration={todo.duration}/>
			{/each}
			<div class="h-64"></div>
		</div>
	</main>

	<footer class="flex sticky bottom-0 select-none z-0">
		<div class="flex">
			<p class="mr-auto ml-4 mt-auto mb-4">Created by</p>
			<a href="https://github.com/HaxSam" class="flex mr-auto ml-1 mt-auto mb-3.5">
				<p class="border-b-2 border-red-400">H</p>
				<p class="border-b-2 border-yellow-400">a</p>
				<p class="border-b-2 border-green-400">x</p>
				<p class="border-b-2 border-blue-400">S</p>
				<p class="border-b-2 border-indigo-400">a</p>
				<p class="border-b-2 border-purple-400">m</p>
			</a>
		</div>

		<button class="{mobileInput && 'hidden'} md:hidden bg-white border-2 ml-auto mr-8 mb-8 border-pink-400 w-11 h-11 rounded-full" on:click="{() => mobileInput = true}">
			<svg class="m-auto bg-white text-indigo-600 fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
			</svg>
		</button>
	</footer>
</div>