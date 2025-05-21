import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szpkjpsgadcbitfeewwv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6cGtqcHNnYWRjYml0ZmVld3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODQyMjIsImV4cCI6MjA2MjI2MDIyMn0.XUyas6QeWx2V-cDnp2nStF69p6vh8TROnMcrINQTVvo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
