import { TABS } from '../actions/tabsAction'

const defaultStore = {
  tabs: [
    { name: 'Самый дешевый', check: true, value: 1 },
    { name: 'Самый быстрый', check: false, value: 2 },
  ],
}

const updateCheck = (arr, value) => {
  return arr.map((item) => (item.value === value ? { ...item, check: !item.check } : { ...item, check: !item.check }))
}

function tabsReducer(state = defaultStore, action = {}) {
  const newData = updateCheck(state.tabs, action.value)

  switch (action.type) {
    case TABS:
      return {
        ...state,
        tabs: newData,
      }

    default:
      return state
  }
}

export default tabsReducer
