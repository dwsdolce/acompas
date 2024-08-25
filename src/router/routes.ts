import type { RouteRecordRaw } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
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
        path: ':context',
        name: 'context',
        beforeEnter: async (to, from, next) => {
          const patternStore = usePatternStore()

          const { data } = storeToRefs(patternStore)
          const { initStore } = patternStore

          if (data.value.length === 0) {
            await initStore()
          }

          const pattern = data.value.find(p => to.params.pattern === p.name)

          if (pattern) {
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
        path: '',
        name: 'home',
        redirect: `/${selectedContextName.value}/${selectedPatternName.value}`
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
