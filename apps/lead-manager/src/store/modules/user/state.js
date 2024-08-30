import TokenManager from '@/utils/token'

export default {
  processLogin: false,
  token: null,
  user: TokenManager.getUser(),
  login: {
    isFetching: false,
    onError: {
      status: false,
      body: {}
    }
  }
}
