import { nextTick, ref } from 'vue'

export default function asyncComponent(router) {
  router.beforeEach((to) => {
    let routeComponents = [].concat(to.matched)

    to.meta = {
      ...to.meta,
      components: {
        ...to.meta.components,
        render: routeComponents.pop().components
      },
      loaded: ref(true),
      breadcrumbs: to.matched
    }

    nextTick(() => {
      document.title = `${to.name} - Pomy`
    })

    return true
  })
}
