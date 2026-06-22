import { defineBoot } from '#q-app/wrappers'
import { applyRouteSeo } from 'src/router/seo'

export default defineBoot(({ router }) => {
  router.isReady().then(() => {
    applyRouteSeo(router.currentRoute.value)
  })

  router.afterEach((to) => {
    applyRouteSeo(to)
  })
})
