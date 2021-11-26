
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue')
  },
  // Redirect 404s to the app
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes
