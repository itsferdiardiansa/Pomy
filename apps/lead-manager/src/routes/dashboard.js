/**
 * A dashboard routes
 */
const routes = [
  {
    path: '/',
    name: 'Construction Poject',
    component: () => import(/* webpackChunkName: 'page.thematic-page' */ '@/pages/Construction'),
    children: [
      {
        path: 'create',
        name: 'Create Construction Project',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.form.create' */ '@/pages/Construction/Create'
          )
      },
      {
        path: 'update',
        name: 'Update Construction Project',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.form.update' */ '@/pages/Construction/Update'
          )
      }
    ]
  }
]

export default routes
