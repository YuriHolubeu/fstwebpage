import { boot } from 'quasar/wrappers'
import { isApiConfigured } from 'src/lib/api-client'

export default boot(() => {
  if (!import.meta.env.DEV || isApiConfigured()) {
    return
  }

  console.warn(
    '[FST] VITE_API_BASE_URL is not set. Copy .env.example → .env.local and set the Django API URL.'
  )
})
