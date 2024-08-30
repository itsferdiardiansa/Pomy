const actions = {
  async doLogin({ commit }, payload) {
    commit('loginStart')

    try {
      const { email, password } = payload

      if (email !== 'jum@gab.com' && password !== 'teaser@2024')
        throw new Error('Authentication failed!')

      commit('loginSuccess', { token: crypto.randomUUID(), user: email })

      return true
    } catch (error) {
      commit('loginFailed', { requestData: payload, responseData: error })
    }
  },
  doLogout({ commit }) {
    commit('removeAuth')
  }
}

export default actions
