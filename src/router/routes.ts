import type { RouteRecordRaw } from 'vue-router'
import patternsData from 'src/assets/data/patternsData'
import type { PatternState } from 'src/utils/types'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: `/${patternsData[0].name}`,
      },
      {
        path: 'privacy-policy',
        name: 'privacy-policy',
        component: () => import('pages/PrivacyPolicy.vue')
      },
      {
        path: 'tuning-fork',
        name: 'tuning-fork',
        component: () => import('pages/TuningFork.vue')
      },
      {
        path: ':pathMatch(.*)*',
        redirect: `/${patternsData[0].name}`,
      }
    ],
  }
]

patternsData.forEach((pattern: PatternState) => {
  routes[0].children?.push({
    path: pattern.name,
    name: pattern.name,
    component: () => import('pages/MainPage.vue'),
  })
})

export default routes
