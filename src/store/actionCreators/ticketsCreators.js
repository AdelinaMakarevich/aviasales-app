import { GET_SEARCH_ID, GET_TICKETS, SHOW_TICKETS } from '../actions/ticketsAction'
const getSearchId = () => async (dispatch) => {
  const responce = await fetch('https://aviasales-test-api.kata.academy/search')
  const { searchId } = await responce.json()
  dispatch({
    type: GET_SEARCH_ID,
    searchId,
  })
}
const getTickets = (searchId) => async (dispatch) => {
  const responce = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (!responce.ok) {
    throw new Error()
  }
  const { tickets, stop } = await responce.json()
  dispatch({
    type: GET_TICKETS,
    tickets,
    stop,
  })
  return stop
}

const showTickets = () => ({
  type: SHOW_TICKETS,
})

export { getSearchId, getTickets, showTickets }
