import { writable } from "svelte-local-storage-store";
import type { AuthStore } from "types/supabase";
import type { ITodo } from "types/todos";

export const supabaseSession = writable("supabase.auth.token", {} as AuthStore);
export const todoStore = writable("todos", Array<ITodo>());
export const todoID = writable("todoId", 0);