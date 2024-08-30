import TokenManager from '@/utils/token'

export default {
  processLogin(state, payload) {
    state.processLogin = payload
  },
  loginStart(state) {
    state.login = {
      isFetching: true,
      onError: {
        status: false,
        body: {}
      }
    }
  },
  loginSuccess(state, payload) {
    state.token = payload.token
    state.user = payload.user
    state.login.isFetching = false

    TokenManager.setToken(payload)
  },
  loginFailed(state, payload) {
    state.login = {
      isFetching: false,
      onError: {
        status: true,
        body: { ...payload }
      }
    }
  },
  removeAuth(state) {
    state.user = null
    state.token = null

    TokenManager.flush()
  },
  setToken(state, payload) {
    TokenManager.setToken(payload)
  }
}
