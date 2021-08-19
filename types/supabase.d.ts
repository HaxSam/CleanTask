import { AuthSession } from "@supabase/supabase-js"

export declare interface AuthStore {
  currentSession: AuthSession;
  expiresAt: number;
}