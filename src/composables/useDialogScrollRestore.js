let pageScrollY = 0

export function capturePageScroll () {
  pageScrollY = window.scrollY
}

export function restorePageScroll () {
  const y = pageScrollY
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  const scroll = () => window.scrollTo({ left: 0, top: y, behavior: 'auto' })
  scroll()
  requestAnimationFrame(() => {
    scroll()
    requestAnimationFrame(() => {
      scroll()
      html.style.scrollBehavior = prevBehavior
    })
  })
}

export function openDialogWithScroll (openRef) {
  capturePageScroll()
  openRef.value = true
}
