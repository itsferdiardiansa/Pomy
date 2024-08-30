const mutations = {
  handleAddData(state, { requestData }) {
    state.items.push({ id: crypto.randomUUID(), ...requestData.data })
  },
  handleUpdateData(state, { requestData }) {
    const selectedIndex = state.items.findIndex((item) => item.id === requestData.data.id)

    state.items[selectedIndex] = requestData.data
  },
  handleRemoveData(state, { requestData }) {
    state.items = state.items.filter((item) => item.id !== requestData.data.id)
  }
}

export default mutations
