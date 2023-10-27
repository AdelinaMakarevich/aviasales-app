import { FILTER_ALL, FILTER } from '../actions/filterAction'

const defaultStore = {
  filters: [
    {
      id: 4,
      value: 'Все',
      check: true,
    },
    {
      id: 0,
      value: 'Без пересадок',
      check: true,
    },
    {
      id: 1,
      value: '1 пересадка',
      check: true,
    },
    {
      id: 2,
      value: '2 пересадки',
      check: true,
    },
    {
      id: 3,
      value: '3 пересадки',
      check: true,
    },
  ],
}

const updateCheck = (arr, id) => {
  return arr.map((item) => (item.id === id ? { ...item, check: !item.check } : item))
}

function filterReducer(state = defaultStore, action = {}) {
  const data = state.filters
  const newData = updateCheck(data, action.id)
  const isAllChecked = newData.slice(1).every((element) => element.check)
  const changedData = [{ ...state.filters[0], check: isAllChecked }, ...newData.slice(1)]

  switch (action.type) {
    case FILTER_ALL:
      return {
        ...state,
        filters: state.filters.map((item) => ({
          ...item,
          check: !state.filters[0].check,
        })),
      }

    case FILTER:
      return {
        ...state,
        filters: changedData,
      }

    default:
      return state
  }
}

export default filterReducer
