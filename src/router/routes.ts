import type { RouteRecordRaw } from 'vue-router'
import { useStorage } from '@vueuse/core'

const selectedPatternName = useStorage('selected-pattern-name', '')
const selectedContextName = useStorage('selected-context-name', '')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: selectedContextName.value !== '' && selectedPatternName.value !== ''
          ? `/${selectedContextName.value}/${selectedPatternName.value}` : '/flamenco/alegria'
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
        path: ':context',
        name: 'context',
        children: [
          {
            path: ':pattern',
            name: 'pattern',
            component: () => import('pages/MainPage.vue')
          }
        ]
      },
      {
        path: ':pathMatch(.*)*',
        redirect: `/${selectedContextName.value}/${selectedPatternName.value}`
      }
    ]
  }
]

// patternsData.forEach((pattern: PatternState) => {
//   routes[0].children?.push({
//     path: pattern.name,
//     name: pattern.name,
//     component: () => import('pages/MainPage.vue'),
//   })
// })

export default routes
