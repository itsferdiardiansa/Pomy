/* eslint-disable */
const getters = {
  getChunks: (state) => state.chunks,
  getMenu: (state) => state.menu,
  getChapterMenu: (state) => (key) => {
    let chapterMenu = 'Home'
    const menu = state.menu

    // menu.forEach(item => {
    //   const title = item?.title;

    //   const find = item.lists.some(menuItem => menuItem.name === key);

    //   if (find) {
    //     chapterMenu = item?.title;
    //     return false;
    //   }
    // });

    return chapterMenu
  }
}

export default getters
