export default {
  getToken: (state) => state.token,
  getUser: (state) => state.user,
  getProcessLogin: (state) => state.processLogin,
  getLoginStatus: (state) => ({
    fetch: state.login.isFetching,
    error: state.login.onError
  })
}
