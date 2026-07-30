const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'investor-project',
        component: () => import('pages/ProjectPage.vue')
      },
      {
        path: 'project',
        redirect: '/'
      },
      {
        path: 'project-description',
        name: 'investor-project-description',
        component: () => import('pages/ProjectDescriptionPage.vue')
      },
      {
        path: 'community',
        name: 'investor-community',
        component: () => import('pages/CommunityPage.vue')
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
        path: 'careers',
        name: 'investor-careers',
        component: () => import('pages/CareersPage.vue')
      },
      {
        path: 'future',
        name: 'investor-future',
        component: () => import('pages/FuturePage.vue')
      },
      {
        path: 'science-plan',
        name: 'investor-science-plan',
        component: () => import('pages/SciencePlanPage.vue')
      },
      {
        path: 'resources',
        name: 'investor-resources',
        component: () => import('pages/ResourcesPage.vue')
      },
      {
        path: 'gallery',
        name: 'investor-gallery',
        component: () => import('pages/GalleryPage.vue')
      },
      {
        path: 'preorder',
        name: 'investor-preorder',
        component: () => import('pages/PreorderPage.vue')
      },
      {
        path: 'preorder/success',
        name: 'investor-preorder-success',
        component: () => import('pages/PreorderSuccessPage.vue')
      },
      {
        path: 'donate',
        name: 'investor-donate',
        component: () => import('pages/DonatePage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
