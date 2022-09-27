import { RouteRecordRaw } from 'vue-router'
import palosData from 'src/data/palosData'
import type { PaloData } from 'src/composables/models'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: `/${palosData[0].value}`,
      },
      {
        path: 'privacy',
        component: () => import('pages/PrivacyPolicy.vue')
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/${palosData[0].value}`,
  },
]

palosData.forEach((palo: PaloData) => {
  if (routes[0].children)
    routes[0].children.push({
      path: palo.value,
      name: palo.value,
      component: () => import('pages/MainPage.vue'),
    })
})

export default routes
