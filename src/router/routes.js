
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Home', path: '', component: () => import('pages/Index.vue') },
      { name: 'Favorites', path: 'favorites', component: () => import('pages/Favorites.vue'), meta: { requireLogin: true } },
      { name: 'Login', path: '/login', component: () => import('pages/Login.vue') },
      { name:'Register',path: '/register', component: () => import('pages/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
