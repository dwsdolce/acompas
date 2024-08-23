import type { RouteRecordRaw } from 'vue-router'
import { useStorage } from '@vueuse/core'
import type { PatternState } from 'src/utils/types'

const selectedContextName = useStorage('selected-context-name', 'flamenco')
const selectedPatternName = useStorage('selected-pattern-name', 'alegria')
const patterns = useStorage('patterns', [] as PatternState[])

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: to => {
          return {
            path: `/${selectedContextName.value}/${selectedPatternName.value}`
          }
        }
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
        beforeEnter: (to, from, next) => {
          const pattern = patterns.value.find(p => to.params.pattern === p.name)
          console.debug('pattern', pattern)
          if (pattern?.context === to.params.context) {
            next()
          } else {
            next({
              name: 'not-found'
            })
          }
        },
        children: [
          {
            path: ':pattern',
            name: 'pattern',
            component: () => import('pages/MainPage.vue')
          }
        ]
      },
      {
        path: 'not-found',
        name: 'not-found',
        component: () => import('pages/NotFound.vue')
      },
      {
        path: ':pathMatch(.*)*',
        redirect: `/not-found`
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
