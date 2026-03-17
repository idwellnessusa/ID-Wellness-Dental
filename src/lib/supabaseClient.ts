import { createClient } from '@supabase/supabase-js'

// This tells the app to look at the environment variables we set up in GitHub
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This check helps us see if the keys are actually working
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)