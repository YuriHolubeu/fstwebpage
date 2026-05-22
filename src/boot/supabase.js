import { boot } from 'quasar/wrappers'
import { isSupabaseConfigured } from 'src/lib/supabase-client'

export default boot(() => {
  if (!import.meta.env.DEV || isSupabaseConfigured()) {
    return
  }

  console.warn(
    '[FST] Supabase is not configured. Copy .env.example → .env.local and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
})
