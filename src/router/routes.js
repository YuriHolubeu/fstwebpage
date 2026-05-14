const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'investor-project' } },
      {
        path: 'project',
        name: 'investor-project',
        component: () => import('pages/ProjectPage.vue')
      },
      {
        path: 'invest',
        name: 'investor-invest',
        component: () => import('pages/InvestPage.vue')
      },
      {
        path: 'future',
        name: 'investor-future',
        component: () => import('pages/FuturePage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
