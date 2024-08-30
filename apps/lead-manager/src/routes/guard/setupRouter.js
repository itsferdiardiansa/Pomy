import asyncComponent from './asyncComponent'
import authPermission from './authPermission'
// import middlewareComponent from './middlewareComponent'

export default function setupRouter(router, app) {
  // middlewareComponent(router)
  asyncComponent(router, app)
  authPermission(router)
}
