import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kxtapuebivyoqwkdhphb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dGFwdWViaXZ5b3F3a2RocGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNzg1NDQsImV4cCI6MjAzMDk1NDU0NH0.RHSytO4nnlXj6wsFi5E5TYnKMhJHPYtN_k0Nx9EQf6A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
   // storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})