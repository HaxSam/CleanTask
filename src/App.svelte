<script>
	import { text } from "svelte/internal";
import Discord from "./components/discord.svelte";
	import Todo from "./components/todo.svelte";

	let todoText = "";	
	let todos: string[] = []

	function addTodo() {
		todos = [...todos, todoText];
		todoText = "";
	}
	function removeTodo(index: number) {
		todos = [...todos.slice(0, index), ...todos.slice(index+1)];
	}
</script>

<main>
	<input type="text" bind:value="{todoText}" class="w-96" />
	<button class="bg-green-300 p-3 rounded-2xl" on:click="{addTodo}">Add</button>
	{#each todos as text, index}
		<Todo {text} on:delete={() => removeTodo(index)}/>
	{/each}
</main>