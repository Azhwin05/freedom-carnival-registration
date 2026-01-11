import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jsvnhhulkshdqerbenxr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzdm5oaHVsa3NoZHFlcmJlbnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNjY4MDQsImV4cCI6MjA4MzY0MjgwNH0.yRyYar9BGkcrxKRsqg6nFIqe6RVbm7tM98VtTHDykdg'

export const supabase = createClient(supabaseUrl, supabaseKey)
