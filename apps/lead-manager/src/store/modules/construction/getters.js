const getters = {
  getItems: (state) => state.items,
  getSelectedItem: (state) => (id) => {
    return state.items.find((item) => item.id === id)
  }
}

export default getters
