import { RouteRecordRaw } from 'vue-router'
import palosData from 'src/data/palosData'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: `/${palosData[0].value}`,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/${palosData[0].value}`,
  },
]

palosData.forEach((palo: any) => {
  if (routes[0].children)
    routes[0].children.push({
      path: palo.value,
      name: palo.value,
      component: () => import('pages/MainPage.vue'),
    })
})

export default routes
