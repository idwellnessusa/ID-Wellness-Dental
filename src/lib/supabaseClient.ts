import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://majqwqxtdtjyotforfml.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hanF3cXh0ZHRqeW90Zm9yZm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTU4NTksImV4cCI6MjAyNjk3MTg1OX0.i_D29-87mO134_fHjP8n2C_uThtU3B-gCqY0qOq0f1I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
