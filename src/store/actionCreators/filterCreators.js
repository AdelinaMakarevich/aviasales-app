import { FILTER_ALL, FILTER } from '../actions/filterAction'

const filterAllToggle = () => ({
  type: FILTER_ALL,
})

const filterToggle = (id) => ({
  type: FILTER,
  id,
})

export { filterAllToggle, filterToggle }
