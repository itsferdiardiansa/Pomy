/* eslint-disable */
import { computed, unref } from 'vue'

const paginationSettings = {
  currentPage: 1,
  perPage: 5,
  pages: [],
  lastPage: 0,
}

const createPageNumber = data => {
  let { lastPage, currentPage } = data,
    range = 5,
    totalPages = lastPage, // determined by amount of items, hardcoded for readability
    start = 1,
    paging = new Array(),
    rangeStart = 0

  // Don't use negative values, force start at 1
  if (currentPage < range) {
    start = 1
    // Don't go beyond the last page
  } else if (currentPage >= totalPages - range / 2) {
    start = Math.floor(totalPages - range + 1)
  } else {
    start = currentPage - Math.floor(range / 2)
  }
  if (totalPages < range) rangeStart = totalPages
  else rangeStart = start + range - 1
  for (let i = start; i <= rangeStart; i++) {
    if (i === currentPage) {
      paging.push(i) // add brackets to indicate current page
    } else {
      paging.push(i)
    }
  }

  return {
    pages: paging,
    isApplicable: Boolean(paging.length),
  }
}

const getNavigation = ({ currentPage, lastPage }) => ({
  prevBtn: currentPage > 1,
  nextBtn: currentPage < lastPage,
})

const getInfo = ({ currentPage, perPage, lastPage }) => {
  return {
    info: {
      from: currentPage * perPage - perPage + 1,
      to: currentPage * perPage,
      of: perPage * lastPage,
    },
  }
}

const usePagination = props => {
  const getPagination = computed(() => {
    const getProps = unref(props)

    return {
      ...paginationSettings,
      ...getProps,
      ...getNavigation(getProps),
      ...createPageNumber(unref(getProps)),
      ...getInfo(getProps),
    }
  })

  return {
    getPagination,
  }
}

export default usePagination
