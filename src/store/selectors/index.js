import { createSelector } from '@reduxjs/toolkit'

const selectTickets = (state) => state.ticketsReducer.tickets
const selectFilters = (state) => state.filterReducer.filters
const selectTabs = (state) => state.tabsReducer.tabs
const selectSearchId = (state) => state.ticketsReducer.searchId
const selectTicketsToShow = (state) => state.ticketsReducer.ticketsToShow
const selectTicketsByFilter = createSelector(
  [selectTickets, selectFilters, selectTabs],
  (allTickets, filters, tabs) => {
    const filterId = filters.reduce((arr, filter) => {
      if (filter.check) {
        arr.push(filter.id)
      }
      return arr
    }, [])
    if (filters.every((item) => !item.check) || !allTickets.length) {
      return []
    }
    const filteredTickets = allTickets.filter((ticket) =>
      ticket.segments.every((elem) => filterId.includes(elem.stops.length))
    )
    const { value } = tabs.find((item) => item.check)
    let sortedData

    if (value === 2) {
      sortedData = filteredTickets.sort((a, b) => {
        const aMinDuration = Math.abs(a.segments[0].duration + a.segments[1].duration)
        const bMinDuration = Math.abs(b.segments[0].duration + b.segments[1].duration)
        return aMinDuration - bMinDuration
      })
    } else {
      sortedData = filteredTickets.sort((a, b) => a.price - b.price)
    }
    return sortedData
  }
)

export { selectTicketsByFilter, selectTabs, selectSearchId, selectTicketsToShow, selectFilters }
