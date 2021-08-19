import { writable } from "svelte-local-storage-store";
import type { AuthStore } from "types/supabase";

export const supabaseSession = writable("supabase.auth.token", {} as AuthStore);