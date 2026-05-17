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
        path: 'ai-groups',
        name: 'investor-ai-groups',
        component: () => import('pages/AiGroupsPage.vue')
      },
      {
        path: 'explain-fragment',
        name: 'investor-explain-fragment',
        component: () => import('pages/ExplainFragmentPage.vue')
      },
      {
        path: 'save-ai-note',
        redirect: { name: 'investor-explain-fragment' }
      },
      {
        path: 'research-mentor',
        name: 'investor-research-mentor',
        component: () => import('pages/ResearchMentorPage.vue')
      },
      {
        path: 'education',
        name: 'investor-education',
        component: () => import('pages/EducationPage.vue')
      },
      {
        path: 'future',
        name: 'investor-future',
        component: () => import('pages/FuturePage.vue')
      },
      {
        path: 'resources',
        name: 'investor-resources',
        component: () => import('pages/ResourcesPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
