export default (type, payload, router) => {
  switch (type) {
    case 'user/loginSuccess':
      SSNotification('success', 'Welcome aboard!')
      break
    case 'user/loginFailed':
      SSNotification('danger', 'Login failed')
      break
    case 'user/removeAuth':
      SSNotification('success', 'Thank you!')

      router.push('/login')
      break
    default:
      break
  }
}
