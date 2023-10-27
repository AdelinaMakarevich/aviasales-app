import { combineReducers } from 'redux'

import filterReducer from './filterReducer'
import ticketsReducer from './ticketsReducer'
import tabsReducer from './tabsReducer'

const rootReducer = combineReducers({
  filterReducer,
  ticketsReducer,
  tabsReducer,
})

export default rootReducer
