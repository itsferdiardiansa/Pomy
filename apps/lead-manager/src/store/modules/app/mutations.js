const mutations = {
  chunkLoaded: (state, payload) => {
    state.chunks.modules.set(payload, true)

    state.chunks.isFetching = false
  },
  chunkFailedLoad: (state) => {
    state.chunks = {
      ...state.chunks,
      onError: true,
      isFetching: false
    }
  },
  chunkLoad: (state) => {
    state.chunks.isFetching = true
  }
}

export default mutations
