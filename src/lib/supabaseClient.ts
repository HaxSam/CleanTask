import { createClient } from "@supabase/supabase-js";
import type { AuthStore } from "types/supabase";
import { supabaseSession } from "./store";

export const supabaseUrl = import.meta.env.SNOWPACK_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.SNOWPACK_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabaseSession.subscribe(async session => {
  if (session)
    supabase.auth.setAuth(session.currentSession?.access_token);
  else
    supabase.auth.signOut();
})

supabase.auth.onAuthStateChange(session => {
  if (session === null)
    supabaseSession.set({} as AuthStore);
})

export default supabase;