export default {
  menu: [
    {
      title: 'Home',
      lists: [{ name: 'Home', link: '/', icon: ['fa', 'home'] }]
    },
    {
      title: 'Lead Manager',
      lists: [{ name: 'Finance', link: '/finance', icon: ['fa', 'bullhorn'] }]
    }
  ],
  chunks: {
    modules: new Map(),
    isFetching: false,
    onError: false
  }
}
